import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Sparkles, ArrowRight, ShieldCheck, RectangleHorizontal, Circle, Diamond, Hexagon, Pentagon, Square, Octagon, Triangle, Truck, Shield, RotateCcw } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import VirtualTryOn from '../components/VirtualTryOn';
import { products } from '../data/products';

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const frameShapeIcons: Record<string, React.ReactNode> = {
  rectangle: <RectangleHorizontal size={28} />,
  round: <Circle size={28} />,
  aviator: <Diamond size={28} />,
  'cat-eye': <Pentagon size={28} />,
  square: <Square size={28} />,
  wayfarer: <Hexagon size={28} />,
  oval: <Octagon size={28} />,
  geometric: <Triangle size={28} />,
};

const frameShapesList = [
  { id: 'rectangle', name: 'Rectangle' },
  { id: 'round', name: 'Round' },
  { id: 'aviator', name: 'Aviator' },
  { id: 'cat-eye', name: 'Cat Eye' },
  { id: 'square', name: 'Square' },
  { id: 'wayfarer', name: 'Wayfarer' },
  { id: 'oval', name: 'Oval' },
  { id: 'geometric', name: 'Geometric' },
];

const Home: React.FC = () => {
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNew);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);

  const shapesRef = useReveal();
  const bestsellersRef = useReveal();
  const tryOnRef = useReveal();
  const arrivalsRef = useReveal();
  const servicesRef = useReveal();

  return (
    <div>
      <Hero />

      {/* Shop by Frame Shape */}
      <section ref={shapesRef as React.RefObject<HTMLElement>} className="reveal py-20 bg-white" aria-label="Shop by frame shape">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6366F1] mb-3">Find Your Style</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] font-display">Shop by Frame Shape</h2>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 justify-center flex-wrap">
            {frameShapesList.map((shape) => (
              <Link key={shape.id} to={`/products?frameShape=${shape.id}`}
                className="flex flex-col items-center gap-3 min-w-[90px] group">
                <div className="w-20 h-20 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white group-hover:border-[#0F172A] group-hover:scale-110 transition-all duration-300">
                  {frameShapeIcons[shape.id]}
                </div>
                <span className="text-sm font-medium text-[#475569] group-hover:text-[#0F172A] transition-colors">{shape.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section ref={bestsellersRef as React.RefObject<HTMLElement>} className="reveal py-20 bg-[#F8FAFC]" aria-label="Bestselling products">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6366F1] mb-3">Top Picks</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] font-display">Bestsellers</h2>
            </div>
            <Link to="/products" className="flex items-center gap-1.5 text-[#0F172A] font-semibold text-sm hover:text-[#6366F1] transition-colors btn-press">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Try-On CTA */}
      <section ref={tryOnRef as React.RefObject<HTMLElement>} className="reveal py-24 bg-[#0F172A] relative overflow-hidden" aria-label="Virtual try-on feature">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6366F1]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981]/6 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#6366F1]/20 p-3 rounded-xl">
                  <Eye className="text-[#6366F1]" size={28} />
                </div>
                <span className="badge-new text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">AI Powered</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 leading-[1.08] tracking-tight">
                Virtual<br/>Try-On
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-md leading-relaxed">
                Use your camera to see how frames look on you. Real-time AI face-tracking gives you a realistic preview from home.
              </p>
              <button onClick={() => setIsTryOnOpen(true)} className="btn-press inline-flex items-center gap-2 bg-[#6366F1] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#4F46E5] transition-all">
                <Eye size={20} /> Try On Now
              </button>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '200+', label: 'Frames to try', color: 'text-[#6366F1]' },
                  { value: 'Real-Time', label: 'AI Tracking', color: 'text-white' },
                  { value: '360°', label: 'View angle', color: 'text-white' },
                  { value: 'Free', label: 'No app needed', color: 'gradient-text' },
                ].map((stat, i) => (
                  <div key={i} className="glass rounded-2xl p-6 text-center">
                    <div className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</div>
                    <p className="text-white/40 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section ref={arrivalsRef as React.RefObject<HTMLElement>} className="reveal py-20 bg-white" aria-label="New arrivals">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6366F1] mb-3">Just In</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] font-display">New Arrivals</h2>
            </div>
            <Link to="/products" className="flex items-center gap-1.5 text-[#0F172A] font-semibold text-sm hover:text-[#6366F1] transition-colors btn-press">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef as React.RefObject<HTMLElement>} className="reveal py-20 bg-[#F8FAFC]" aria-label="Our services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6366F1] mb-3">Why DocLens</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] font-display">Built for Confidence</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-[#0F172A] rounded-2xl p-8 text-white hover:scale-[1.02] transition-transform cursor-pointer">
              <Sparkles className="text-[#FBBF24] mb-5" size={36} />
              <h3 className="text-xl font-bold mb-3 font-display">Home Try-On</h3>
              <p className="text-white/50 mb-5 leading-relaxed">Select up to 5 frames and try them at home. Free shipping both ways.</p>
              <Link to="/products" className="text-[#6366F1] font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm">
                Try Now <ArrowRight size={14} />
              </Link>
            </div>
            <div className="group bg-[#6366F1] rounded-2xl p-8 text-white hover:scale-[1.02] transition-transform cursor-pointer">
              <Eye className="text-white/80 mb-5" size={36} />
              <h3 className="text-xl font-bold mb-3 font-display">Free Eye Checkup</h3>
              <p className="text-white/60 mb-5 leading-relaxed">Visit any DocLens store for a complimentary eye test by certified optometrists.</p>
              <Link to="/contact" className="text-white font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm">
                Book Now <ArrowRight size={14} />
              </Link>
            </div>
            <div className="group bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer">
              <ShieldCheck className="text-[#10B981] mb-5" size={36} />
              <h3 className="text-xl font-bold text-[#0F172A] mb-3 font-display">Frame Protection</h3>
              <p className="text-[#475569] mb-5 leading-relaxed">Extended warranty with scratch replacement and free adjustments for life.</p>
              <Link to="/about" className="text-[#6366F1] font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm">
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <VirtualTryOn isOpen={isTryOnOpen} onClose={() => setIsTryOnOpen(false)} />
    </div>
  );
};

export default Home;
