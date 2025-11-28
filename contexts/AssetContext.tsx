
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { generateImage } from '../services/geminiService';

interface AssetContextType {
  logoUrl: string | null;
  illustrations: Record<string, string>;
  isLoading: boolean;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use v4 key to force regeneration of the new "TradeNexus" logo
  const [logoUrl, setLogoUrl] = useState<string | null>(localStorage.getItem('tradenexus_logo_v1'));
  const [illustrations, setIllustrations] = useState<Record<string, string>>(
    (() => {
        try {
            return JSON.parse(localStorage.getItem('tradenexus_illustrations') || '{}');
        } catch {
            return {};
        }
    })()
  );
  const [isLoading, setIsLoading] = useState(false);
  const hasAttemptedRef = useRef(false);

  useEffect(() => {
    const loadAssets = async () => {
      // Prevent infinite loops or redundant checks
      if (hasAttemptedRef.current) return;
      
      // Check if API key is present before trying
      if (!process.env.API_KEY) {
          console.warn("No API_KEY found, skipping AI asset generation.");
          hasAttemptedRef.current = true;
          return;
      }

      // Check if critical assets exist
      if (logoUrl && illustrations['no_results'] && illustrations['welcome']) {
        hasAttemptedRef.current = true;
        return;
      }

      setIsLoading(true);
      hasAttemptedRef.current = true;
      
      let newLogoUrl = logoUrl;
      let quotaExceeded = false;

      if (!newLogoUrl) {
          // New "TradeNexus" Logo Prompt
          const prompt = `
            High-tech logo for 'TradeNexus', Global Trade Intelligence Platform. 
            Icon concept: Abstract nodes connecting across a globe, forming a neural network or 'nexus'.
            Style: Futuristic, enterprise SaaS, vector art, 3D glossy effect.
            Colors: Electric Blue, Deep Purple, and Vibrant Orange accents.
            Background: Transparent or Dark Slate (matching hex #0f172a).
            Typography: Modern, bold sans-serif font for 'TradeNexus'.
          `;
          
          try {
            const generatedLogo = await generateImage(prompt);
            if (generatedLogo) {
                newLogoUrl = generatedLogo;
                setLogoUrl(generatedLogo);
                try {
                    localStorage.setItem('tradenexus_logo_v1', generatedLogo);
                } catch (e) {
                    console.warn("Storage quota exceeded for logo, not persisting.");
                }
            } else {
                console.warn("Logo generation failed or quota exceeded.");
                quotaExceeded = true; 
            }
          } catch (e) {
              console.error("Failed to generate logo", e);
              quotaExceeded = true;
          }
      }

      // Only proceed with illustrations if we haven't hit a quota wall
      if (!quotaExceeded) {
          const missingIllustrations = [
              { key: 'no_results', prompt: 'Simple vector illustration of an empty box with a magnifying glass, blue and orange gradient, dark background compatible' },
              { key: 'welcome', prompt: 'Simple vector illustration of global trade map with connection lines, futuristic, neon blue and orange glow' },
              { key: 'chart', prompt: 'Abstract business chart rising, neon blue line, minimalist vector' }
          ];

          const newIllustrations = { ...illustrations };
          let changed = false;

          for (const item of missingIllustrations) {
              if (!newIllustrations[item.key]) {
                  try {
                      const img = await generateImage(item.prompt);
                      if (img) {
                          newIllustrations[item.key] = img;
                          changed = true;
                      } else {
                          // Stop trying if we fail once to avoid hammering the API
                          console.warn(`Illustration generation failed for ${item.key}, stopping sequence.`);
                          break; 
                      }
                  } catch (e) {
                      console.error(`Failed to generate ${item.key}`, e);
                      break;
                  }
              }
          }

          if (changed) {
              setIllustrations(newIllustrations);
              try {
                  localStorage.setItem('tradenexus_illustrations', JSON.stringify(newIllustrations));
              } catch (e) {
                  console.warn("Storage quota exceeded for illustrations, not persisting updates.");
              }
          }
      }

      setIsLoading(false);
    };

    // Trigger asset generation in background to not block UI
    loadAssets();
  }, [logoUrl, illustrations]);

  return (
    <AssetContext.Provider value={{ logoUrl, illustrations, isLoading }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};
