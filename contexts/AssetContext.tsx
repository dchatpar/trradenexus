import React, { createContext, useContext, useState, useEffect } from 'react';

// AI Asset generation is disabled to fix deployment.

interface AssetContextType {
  logoUrl: string | null;
  illustrations: Record<string, string>;
  isLoading: boolean;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [illustrations, setIllustrations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Attempt to load assets from localStorage on mount.
    // AI generation is disabled, so we don't make any API calls.
    try {
        const storedLogo = localStorage.getItem('tradenexus_logo_v1');
        if (storedLogo) {
            setLogoUrl(storedLogo);
        }
        const storedIllustrations = JSON.parse(localStorage.getItem('tradenexus_illustrations') || '{}');
        if (Object.keys(storedIllustrations).length > 0) {
            setIllustrations(storedIllustrations);
        }
    } catch (e) {
        console.warn("Could not load assets from localStorage.", e);
    }
  }, []); // Empty dependency array means this runs only once on mount.

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
