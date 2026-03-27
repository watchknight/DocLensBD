import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PackageSearch, ShoppingBag, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#000042] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-blue-900/50">
          <h2 className="text-2xl font-bold tracking-wide">DocLens<span className="text-[#00BAC6]">Admin</span></h2>
          <p className="text-xs text-blue-300 mt-1">Logged in as {profile?.name}</p>
        </div>

        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            <li>
              <NavLink 
                to="/admin/dashboard" 
                className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-[#00BAC6] text-white shadow-lg shadow-cyan-500/20' : 'text-blue-100 hover:bg-white/10'}`}
              >
                <LayoutDashboard size={20} /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/products" 
                className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-[#00BAC6] text-white shadow-lg shadow-cyan-500/20' : 'text-blue-100 hover:bg-white/10'}`}
              >
                <PackageSearch size={20} /> Manage Products
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/orders" 
                className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-[#00BAC6] text-white shadow-lg shadow-cyan-500/20' : 'text-blue-100 hover:bg-white/10'}`}
              >
                <ShoppingBag size={20} /> View Orders
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-900/50 space-y-2">
          <button 
            onClick={() => navigate('/')} 
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <ExternalLink size={16} /> Live Website
          </button>
          
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-red-300 hover:text-white hover:bg-red-500/20 shadow-sm transition-colors text-sm font-bold"
          >
            <LogOut size={16} /> Secure Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden flex flex-col h-screen overflow-y-auto bg-gray-50/50">
        <header className="bg-white border-b border-gray-100 px-8 py-4 sticky top-0 z-10 flex items-center justify-between shadow-sm">
           <h1 className="text-xl font-bold text-gray-800">Control Center</h1>
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#000042] to-[#00BAC6] flex items-center justify-center text-white font-bold text-sm shadow-md">
                {profile?.name?.charAt(0)?.toUpperCase()}
             </div>
           </div>
        </header>

        <div className="p-8">
          {/* This Outlet renders the specific Admin Page */}
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
