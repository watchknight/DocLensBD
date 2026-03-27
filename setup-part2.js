const fs = require('fs');

// ========== LOGIN PAGE ==========
const loginPage = `import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate(from, { replace: true });
        } else {
          setError('Invalid email or password');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        const success = await signup(formData.name, formData.email, formData.password, formData.phone);
        if (success) {
          navigate(from, { replace: true });
        } else {
          setError('Email already exists');
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">👓</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DocLensBD
            </span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Tabs */}
          <div className="flex mb-8">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={\`flex-1 py-3 text-center font-semibold border-b-2 transition-colors \${
                isLogin ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'
              }\`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={\`flex-1 py-3 text-center font-semibold border-b-2 transition-colors \${
                !isLogin ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'
              }\`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Login' : 'Create Account'} <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="flex items-center justify-center gap-2 py-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>

        {/* Terms */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
`;
fs.writeFileSync('./src/pages/Login.tsx', loginPage);

console.log('Created Login page...');

// ========== ACCOUNT PAGE ==========
const accountPage = `import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, FileText, Heart, ShoppingBag, LogOut, Edit2, Trash2, Plus, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Account: React.FC = () => {
  const { user, logout, updateProfile, addAddress, removeAddress, setDefaultAddress, removePrescription } = useAuth();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editingProfile, setEditingProfile] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [addressData, setAddressData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    isDefault: false
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileSave = () => {
    updateProfile(profileData);
    setEditingProfile(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(addressData);
    setAddressData({ name: '', phone: '', address: '', city: '', postalCode: '', isDefault: false });
    setShowAddressForm(false);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'prescriptions', name: 'Prescriptions', icon: FileText },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'orders', name: 'Orders', icon: ShoppingBag }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-3xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="font-semibold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={\`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors \${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }\`}
                  >
                    <tab.icon size={20} />
                    {tab.name}
                    {tab.id === 'wishlist' && wishlistItems.length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {wishlistItems.length}
                      </span>
                    )}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                    <button
                      onClick={() => setEditingProfile(!editingProfile)}
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                    >
                      <Edit2 size={18} />
                      {editingProfile ? 'Cancel' : 'Edit'}
                    </button>
                  </div>

                  {editingProfile ? (
                    <form className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleProfileSave}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm text-gray-500">Name</span>
                        <p className="font-medium text-gray-800">{user.name}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Email</span>
                        <p className="font-medium text-gray-800">{user.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Phone</span>
                        <p className="font-medium text-gray-800">{user.phone || 'Not provided'}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Saved Addresses</h2>
                    <button
                      onClick={() => setShowAddressForm(!showAddressForm)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <Plus size={18} />
                      Add New
                    </button>
                  </div>

                  {showAddressForm && (
                    <form onSubmit={handleAddAddress} className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-gray-800 mb-4">Add New Address</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            required
                            value={addressData.name}
                            onChange={(e) => setAddressData({ ...addressData, name: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            required
                            value={addressData.phone}
                            onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <textarea
                            required
                            value={addressData.address}
                            onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={addressData.city}
                            onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                          <input
                            type="text"
                            required
                            value={addressData.postalCode}
                            onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <label className="flex items-center gap-2 mt-4">
                        <input
                          type="checkbox"
                          checked={addressData.isDefault}
                          onChange={(e) => setAddressData({ ...addressData, isDefault: e.target.checked })}
                        />
                        <span className="text-sm text-gray-600">Set as default address</span>
                      </label>
                      <div className="flex gap-4 mt-4">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddressForm(false)}
                          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {user.addresses && user.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {user.addresses.map(address => (
                        <div key={address.id} className="border rounded-lg p-4 relative">
                          {address.isDefault && (
                            <span className="absolute top-2 right-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                          <p className="font-semibold text-gray-800">{address.name}</p>
                          <p className="text-gray-600">{address.address}</p>
                          <p className="text-gray-600">{address.city}, {address.postalCode}</p>
                          <p className="text-gray-600">{address.phone}</p>
                          <div className="flex gap-4 mt-3">
                            {!address.isDefault && (
                              <button
                                onClick={() => setDefaultAddress(address.id)}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                Set as Default
                              </button>
                            )}
                            <button
                              onClick={() => removeAddress(address.id)}
                              className="text-sm text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>No addresses saved yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Prescriptions Tab */}
              {activeTab === 'prescriptions' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Saved Prescriptions</h2>
                    <Link
                      to="/prescription"
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      <Plus size={18} />
                      Add New
                    </Link>
                  </div>

                  {user.prescriptions && user.prescriptions.length > 0 ? (
                    <div className="space-y-4">
                      {user.prescriptions.map(p => (
                        <div key={p.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-800">{p.name}</h3>
                            <button
                              onClick={() => removePrescription(p.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Right Eye SPH:</span>
                              <p className="font-medium">{p.prescription.rightEye.sph || '-'}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Right Eye CYL:</span>
                              <p className="font-medium">{p.prescription.rightEye.cyl || '-'}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Left Eye SPH:</span>
                              <p className="font-medium">{p.prescription.leftEye.sph || '-'}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Left Eye CYL:</span>
                              <p className="font-medium">{p.prescription.leftEye.cyl || '-'}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">
                            Added on {new Date(p.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>No prescriptions saved yet</p>
                      <Link to="/prescription" className="text-blue-600 hover:underline mt-2 inline-block">
                        Add your prescription
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">My Wishlist</h2>
                  {wishlistItems.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlistItems.map(product => (
                        <Link
                          key={product.id}
                          to={\`/product/\${product.id}\`}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <p className="text-sm text-blue-600">{product.brand}</p>
                          <h3 className="font-medium text-gray-800 line-clamp-1">{product.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-500">{product.rating}</span>
                          </div>
                          <p className="font-bold text-gray-900 mt-2">৳{product.price.toLocaleString()}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Heart size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>Your wishlist is empty</p>
                      <Link to="/products" className="text-blue-600 hover:underline mt-2 inline-block">
                        Browse products
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-6">My Orders</h2>
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No orders yet</p>
                    <Link to="/products" className="text-blue-600 hover:underline mt-2 inline-block">
                      Start shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
`;
fs.writeFileSync('./src/pages/Account.tsx', accountPage);

