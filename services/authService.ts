import { User, AuthProviderType } from '../types';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@tradenexus.com',
    role: 'admin',
    company: 'TradeNexus HQ',
    avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
    onboardingData: {
        role: 'Administrator',
        industry: 'Technology',
        businessLine: 'Export & Import',
        targetCountries: ['USA', 'China', 'Germany'],
        primaryGoal: 'System Management'
    }
  },
  {
    id: '2',
    name: 'Premium Trader',
    email: 'user@tradenexus.com',
    role: 'premium',
    company: 'Global Imports Ltd',
    avatarUrl: 'https://ui-avatars.com/api/?name=Premium+Trader&background=random'
  },
  {
    id: '3',
    name: 'Demo User',
    email: 'demo@tradenexus.com',
    role: 'free',
    company: 'Small Biz Inc',
    avatarUrl: 'https://ui-avatars.com/api/?name=Demo+User&background=random'
  }
];

const STORAGE_KEY = 'tradenexus_auth_token';
const USER_DATA_KEY = 'tradenexus_user_data';

interface MockToken {
  userId: string;
  exp: number;
}

// Helper to get locally saved user data
const getLocalUserData = (userId: string): Partial<User> => {
    try {
        const allData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || '{}');
        return allData[userId] || {};
    } catch {
        return {};
    }
};

// Helper to save user data locally
const saveLocalUserData = (userId: string, data: Partial<User>) => {
    try {
        const allData = JSON.parse(localStorage.getItem(USER_DATA_KEY) || '{}');
        allData[userId] = { ...allData[userId], ...data };
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(allData));
    } catch (e) {
        console.error("Failed to save user data", e);
    }
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user: User | undefined;

        if (email === 'admin@tradenexus.com' && password === 'admin123') user = MOCK_USERS[0];
        else if (email === 'user@tradenexus.com' && password === 'user123') user = MOCK_USERS[1];
        else if (email === 'demo@tradenexus.com' && password === 'demo123') user = MOCK_USERS[2];

        if (user) {
          // Merge with local data
          const localData = getLocalUserData(user.id);
          const fullUser = { ...user, ...localData };
          
          const token: MockToken = { userId: user.id, exp: Date.now() + 3600000 * 24 };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
          resolve(fullUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500); // Faster login for demo
    });
  },

  loginWithProvider: async (provider: AuthProviderType): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = `social-${provider}`;
        const baseUser: User = {
          id,
          name: provider === 'google' ? 'Google User' : 'LinkedIn User',
          email: `${provider}@example.com`,
          role: 'free',
          company: `${provider === 'google' ? 'Tech' : 'Pro'} Corp`,
          avatarUrl: `https://ui-avatars.com/api/?name=${provider}+User&background=${provider === 'google' ? 'EA4335' : '0077B5'}&color=fff`
        };
        
        const localData = getLocalUserData(id);
        const fullUser = { ...baseUser, ...localData };

        const token: MockToken = { userId: fullUser.id, exp: Date.now() + 3600000 * 24 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
        resolve(fullUser);
      }, 1500);
    });
  },

  ssoLogin: async (email: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = 'sso-user-1';
        const baseUser: User = {
          id,
          name: 'Enterprise User',
          email: email,
          role: 'premium',
          company: 'Enterprise Corp',
          avatarUrl: `https://ui-avatars.com/api/?name=Enterprise+User&background=000&color=fff`
        };

        const localData = getLocalUserData(id);
        const fullUser = { ...baseUser, ...localData };

        const token: MockToken = { userId: fullUser.id, exp: Date.now() + 3600000 * 24 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
        resolve(fullUser);
      }, 2000);
    });
  },

  register: async (data: any): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = Math.random().toString(36).substr(2, 9);
        const newUser: User = {
          id,
          name: data.name || 'New User',
          email: data.email,
          role: 'free',
          company: data.company,
          avatarUrl: `https://ui-avatars.com/api/?name=${data.name}&background=random`
        };
        // No local data yet for new user
        const token: MockToken = { userId: newUser.id, exp: Date.now() + 3600000 };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
        resolve(newUser);
      }, 1000);
    });
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEY);
    return Promise.resolve();
  },

  getCurrentUser: async (): Promise<User | null> => {
    const tokenStr = localStorage.getItem(STORAGE_KEY);
    if (!tokenStr) return null;

    try {
      const token: MockToken = JSON.parse(tokenStr);
      if (Date.now() > token.exp) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      
      let user = MOCK_USERS.find(u => u.id === token.userId);
      
      // Handle dynamic users (social/sso) that aren't in MOCK_USERS static array
      if (!user) {
          if (token.userId.startsWith('social-')) {
             const provider = token.userId.split('-')[1];
             user = {
                id: token.userId,
                name: provider === 'google' ? 'Google User' : 'LinkedIn User',
                email: `${provider}@example.com`,
                role: 'free',
                company: 'Social Corp',
                avatarUrl: `https://ui-avatars.com/api/?name=${provider}&background=random`
             };
          } else if (token.userId === 'sso-user-1') {
             user = {
                id: 'sso-user-1',
                name: 'Enterprise User',
                email: 'sso@example.com',
                role: 'premium',
                company: 'Enterprise Corp',
                avatarUrl: `https://ui-avatars.com/api/?name=Enterprise+User&background=000&color=fff`
             };
          }
      }

      if (user) {
          const localData = getLocalUserData(user.id);
          return { ...user, ...localData };
      }
      
      return null;
    } catch (e) {
      return null;
    }
  },

  updateProfile: async (id: string, updates: Partial<User>): Promise<void> => {
      saveLocalUserData(id, updates);
      return Promise.resolve();
  }
};