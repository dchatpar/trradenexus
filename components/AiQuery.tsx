import React, { useState } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import { PaperAirplaneIcon, CpuChipIcon } from './Icons';

const AiQuery: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const result = await getGeminiResponse(prompt);
      setResponse(result);
    } catch (err) {
      setError('Failed to get response from AI. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl shadow-lg border border-white/10 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <CpuChipIcon className="h-6 w-6 text-purple-400" />
        <h3 className="text-lg font-bold text-white">Ask TradeNexus AI</h3>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Query our global trade data using natural language.
      </p>

      <div className="flex-1 flex flex-col justify-end">
          {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
          
          {response && (
            <div className="mb-4 p-4 bg-slate-800/80 border border-white/10 rounded-lg max-h-40 overflow-y-auto custom-scrollbar">
              <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{response}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Total import volume from China?'"
              className="flex-1 w-full px-4 py-3 text-white bg-slate-900/50 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 shadow-inner"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="px-4 py-3 font-semibold text-white bg-purple-600 rounded-xl shadow-lg hover:bg-purple-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <PaperAirplaneIcon className="h-5 w-5" />
              )}
            </button>
          </form>
      </div>
    </div>
  );
};

export default AiQuery;