console.log('Created Account page...');

// ========== WISHLIST PAGE ==========
const wishlistPage = `import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist: React.FC = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart size={80} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h1>
          <p className="text-gray-500 mb-6">Save items you love to your wishlist</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Browse Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist ({wishlistItems.length})</h1>
          <button
            onClick={clearWishlist}
            className="text-red-500 hover:underline"
          >
            Clear All
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative aspect-square">
                <Link to={\`/product/\${product.id}\`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="p-4">
                <Link to={\`/product/\${product.id}\`}>
                  <p className="text-sm text-blue-600">{product.brand}</p>
                  <h3 className="font-semibold text-gray-800 line-clamp-2 hover:text-blue-600">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
`;
fs.writeFileSync('./src/pages/Wishlist.tsx', wishlistPage);

console.log('Created Wishlist page...');

// ========== PRESCRIPTION PAGE ==========
const prescriptionPage = `import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, Upload, Info, Check, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Prescription } from '../types';

const PrescriptionPage: React.FC = () => {
  const { user, savePrescription } = useAuth();
  const { updatePrescription } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const productId = (location.state as any)?.productId;
  const returnTo = (location.state as any)?.returnTo || '/account';

  const [activeTab, setActiveTab] = useState<'manual' | 'upload' | 'saved'>('manual');
  const [prescriptionName, setPrescriptionName] = useState('My Prescription');
  const [prescription, setPrescription] = useState<Prescription>({
    rightEye: { sph: '', cyl: '', axis: '', add: '' },
    leftEye: { sph: '', cyl: '', axis: '', add: '' },
    pd: '',
    prescriptionType: 'single-vision'
  });

  const sphOptions = ['-10.00', '-9.50', '-9.00', '-8.50', '-8.00', '-7.50', '-7.00', '-6.50', '-6.00', '-5.50', '-5.00', '-4.50', '-4.00', '-3.50', '-3.00', '-2.50', '-2.00', '-1.50', '-1.00', '-0.50', '0.00', '+0.50', '+1.00', '+1.50', '+2.00', '+2.50', '+3.00', '+3.50', '+4.00', '+4.50', '+5.00', '+5.50', '+6.00'];
  const cylOptions = ['-4.00', '-3.75', '-3.50', '-3.25', '-3.00', '-2.75', '-2.50', '-2.25', '-2.00', '-1.75', '-1.50', '-1.25', '-1.00', '-0.75', '-0.50', '-0.25', '0.00'];
  const axisOptions = Array.from({ length: 181 }, (_, i) => i.toString());
  const addOptions = ['+0.75', '+1.00', '+1.25', '+1.50', '+1.75', '+2.00', '+2.25', '+2.50', '+2.75', '+3.00'];
  const pdOptions = Array.from({ length: 31 }, (_, i) => (50 + i).toString());

  const handleSavePrescription = () => {
    if (user) {
      savePrescription(prescriptionName, prescription);
      alert('Prescription saved successfully!');
    }
  };

  const handleSubmit = () => {
    if (productId) {
      updatePrescription(productId, prescription);
      navigate('/cart');
    } else {
      handleSavePrescription();
      navigate(returnTo);
    }
  };

  const handleUseSaved = (saved: any) => {
    setPrescription(saved.prescription);
    setActiveTab('manual');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Enter Your Prescription</h1>
        <p className="text-gray-500 mb-8">Add your prescription details for accurate lens preparation</p>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('manual')}
            className={\`flex-1 py-4 px-6 rounded-xl font-medium transition-all \${
              activeTab === 'manual'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }\`}
          >
            <Eye className="mx-auto mb-2" size={24} />
            Enter Manually
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={\`flex-1 py-4 px-6 rounded-xl font-medium transition-all \${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }\`}
          >
            <Upload className="mx-auto mb-2" size={24} />
            Upload Prescription
          </button>
          {user && user.prescriptions && user.prescriptions.length > 0 && (
            <button
              onClick={() => setActiveTab('saved')}
              className={\`flex-1 py-4 px-6 rounded-xl font-medium transition-all \${
                activeTab === 'saved'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }\`}
            >
              <Save className="mx-auto mb-2" size={24} />
              Use Saved
            </button>
          )}
        </div>

        {/* Manual Entry */}
        {activeTab === 'manual' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {/* Info Banner */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 flex gap-3">
              <Info className="text-blue-600 flex-shrink-0" size={24} />
              <div>
                <p className="font-medium text-blue-800">How to read your prescription</p>
                <p className="text-sm text-blue-600">
                  SPH (Sphere) corrects nearsightedness (-) or farsightedness (+). 
                  CYL (Cylinder) and Axis correct astigmatism. ADD is for reading/bifocal.
                </p>
              </div>
            </div>

            {/* Prescription Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Prescription Type</label>
              <div className="flex gap-4">
                {[
                  { id: 'single-vision', name: 'Single Vision', desc: 'One field of vision' },
                  { id: 'bifocal', name: 'Bifocal', desc: 'Near and far vision' },
                  { id: 'progressive', name: 'Progressive', desc: 'Seamless multi-focal' }
                ].map(type => (
                  <label
                    key={type.id}
                    className={\`flex-1 p-4 border rounded-lg cursor-pointer transition-colors \${
                      prescription.prescriptionType === type.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }\`}
                  >
                    <input
                      type="radio"
                      name="prescriptionType"
                      value={type.id}
                      checked={prescription.prescriptionType === type.id}
                      onChange={(e) => setPrescription({ ...prescription, prescriptionType: e.target.value as any })}
                      className="sr-only"
                    />
                    <p className="font-medium text-gray-800">{type.name}</p>
                    <p className="text-sm text-gray-500">{type.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Right Eye */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">R</span>
                Right Eye (OD)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">SPH (Sphere)</label>
                  <select
                    value={prescription.rightEye.sph}
                    onChange={(e) => setPrescription({
                      ...prescription,
                      rightEye: { ...prescription.rightEye, sph: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {sphOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">CYL (Cylinder)</label>
                  <select
                    value={prescription.rightEye.cyl}
                    onChange={(e) => setPrescription({
                      ...prescription,
                      rightEye: { ...prescription.rightEye, cyl: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {cylOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Axis</label>
                  <select
                    value={prescription.rightEye.axis}
                    onChange={(e) => setPrescription({
                      ...prescription,
                      rightEye: { ...prescription.rightEye, axis: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {axisOptions.map(opt => <option key={opt} value={opt}>{opt}°</option>)}
                  </select>
                </div>
                {(prescription.prescriptionType === 'bifocal' || prescription.prescriptionType === 'progressive') && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">ADD</label>
                    <select
                      value={prescription.rightEye.add}
                      onChange={(e) => setPrescription({
                        ...prescription,
                        rightEye: { ...prescription.rightEye, add: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      {addOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Left Eye */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">L</span>
                Left Eye (OS)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">SPH (Sphere)</label>
                  <select
                    value={prescription.leftEye.sph}
                    onChange={(e) => setPrescription({
                      ...prescription,
                      leftEye: { ...prescription.leftEye, sph: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {sphOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">CYL (Cylinder)</label>
                  <select
                    value={prescription.leftEye.cyl}
                    onChange={(e) => setPrescription({
                      ...prescription,
                      leftEye: { ...prescription.leftEye, cyl: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {cylOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Axis</label>
                  <select
                    value={prescription.leftEye.axis}
                    onChange={(e) => setPrescription({
                      ...prescription,
                      leftEye: { ...prescription.leftEye, axis: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {axisOptions.map(opt => <option key={opt} value={opt}>{opt}°</option>)}
                  </select>
                </div>
                {(prescription.prescriptionType === 'bifocal' || prescription.prescriptionType === 'progressive') && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">ADD</label>
                    <select
                      value={prescription.leftEye.add}
                      onChange={(e) => setPrescription({
                        ...prescription,
                        leftEye: { ...prescription.leftEye, add: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select</option>
                      {addOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* PD */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PD (Pupillary Distance) in mm
              </label>
              <select
                value={prescription.pd}
                onChange={(e) => setPrescription({ ...prescription, pd: e.target.value })}
                className="w-full max-w-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select PD</option>
                {pdOptions.map(opt => <option key={opt} value={opt}>{opt} mm</option>)}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                PD is the distance between your pupils. Usually between 54-74mm for adults.
              </p>
            </div>

            {/* Save Option */}
            {user && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prescription Name (for saving)
                </label>
                <input
                  type="text"
                  value={prescriptionName}
                  onChange={(e) => setPrescriptionName(e.target.value)}
                  className="w-full max-w-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., My Daily Glasses"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
              >
                <Check size={20} />
                {productId ? 'Apply to Order' : 'Save Prescription'}
              </button>
              {user && !productId && (
                <button
                  onClick={handleSavePrescription}
                  className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 flex items-center gap-2"
                >
                  <Save size={20} />
                  Save Only
                </button>
              )}
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Upload Your Prescription</h3>
              <p className="text-gray-500 mb-4">
                Drag and drop your prescription image or PDF, or click to browse
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                id="prescription-upload"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    alert('File uploaded! Our team will verify and process your prescription.');
                  }
                }}
              />
              <label
                htmlFor="prescription-upload"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-blue-700"
              >
                Choose File
              </label>
              <p className="text-sm text-gray-400 mt-4">
                Supported formats: JPG, PNG, PDF (Max 5MB)
              </p>
            </div>
          </div>
        )}

        {/* Saved Prescriptions Tab */}
        {activeTab === 'saved' && user?.prescriptions && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Your Saved Prescriptions</h3>
            <div className="space-y-4">
              {user.prescriptions.map(saved => (
                <div
                  key={saved.id}
                  className="border rounded-lg p-4 hover:border-blue-300 cursor-pointer"
                  onClick={() => handleUseSaved(saved)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{saved.name}</h4>
                      <p className="text-sm text-gray-500">
                        R: SPH {saved.prescription.rightEye.sph || 'N/A'} | L: SPH {saved.prescription.leftEye.sph || 'N/A'}
                      </p>
                    </div>
                    <button className="text-blue-600 hover:underline">
                      Use This
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionPage;
`;
fs.writeFileSync('./src/pages/Prescription.tsx', prescriptionPage);

