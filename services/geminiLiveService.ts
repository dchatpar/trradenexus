
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

let nextStartTime = 0;
const sources = new Set<AudioBufferSourceNode>();

interface LiveSessionConfig {
  onOpen?: () => void;
  onMessage?: (transcription: string) => void;
  onAudio?: (level: number) => void;
  onClose?: () => void;
}

export const connectGeminiLive = async (config: LiveSessionConfig) => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key not found");
    
    const ai = new GoogleGenAI({ apiKey });
    
    // Audio Context Setup
    const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const inputNode = inputAudioContext.createGain();
    const outputNode = outputAudioContext.createGain();
    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    let currentInputTranscription = '';
    let currentOutputTranscription = '';

    const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
            onopen: () => {
                // Stream audio from mic
                const source = inputAudioContext.createMediaStreamSource(stream);
                const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                
                scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                    const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                    // Visualize audio level (simple mock RMS)
                    let sum = 0;
                    for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
                    if (config.onAudio) config.onAudio(Math.sqrt(sum / inputData.length) * 5); 

                    const pcmBlob = createBlob(inputData);
                    sessionPromise.then((session) => {
                        session.sendRealtimeInput({ media: pcmBlob });
                    });
                };
                
                source.connect(scriptProcessor);
                scriptProcessor.connect(inputAudioContext.destination);
                
                if (config.onOpen) config.onOpen();
            },
            onmessage: async (message: LiveServerMessage) => {
                // Transcription handling
                if (message.serverContent?.outputTranscription) {
                    currentOutputTranscription += message.serverContent.outputTranscription.text;
                } else if (message.serverContent?.inputTranscription) {
                    currentInputTranscription += message.serverContent.inputTranscription.text;
                }
                
                if (message.serverContent?.turnComplete) {
                     const fullTx = `User: ${currentInputTranscription}\nAI: ${currentOutputTranscription}`;
                     if (config.onMessage) config.onMessage(fullTx);
                     currentInputTranscription = '';
                     currentOutputTranscription = '';
                }

                // Audio Output Handling
                const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                if (base64Audio) {
                    nextStartTime = Math.max(nextStartTime, outputAudioContext.currentTime);
                    const audioBuffer = await decodeAudioData(
                        decode(base64Audio),
                        outputAudioContext,
                        24000,
                        1
                    );
                    const source = outputAudioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(outputNode);
                    source.addEventListener('ended', () => {
                        sources.delete(source);
                    });
                    outputNode.connect(outputAudioContext.destination);
                    source.start(nextStartTime);
                    nextStartTime += audioBuffer.duration;
                    sources.add(source);
                }
                
                const interrupted = message.serverContent?.interrupted;
                if (interrupted) {
                    for (const source of sources.values()) {
                        source.stop();
                        sources.delete(source);
                    }
                    nextStartTime = 0;
                }
            },
            onclose: () => {
                if (config.onClose) config.onClose();
            }
        },
        config: {
            responseModalities: [Modality.AUDIO],
            inputAudioTranscription: { model: "gemini-2.5-flash-native-audio-preview-09-2025" },
            outputAudioTranscription: { model: "gemini-2.5-flash-native-audio-preview-09-2025" },
            systemInstruction: "You are an expert sales negotiator for TradeNexus. You are speaking with a potential B2B lead. Be professional, persuasive, but listen carefully. Your goal is to schedule a demo of our database platform."
        }
    });

    // Handle connection failures (e.g. Quota Exceeded)
    sessionPromise.catch(error => {
        console.error("Gemini Live Connection Failed:", error);
        if (config.onClose) config.onClose();
        // Clean up resources if connection fails immediately
        inputAudioContext.close();
        outputAudioContext.close();
        stream.getTracks().forEach(t => t.stop());
    });

    return {
        disconnect: () => {
            sessionPromise.then(s => s.close()).catch(() => {});
            inputAudioContext.close();
            outputAudioContext.close();
            stream.getTracks().forEach(t => t.stop());
        }
    };
};

// Utils
function createBlob(data: Float32Array): { data: string, mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
