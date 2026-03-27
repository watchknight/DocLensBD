import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Sparkles, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import VirtualTryOn from '../components/VirtualTryOn';
import { products, frameShapes } from '../data/products';

const Home: React.FC = () => {
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNew);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);

  return (
    <div>
      <Hero />

      {/* Shop by Frame Shape — Lenskart-style */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#000042]">Shop by Frame Shape</h2>
            <p className="text-gray-500 mt-2">Find the perfect frame that suits your face</p>
          </div>
          <div className="shape-scroll flex gap-6 overflow-x-auto pb-4 justify-center flex-wrap">
            {frameShapes.map((shape) => (
              <Link key={shape.id} to={`/products?frameShape=${shape.id}`}
                className="flex flex-col items-center gap-3 min-w-[100px] group">
                <div className="w-24 h-24 rounded-2xl bg-white shadow-md flex items-center justify-center text-4xl group-hover:shadow-xl group-hover:scale-110 group-hover:bg-[#000042] group-hover:text-white transition-all duration-300 border border-gray-100">
                  {shape.icon}
                </div>
                <span className="text-sm font-medium text-[#000042] group-hover:text-[#00BAC6] transition-colors">{shape.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#000042]">🔥 Bestsellers</h2>
              <p className="text-gray-500 mt-1">Our most loved frames</p>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-[#00BAC6] font-semibold hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Try-On CTA */}
      <section className="py-14 bg-gradient-to-r from-[#000042] to-[#000066]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#00BAC6]/20 p-3 rounded-xl">
                  <Eye className="text-[#00BAC6]" size={32} />
                </div>
                <span className="bg-[#00BAC6] text-white text-xs font-bold px-3 py-1 rounded-full">3D VIRTUAL TRY-ON</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Try Before You Buy!</h2>
              <p className="text-white/70 text-lg mb-6">
                Use your camera to see how frames look on your face. Our advanced AR technology gives you a realistic preview from the comfort of your home.
              </p>
              <button onClick={() => setIsTryOnOpen(true)} className="inline-flex items-center gap-2 bg-[#00BAC6] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#00a8b3] transition-all shadow-lg">
                <Eye size={20} /> Try On Now
              </button>
            </div>
            <div className="flex-1 relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-[#00BAC6]">100+</div>
                    <p className="text-white/70 text-sm mt-1">Frames to try</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-white">Real-Time</div>
                    <p className="text-white/70 text-sm mt-1">AR Preview</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-white">360°</div>
                    <p className="text-white/70 text-sm mt-1">View angle</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-[#00BAC6]">Free</div>
                    <p className="text-white/70 text-sm mt-1">No app needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#000042]">✨ New Arrivals</h2>
              <p className="text-gray-500 mt-1">Fresh styles just dropped</p>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-[#00BAC6] font-semibold hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#000042] text-center mb-10">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-gradient-to-br from-[#000042] to-[#000066] rounded-2xl p-8 text-white hover:scale-[1.02] transition-transform">
              <Sparkles className="text-[#00BAC6] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Home Try-On</h3>
              <p className="text-white/70 mb-4">Select up to 5 frames and try them at home for free. No obligation to buy.</p>
              <Link to="/products" className="text-[#00BAC6] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Try Now <ArrowRight size={16} />
              </Link>
            </div>
            <div className="group bg-gradient-to-br from-[#00BAC6] to-[#008a93] rounded-2xl p-8 text-white hover:scale-[1.02] transition-transform">
              <Eye className="text-white mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2">Free Eye Checkup</h3>
              <p className="text-white/80 mb-4">Visit any DocLens store for a complimentary eye checkup by certified optometrists.</p>
              <Link to="/contact" className="text-white font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Book Now <ArrowRight size={16} />
              </Link>
            </div>
            <div className="group bg-white border-2 border-[#000042]/10 rounded-2xl p-8 hover:scale-[1.02] hover:shadow-xl transition-all">
              <ShieldCheck className="text-[#000042] mb-4" size={40} />
              <h3 className="text-xl font-bold text-[#000042] mb-2">Frame Protection Plan</h3>
              <p className="text-gray-500 mb-4">Extended warranty coverage with scratch replacement and free adjustments.</p>
              <Link to="/about" className="text-[#00BAC6] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Brands */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-6">Trusted by thousands of happy customers</p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            <div className="flex items-center gap-1 text-[#000042]/30 text-2xl font-bold">DocLens Premium</div>
            <div className="flex items-center gap-1 text-[#000042]/30 text-2xl font-bold">DocLens Elite</div>
            <div className="flex items-center gap-1 text-[#000042]/30 text-2xl font-bold">DocLens Chic</div>
            <div className="flex items-center gap-1 text-[#000042]/30 text-2xl font-bold">DocLens Digital</div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-yellow-400" fill="#facc15" />)}
              </div>
              <span className="font-bold text-[#000042]">4.8/5</span>
              <span className="text-gray-400 text-sm">(10K+ Reviews)</span>
            </div>
          </div>
        </div>
      </section>
      <VirtualTryOn isOpen={isTryOnOpen} onClose={() => setIsTryOnOpen(false)} />
    </div>
  );
};

export default Home;
