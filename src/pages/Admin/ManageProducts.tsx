import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Product } from '../../types';
import { products as localProducts } from '../../data/products';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, Database, X } from 'lucide-react';

const emptyProduct = {
  name: '',
  brand: '',
  price: 0,
  category: 'eyeglasses',
  gender: 'unisex',
  frameShape: 'rectangle',
  frameMaterial: 'acetate',
  frameColor: 'black',
  description: '',
  images: ['https://via.placeholder.com/600x400'],
  inStock: true,
  rating: 5,
  reviews: 0,
  bestseller: false,
  newArrival: true
};

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const items: Product[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as unknown as Product);
      });
      setProducts(items);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this product?')) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchProducts(); // Refresh
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  const handleMigrate = async () => {
    try {
      setLoading(true);
      let count = 0;
      for (const lp of localProducts) {
        await addDoc(collection(db, "products"), { ...lp });
        count++;
      }
      alert(`Successfully migrated ${count} products!`);
      // Optional: force a refresh
      window.location.reload(); 
    } catch (error) {
      console.error("Migration failed:", error);
      alert("Migration failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await addDoc(collection(db, "products"), {
        ...newProduct,
        id: crypto.randomUUID() // local ID stub, Firestore gives its own ID
      });
      setIsAdding(false);
      setNewProduct(emptyProduct); // Reset
      fetchProducts(); // Refresh
    } catch (error) {
      console.error("Failed to add product", error);
      alert("Failed to add product.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#000042]">Inventory Management</h2>
          <p className="text-sm text-gray-500 mt-1">Add, edit, and organize your products.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 bg-[#00BAC6] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-[#00BAC6]/20 hover:bg-[#00a8b3] transition-colors"
        >
          <Plus size={18} /> New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
           <div className="relative w-72">
             <input 
               type="text" 
               placeholder="Search products..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#00BAC6]/20 outline-none"
             />
             <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
           </div>
           <div className="text-sm font-medium text-gray-500">
             {filteredProducts.length} items
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 rounded-tl-lg">Product</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-gray-400">Loading products from Database...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center bg-gray-50/50">
                     <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                       <Database size={48} className="text-gray-300 mb-4" />
                       <h3 className="text-[#000042] font-bold text-lg mb-2">Database is Empty</h3>
                       <p className="text-sm text-gray-500 mb-6">You currently have no products in your live cloud database. Let's securely migrate your local product data to the cloud.</p>
                       <button 
                         onClick={handleMigrate}
                         className="flex items-center gap-2 bg-[#000042] text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-blue-900 transition-colors w-full justify-center"
                       >
                         <Database size={18} /> Push Local Data to Firebase
                       </button>
                     </div>
                   </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 border-b flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover mix-blend-multiply"
                          onError={(e) =>(e.currentTarget.src = "https://via.placeholder.com/150")}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#000042]">{product.name}</p>
                        <p className="text-xs text-gray-500">ID: {String(product.id).substring(0,8)}...</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{product.brand}</td>
                    <td className="px-6 py-4 capitalize">
                       <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                         product.category === 'eyeglasses' ? 'bg-blue-100 text-blue-700' :
                         product.category === 'sunglasses' ? 'bg-orange-100 text-orange-700' :
                         'bg-gray-100 text-gray-700'
                       }`}>
                         {product.category}
                       </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-[#00BAC6]">৳{product.price}</td>
                    <td className="px-6 py-4 text-right space-x-2 w-32">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors p-1" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(String(product.id))} className="text-gray-400 hover:text-red-600 transition-colors p-1" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#000042]">Add New Product</h3>
              <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <form id="add-product-form" onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00BAC6]/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                    <input required value={newProduct.brand} onChange={e => setNewProduct({...newProduct, brand: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00BAC6]/20 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (৳)</label>
                    <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00BAC6]/20 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00BAC6]/20 outline-none">
                      <option value="eyeglasses">Eyeglasses</option>
                      <option value="sunglasses">Sunglasses</option>
                      <option value="computer-glasses">Computer Glasses</option>
                      <option value="kids">Kids</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input required value={newProduct.images[0]} onChange={e => setNewProduct({...newProduct, images: [e.target.value]})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00BAC6]/20 outline-none" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00BAC6]/20 outline-none" />
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
               <button onClick={() => setIsAdding(false)} type="button" className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-white border-transparent hover:border-gray-200 border rounded-xl transition-all">Cancel</button>
               <button type="submit" form="add-product-form" disabled={isSaving} className="px-5 py-2.5 text-sm font-bold bg-[#00BAC6] text-white rounded-xl shadow-sm hover:bg-[#00a8b3] transition-colors disabled:opacity-50">
                 {isSaving ? 'Saving...' : 'Add Product'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
