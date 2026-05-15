import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Search, Eye, ShoppingCart, Truck, CheckCircle, Clock } from 'lucide-react';

interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  paymentMethod: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to orders in real time
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach(doc => {
        ordersData.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (error) {
      console.error("Failed to change order status", error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold flex gap-1 items-center w-fit"><Clock size={12}/> Pending</span>;
      case 'processing': return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold flex gap-1 items-center w-fit"><ShoppingCart size={12}/> Processing</span>;
      case 'shipped': return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold flex gap-1 items-center w-fit"><Truck size={12}/> Shipped</span>;
      case 'delivered': return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex gap-1 items-center w-fit"><CheckCircle size={12}/> Delivered</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#0A0A3E]">Order Management</h2>
        <div className="text-sm text-gray-500 font-medium">Real-time updates active</div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg">Order ID & Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">Loading live orders...</td></tr>
              ) : orders.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium">No orders have been placed yet.</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 border-b">
                      <p className="font-bold text-[#0A0A3E]">#{order.id.substring(0,8).toUpperCase()}</p>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#00C9D6]">৳{order.total}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#00C9D6] bg-gray-50 font-medium cursor-pointer mr-3"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
         </div>
      </div>
    </div>
  );
};

export default AdminOrders;
