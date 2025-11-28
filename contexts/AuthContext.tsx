import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, AuthProviderType } from '../types';
import { authService } from '../services/authService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithProvider: (provider: AuthProviderType) => Promise<void>;
  ssoLogin: (email: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);
    setUser(user);
  };

  useEffect(() => {
    // Check for existing session on mount
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        } else {
            // AUTO-LOGIN: For demo purposes, automatically log in as Admin if no session exists.
            console.log("Auto-logging in as Admin for demo...");
            await login('admin@tradenexus.com', 'admin123');
        }
      } catch (error) {
        console.error('Failed to restore session', error);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const loginWithProvider = async (provider: AuthProviderType) => {
    setIsLoading(true);
    try {
        const user = await authService.loginWithProvider(provider);
        setUser(user);
    } finally {
        setIsLoading(false);
    }
  };

  const ssoLogin = async (email: string) => {
    setIsLoading(true);
    try {
        const user = await authService.ssoLogin(email);
        setUser(user);
    } finally {
        setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    const user = await authService.register(data);
    setUser(user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
      if (user) {
          const updatedUser = { ...user, ...updates };
          setUser(updatedUser);
          // Persist changes
          await authService.updateProfile(user.id, updates);
      }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login,
      loginWithProvider,
      ssoLogin, 
      register, 
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};