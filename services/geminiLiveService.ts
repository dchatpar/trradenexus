// Gemini Live feature is disabled to fix deployment issues.

interface LiveSessionConfig {
  onOpen?: () => void;
  onMessage?: (transcription: string) => void;
  onAudio?: (level: number) => void;
  onClose?: () => void;
}

export const connectGeminiLive = async (config: LiveSessionConfig) => {
    console.error("Attempted to connect to Gemini Live, but the feature is temporarily disabled.");
    
    // Immediately trigger the close callback to signal failure to the UI
    if (config.onClose) {
        config.onClose();
    }
    
    // Throw an error to ensure any awaiting code knows the connection failed
    throw new Error("Live AI Calling is temporarily unavailable.");

    // Return a dummy object to satisfy the expected return type
    return {
        disconnect: () => {}
    };
};
