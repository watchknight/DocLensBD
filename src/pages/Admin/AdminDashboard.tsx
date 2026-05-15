import React, { useEffect, useState } from 'react';
import { Package, ShoppingBag, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { collection, getCountFromServer, query, limit, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productSnap = await getCountFromServer(collection(db, 'products'));
        const orderSnap = await getCountFromServer(collection(db, 'orders'));
        const userSnap = await getCountFromServer(collection(db, 'users'));

        setStats({
          products: productSnap.data().count,
          orders: orderSnap.data().count,
          users: userSnap.data().count
        });
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Revenue', value: '৳0', icon: <DollarSign size={24} className="text-[#00C9D6]" />, bg: 'bg-cyan-50' },
    { title: 'Total Orders', value: stats.orders, icon: <ShoppingBag size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
    { title: 'Active Products', value: stats.products, icon: <Package size={24} className="text-purple-600" />, bg: 'bg-purple-50' },
    { title: 'Registered Users', value: stats.users, icon: <Users size={24} className="text-orange-600" />, bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0A0A3E]">Dashboard Overview</h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-32"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-default">
              <div className={`p-4 rounded-xl ${card.bg}`}>
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">{card.title}</p>
                <h3 className="text-2xl font-bold text-[#0A0A3E] mt-1">{card.value}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder Chart / Recent Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
          <h3 className="text-lg font-bold text-[#0A0A3E] mb-4">Sales Analytics</h3>
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
             <div className="w-64 h-32 border-b-2 border-l-2 border-gray-200 relative mb-4 flex items-end justify-between px-2 pt-2">
                <div className="w-8 bg-blue-100 h-12 rounded-t-sm"></div>
                <div className="w-8 bg-cyan-100 h-8 rounded-t-sm"></div>
                <div className="w-8 bg-cyan-200 h-20 rounded-t-sm"></div>
                <div className="w-8 bg-[#00C9D6] h-24 rounded-t-sm"></div>
                <div className="w-8 bg-[#0A0A3E] h-16 rounded-t-sm"></div>
             </div>
             <p className="text-sm">Revenue charts will populate here once orders begin arriving via DB.</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-[#0A0A3E]">Recent Activity</h3>
           </div>
           
           <div className="space-y-4">
             {/* Mock Data Since we are just setting this up */}
             {[
               { title: 'New User Registered', time: 'Just now', color: 'bg-orange-500' },
               { title: 'System Migrated to Firebase', time: '2 mins ago', color: 'bg-green-500' },
               { title: 'Admin Dashboard Deployed', time: '5 mins ago', color: 'bg-blue-500' }
             ].map((log, i) => (
                <div key={i} className="flex gap-4">
                   <div className="mt-1">
                      <div className={`w-3 h-3 rounded-full ${log.color}`}></div>
                      {i !== 2 && <div className="w-0.5 h-10 bg-gray-100 mx-auto my-1"></div>}
                   </div>
                   <div>
                     <p className="text-sm font-medium text-gray-800">{log.title}</p>
                     <p className="text-xs text-gray-500">{log.time}</p>
                   </div>
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
