import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, UserPlus, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth, UserProfile } from '../../context/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // 1. Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Update their display name
      await updateProfile(userCredential.user, { displayName: name });
      
      // 3. Create their profile document in Firestore
      const newProfile: UserProfile = {
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', userCredential.user.uid), newProfile);
      
      // Navigate to homepage after successful registration
      navigate('/');
    } catch (err: any) {
      if (err.message.includes('API key not valid')) {
        setError('Firebase has not been configured with real keys yet.');
      } else {
        setError(err.message || 'Failed to create an account');
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
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left — Brand Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] relative overflow-hidden items-center justify-center">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#6366F1]/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-12">
          <svg width="80" height="80" viewBox="0 0 100 60" fill="none" className="mx-auto mb-8">
            <ellipse cx="25" cy="30" rx="20" ry="18" stroke="white" strokeWidth="3" fill="none" />
            <ellipse cx="75" cy="30" rx="20" ry="18" stroke="white" strokeWidth="3" fill="none" />
            <path d="M45 30 Q50 24 55 30" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
            <line x1="5" y1="30" x2="5" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="95" y1="30" x2="95" y2="18" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <h1 className="text-4xl font-display font-extrabold text-white mb-4">Join DocLensBD</h1>
          <p className="text-white/50 text-lg max-w-sm mx-auto">Create your account and discover Bangladesh's finest eyewear collection.</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-20">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-3xl font-display font-extrabold text-[#0F172A] mb-2">Create Account</h2>
          <p className="text-[#475569] mb-8">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#6366F1] hover:text-[#4F46E5]">Sign in</Link>
          </p>

          {error && (
            <div className="mb-6 bg-[#FFF1F2] border border-[#F43F5E]/20 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="text-[#F43F5E] mt-0.5 flex-shrink-0" size={18} />
              <p className="text-sm text-[#F43F5E] font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#F1F5F9] border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40 focus:bg-white transition-all text-sm"
                  placeholder="Your full name" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#F1F5F9] border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40 focus:bg-white transition-all text-sm"
                  placeholder="you@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
                <input type={showPassword ? 'text' : 'password'} required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 bg-[#F1F5F9] border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40 focus:bg-white transition-all text-sm"
                  placeholder="Min 6 characters" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3.5 rounded-xl font-bold text-white bg-[#6366F1] hover:bg-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366F1] disabled:opacity-70 transition-colors btn-press text-sm">
              {isLoading ? (
                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <><UserPlus size={18} /> Create Account</>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E2E8F0]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#F8FAFC] text-[#94A3B8]">Or sign up with</span>
              </div>
            </div>
            <div className="mt-6">
              <button onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-3 py-3.5 border border-[#E2E8F0] rounded-xl bg-white text-sm font-medium text-[#0F172A] hover:bg-[#F1F5F9] transition-colors btn-press">
                <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
