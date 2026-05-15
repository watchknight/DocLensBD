import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      if (err.message.includes('API key not valid')) {
        setError('Firebase has not been configured with real keys yet.');
      } else {
        setError(err.message || 'Failed to log in');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      setError('Google Sign-In requires real Firebase configuration keys.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] flex">
      {/* Left — Brand Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A0A3E] via-[#12124F] to-[#1A1A5E] relative overflow-hidden items-center justify-center">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#00C9D6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#D4A855]/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-12">
          <svg width="80" height="80" viewBox="0 0 100 60" fill="none" className="mx-auto mb-8">
            <ellipse cx="25" cy="30" rx="20" ry="18" stroke="white" strokeWidth="3" fill="none" />
            <ellipse cx="75" cy="30" rx="20" ry="18" stroke="white" strokeWidth="3" fill="none" />
            <path d="M45 30 Q50 24 55 30" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
            <line x1="5" y1="30" x2="5" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="95" y1="30" x2="95" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <h1 className="text-4xl font-display font-extrabold text-white mb-4">Welcome Back</h1>
          <p className="text-white/50 text-lg max-w-sm mx-auto">Sign in to access your account, track orders, and continue shopping.</p>
          <div className="mt-10 flex justify-center gap-8 text-center">
            <div className="glass rounded-2xl px-6 py-4">
              <div className="text-2xl font-display font-bold text-[#00C9D6]">200+</div>
              <div className="text-white/40 text-xs mt-1">Frame Styles</div>
            </div>
            <div className="glass rounded-2xl px-6 py-4">
              <div className="text-2xl font-display font-bold text-[#D4A855]">50K+</div>
              <div className="text-white/40 text-xs mt-1">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-20">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-display font-extrabold text-[#0A0A3E] mb-2">Sign In</h2>
          <p className="text-[#5A5E7A] mb-8">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-[#00C9D6] hover:text-[#00B3BF]">Create one</Link>
          </p>

          {error && (
            <div className="mb-6 bg-[#FFE0E8] border border-[#FF6B8A]/20 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-[#FF6B8A] mt-0.5 flex-shrink-0" size={18} />
              <p className="text-sm text-[#FF6B8A] font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-[#0A0A3E] mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA0B8]" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#F0F2F8] border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C9D6]/40 focus:bg-white transition-all text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A0A3E] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA0B8]" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-[#F0F2F8] border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00C9D6]/40 focus:bg-white transition-all text-sm"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA0B8] hover:text-[#5A5E7A]">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3.5 rounded-xl font-bold text-white bg-[#0A0A3E] hover:bg-[#12124F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A0A3E] disabled:opacity-70 transition-colors btn-press text-sm"
            >
              {isLoading ? (
                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <><LogIn size={18} /> Sign In</>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E8EAF2]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#FAFBFD] text-[#9CA0B8]">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-3 py-3.5 border border-[#E8EAF2] rounded-xl bg-white text-sm font-medium text-[#0A0A3E] hover:bg-[#F0F2F8] transition-colors btn-press"
              >
                <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
