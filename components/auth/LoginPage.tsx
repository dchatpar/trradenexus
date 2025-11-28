import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleIcon, LinkedInIcon, BuildingOfficeIcon, GlobeAltIcon } from '../Icons';
import { Button, Input, GlassCard } from '../common/Shared';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ssoMode, setSsoMode] = useState(false);
  const { login, loginWithProvider, ssoLogin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      if (ssoMode) {
          await ssoLogin(email);
      } else {
          await login(email, password);
      }
    } catch (err) {
      setError('Invalid credentials. Please check your inputs and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocial = async (provider: 'google' | 'linkedin') => {
      setError('');
      try {
          await loginWithProvider(provider);
      } catch (e) {
          setError(`${provider === 'google' ? 'Google' : 'LinkedIn'} login failed. Try again.`);
      }
  };

  const handleDemoFill = async (role: 'admin' | 'user' | 'demo') => {
      setSsoMode(false);
      setError('');
      setIsSubmitting(true);
      
      let u = '', p = '';
      if (role === 'admin') { u = 'admin@tradenexus.com'; p = 'admin123'; }
      if (role === 'user') { u = 'user@tradenexus.com'; p = 'user123'; }
      if (role === 'demo') { u = 'demo@tradenexus.com'; p = 'demo123'; }
      
      setEmail(u);
      setPassword(p);

      try {
          await login(u, p);
      } catch (err) {
          setError('Auto-login failed.');
          setIsSubmitting(false);
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <GlassCard className="w-full max-w-md relative z-10 p-8 sm:p-10 backdrop-blur-2xl bg-surface-900/60 border-surface-700/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-4 shadow-lg shadow-brand-500/10">
            <GlobeAltIcon className="h-8 w-8 text-brand-500" />
          </div>
          <h2 className="text-3xl font-bold font-display text-white tracking-tight">TradeNexus</h2>
          <p className="text-surface-400 mt-2 text-sm">Enterprise Trade Intelligence Platform</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-xs text-center font-medium animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            label="Email Address" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="name@company.com"
            required 
          />

          {!ssoMode && (
              <div className="animate-fade-in">
                <Input 
                    label="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••"
                    required 
                />
              </div>
          )}

          <Button type="submit" disabled={isSubmitting} fullWidth size="lg" className="mt-2">
            {isSubmitting ? (
                <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Authenticating...
                </span>
            ) : (ssoMode ? 'Continue with SSO' : 'Sign In')}
          </Button>
        </form>
        
        <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-surface-700"></div>
            <span className="px-4 text-xs text-surface-500 font-medium uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 border-t border-surface-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="secondary" onClick={() => handleSocial('google')} className="bg-surface-800 hover:bg-surface-700 border-surface-700">
                <GoogleIcon className="h-5 w-5 mr-2" /> Google
            </Button>
            <Button variant="secondary" onClick={() => handleSocial('linkedin')} className="bg-surface-800 hover:bg-surface-700 border-surface-700">
                <LinkedInIcon className="h-5 w-5 mr-2 text-[#0077B5]" /> LinkedIn
            </Button>
        </div>

        <button 
            onClick={() => setSsoMode(!ssoMode)} 
            className="w-full flex items-center justify-center py-2 text-sm text-surface-400 hover:text-brand-400 transition-colors"
        >
            <BuildingOfficeIcon className="h-4 w-4 mr-2" />
            {ssoMode ? 'Back to Password Login' : 'Use Single Sign-On (SSO)'}
        </button>

        <div className="mt-8 pt-6 border-t border-surface-800 text-center">
            <p className="text-[10px] text-surface-500 uppercase tracking-widest mb-3">Quick Fill (Demo Only)</p>
            <div className="flex justify-center gap-2">
                <span onClick={() => handleDemoFill('admin')} className="cursor-pointer px-2 py-1 rounded bg-surface-800/50 hover:bg-brand-900/30 text-[10px] text-surface-400 hover:text-brand-300 border border-surface-700 transition-colors">Admin</span>
                <span onClick={() => handleDemoFill('user')} className="cursor-pointer px-2 py-1 rounded bg-surface-800/50 hover:bg-blue-900/30 text-[10px] text-surface-400 hover:text-blue-300 border border-surface-700 transition-colors">Premium</span>
                <span onClick={() => handleDemoFill('demo')} className="cursor-pointer px-2 py-1 rounded bg-surface-800/50 hover:bg-surface-700 text-[10px] text-surface-400 hover:text-white border border-surface-700 transition-colors">Free</span>
            </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default LoginPage;