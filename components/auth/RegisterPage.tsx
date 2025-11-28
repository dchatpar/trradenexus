import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CpuChipIcon, GoogleIcon, LinkedInIcon } from '../Icons';

const RegisterPage: React.FC<{ onSwitchToLogin: () => void }> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });
  const { register, loginWithProvider } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    setIsSubmitting(true);
    try {
      await register(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocial = async (provider: 'google' | 'linkedin') => {
      await loginWithProvider(provider);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <CpuChipIcon className="h-10 w-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white">Create Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Company Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
              value={formData.company}
              onChange={e => setFormData({...formData, company: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Confirm</label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-slate-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
          >
            {isSubmitting ? 'Creating...' : 'Register'}
          </button>
        </form>

        <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-xs text-gray-500 uppercase">Or sign up with</span>
            <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
            <button onClick={() => handleSocial('google')} className="flex items-center justify-center py-2 px-4 bg-white hover:bg-gray-100 rounded-lg text-gray-700 font-medium transition-colors text-sm">
                <GoogleIcon className="h-4 w-4 mr-2" /> Google
            </button>
            <button onClick={() => handleSocial('linkedin')} className="flex items-center justify-center py-2 px-4 bg-[#0077B5] hover:bg-[#006097] rounded-lg text-white font-medium transition-colors text-sm">
                <LinkedInIcon className="h-4 w-4 mr-2" /> LinkedIn
            </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-blue-400 hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;