console.log('Created Prescription page...');

// ========== VIRTUAL TRY-ON PAGE ==========
const virtualTryOnPage = `import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Camera, CameraOff, RotateCcw, Download, Share2, ShoppingCart, ArrowLeft, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const VirtualTryOn: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(products.find(p => p.id === Number(id)) || products[0]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facePosition, setFacePosition] = useState({ x: 50, y: 40, scale: 1 });

  const similarProducts = products.filter(p => 
    p.category === selectedProduct.category && p.id !== selectedProduct.id
  ).slice(0, 6);

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setCapturedImage(null);
      }
    } catch (err) {
      alert('Unable to access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        setCapturedImage(canvas.toDataURL('image/png'));
        stopCamera();
      }
    }
  };

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = \`doclensbd-tryon-\${selectedProduct.id}.png\`;
      link.href = capturedImage;
      link.click();
    }
  };

  const resetTryOn = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to={\`/product/\${selectedProduct.id}\`} className="flex items-center gap-2 hover:underline">
              <ArrowLeft size={20} />
              Back to Product
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span className="font-semibold">Virtual Try-On</span>
            </div>
            <button
              onClick={() => addToCart(selectedProduct)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Try-On Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-2xl overflow-hidden">
              {/* Camera/Image View */}
              <div className="relative aspect-video bg-black">
                {!cameraActive && !capturedImage && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <Camera size={64} className="text-gray-500 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Virtual Try-On</h2>
                    <p className="text-gray-400 mb-6 text-center max-w-md">
                      See how our glasses look on you! Start your camera to begin the virtual try-on experience.
                    </p>
                    <button
                      onClick={startCamera}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Camera size={20} />
                      Start Camera
                    </button>
                  </div>
                )}

                {cameraActive && (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      style={{ transform: 'scaleX(-1)' }}
                    />
                    {/* Glasses Overlay - Simulated */}
                    <div 
                      className="absolute pointer-events-none"
                      style={{
                        left: \`\${facePosition.x}%\`,
                        top: \`\${facePosition.y}%\`,
                        transform: \`translate(-50%, -50%) scale(\${facePosition.scale})\`,
                        width: '200px',
                        transition: 'all 0.1s ease'
                      }}
                    >
                      <img
                        src={selectedProduct.images[0]}
                        alt="Glasses overlay"
                        className="w-full opacity-80"
                        style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
                      />
                    </div>
                  </>
                )}

                {capturedImage && (
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-full object-cover"
                  />
                )}

                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Controls */}
              <div className="p-4 flex items-center justify-center gap-4">
                {cameraActive && (
                  <>
                    <button
                      onClick={stopCamera}
                      className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                      title="Stop Camera"
                    >
                      <CameraOff size={24} />
                    </button>
                    <button
                      onClick={capturePhoto}
                      className="p-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 ring-4 ring-blue-500"
                      title="Capture Photo"
                    >
                      <Camera size={32} />
                    </button>
                  </>
                )}

                {capturedImage && (
                  <>
                    <button
                      onClick={resetTryOn}
                      className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 flex items-center gap-2"
                    >
                      <RotateCcw size={20} />
                      Try Again
                    </button>
                    <button
                      onClick={downloadImage}
                      className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Download size={20} />
                      Download
                    </button>
                    <button
                      className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 flex items-center gap-2"
                    >
                      <Share2 size={20} />
                      Share
                    </button>
                  </>
                )}

                {!cameraActive && !capturedImage && (
                  <p className="text-gray-400">Click "Start Camera" to begin</p>
                )}
              </div>

              {/* Position Adjustment (when camera active) */}
              {cameraActive && (
                <div className="p-4 border-t border-gray-700">
                  <p className="text-white text-sm mb-3">Adjust glasses position:</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-gray-400 text-xs">Horizontal</label>
                      <input
                        type="range"
                        min="20"
                        max="80"
                        value={facePosition.x}
                        onChange={(e) => setFacePosition({ ...facePosition, x: Number(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs">Vertical</label>
                      <input
                        type="range"
                        min="20"
                        max="60"
                        value={facePosition.y}
                        onChange={(e) => setFacePosition({ ...facePosition, y: Number(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs">Size</label>
                      <input
                        type="range"
                        min="0.5"
                        max="1.5"
                        step="0.1"
                        value={facePosition.scale}
                        onChange={(e) => setFacePosition({ ...facePosition, scale: Number(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Info Banner */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> This is a simplified virtual try-on. For the best experience, 
                position yourself facing the camera with good lighting. The actual glasses may appear 
                slightly different in person.
              </p>
            </div>
          </div>

          {/* Product Selection Sidebar */}
          <div className="lg:col-span-1">
            {/* Current Product */}
            <div className="bg-white rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Currently Trying</h3>
              <div className="flex gap-4">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <p className="text-sm text-blue-600">{selectedProduct.brand}</p>
                  <h4 className="font-medium text-gray-800">{selectedProduct.name}</h4>
                  <p className="font-bold text-gray-900 mt-1">৳{selectedProduct.price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Similar Products */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Try Other Frames</h3>
              <div className="grid grid-cols-2 gap-3">
                {similarProducts.map(product => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={\`p-2 rounded-lg border transition-colors \${
                      selectedProduct.id === product.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }\`}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-20 object-cover rounded mb-2"
                    />
                    <p className="text-xs text-gray-800 line-clamp-1">{product.name}</p>
                    <p className="text-xs font-bold">৳{product.price.toLocaleString()}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
`;
fs.writeFileSync('./src/pages/VirtualTryOn.tsx', virtualTryOnPage);

console.log('Created Virtual Try-On page...');

console.log('\\n✅ Part 2 complete - Created Login, Account, Wishlist, Prescription, and Virtual Try-On pages');
