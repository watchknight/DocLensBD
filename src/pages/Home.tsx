import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Sparkles, ArrowRight, Star, ShieldCheck, Quote, RectangleHorizontal, Circle, Diamond, Hexagon, Pentagon, Square, Octagon, Triangle } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import VirtualTryOn from '../components/VirtualTryOn';
import { products } from '../data/products';

// Scroll reveal hook
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const frameShapeIcons: Record<string, React.ReactNode> = {
  rectangle: <RectangleHorizontal size={32} />,
  round: <Circle size={32} />,
  aviator: <Diamond size={32} />,
  'cat-eye': <Pentagon size={32} />,
  square: <Square size={32} />,
  wayfarer: <Hexagon size={32} />,
  oval: <Octagon size={32} />,
  geometric: <Triangle size={32} />,
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

const testimonials = [
  {
    name: 'Riya A.',
    text: 'Amazing quality frames at such great prices! The virtual try-on feature helped me pick the perfect pair without leaving home.',
    rating: 5,
    location: 'Dhaka',
  },
  {
    name: 'Tanvir H.',
    text: 'Ordered computer glasses and they arrived within 3 days. The blue light blocking really makes a difference for my eyes.',
    rating: 5,
    location: 'Chittagong',
  },
  {
    name: 'Fatima K.',
    text: 'Best eyewear store in Bangladesh! The customer service team helped me choose lenses for my prescription. Highly recommend.',
    rating: 5,
    location: 'Sylhet',
  },
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
  const testimonialsRef = useReveal();

  return (
    <div>
      <Hero />

      {/* Shop by Frame Shape */}
      <section ref={shapesRef as React.RefObject<HTMLElement>} className="reveal py-20 bg-white" aria-label="Shop by frame shape">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A3E] font-display">Shop by Frame Shape</h2>
            <p className="text-[#5A5E7A] mt-3 text-lg">Find the perfect frame that suits your face</p>
          </div>
          <div className="shape-scroll flex gap-6 overflow-x-auto pb-4 justify-center flex-wrap">
            {frameShapesList.map((shape) => (
              <Link key={shape.id} to={`/products?frameShape=${shape.id}`}
                className="flex flex-col items-center gap-3 min-w-[100px] group">
                <div className="w-24 h-24 rounded-2xl bg-surface-elevated shadow-card flex items-center justify-center text-[#0A0A3E] group-hover:shadow-card-hover group-hover:scale-110 group-hover:bg-[#0A0A3E] group-hover:text-white transition-all duration-300 border border-[#E8EAF2]">
                  {frameShapeIcons[shape.id]}
                </div>
                <span className="text-sm font-medium text-[#0A0A3E] group-hover:text-[#00C9D6] transition-colors">{shape.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section ref={bestsellersRef as React.RefObject<HTMLElement>} className="reveal py-20 bg-[#FAFBFD]" aria-label="Bestselling products">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A3E] font-display">Bestsellers</h2>
              <p className="text-[#5A5E7A] mt-2">Our most loved frames</p>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-[#00C9D6] font-semibold hover:gap-2 transition-all btn-press">
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
      <section ref={tryOnRef as React.RefObject<HTMLElement>} className="reveal py-20 bg-gradient-to-br from-[#0A0A3E] via-[#12124F] to-[#1A1A5E] relative overflow-hidden" aria-label="Virtual try-on feature">
        {/* Decorative orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#00C9D6]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#D4A855]/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-[#00C9D6]/20 p-3 rounded-xl">
                  <Eye className="text-[#00C9D6]" size={32} />
                </div>
                <span className="badge-new text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">AI Virtual Try-On</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-5 leading-tight">Try Before<br/>You Buy!</h2>
              <p className="text-white/60 text-lg mb-8 max-w-md">
                Use your camera to see how frames look on your face. Our AI face-tracking technology gives you a realistic preview from the comfort of your home.
              </p>
              <button onClick={() => setIsTryOnOpen(true)} className="btn-press inline-flex items-center gap-2 bg-[#00C9D6] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#00B3BF] transition-all shadow-lg shadow-[#00C9D6]/30">
                <Eye size={20} /> Try On Now
              </button>
            </div>
            <div className="flex-1 relative">
              <div className="glass rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-2xl p-6 text-center">
                    <div className="text-3xl font-display font-bold text-[#00C9D6]">100+</div>
                    <p className="text-white/50 text-sm mt-1">Frames to try</p>
                  </div>
                  <div className="glass rounded-2xl p-6 text-center">
                    <div className="text-3xl font-display font-bold text-white">Real-Time</div>
                    <p className="text-white/50 text-sm mt-1">AI Tracking</p>
                  </div>
                  <div className="glass rounded-2xl p-6 text-center">
                    <div className="text-3xl font-display font-bold text-white">360°</div>
                    <p className="text-white/50 text-sm mt-1">View angle</p>
                  </div>
                  <div className="glass rounded-2xl p-6 text-center">
                    <div className="text-3xl font-display font-bold gradient-text">Free</div>
                    <p className="text-white/50 text-sm mt-1">No app needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section ref={arrivalsRef as React.RefObject<HTMLElement>} className="reveal py-20 bg-white" aria-label="New arrivals">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A3E] font-display">New Arrivals</h2>
              <p className="text-[#5A5E7A] mt-2">Fresh styles just dropped</p>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-[#00C9D6] font-semibold hover:gap-2 transition-all btn-press">
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
      <section ref={servicesRef as React.RefObject<HTMLElement>} className="reveal py-20 bg-[#FAFBFD]" aria-label="Our services">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A3E] text-center mb-12 font-display">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-gradient-to-br from-[#0A0A3E] to-[#1A1A5E] rounded-2xl p-8 text-white hover:scale-[1.02] transition-transform cursor-pointer">
              <Sparkles className="text-[#D4A855] mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2 font-display">Home Try-On</h3>
              <p className="text-white/60 mb-4">Select up to 5 frames and try them at home for free. No obligation to buy.</p>
              <Link to="/products" className="text-[#00C9D6] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Try Now <ArrowRight size={16} />
              </Link>
            </div>
            <div className="group bg-gradient-to-br from-[#00C9D6] to-[#008a93] rounded-2xl p-8 text-white hover:scale-[1.02] transition-transform cursor-pointer">
              <Eye className="text-white mb-4" size={40} />
              <h3 className="text-xl font-bold mb-2 font-display">Free Eye Checkup</h3>
              <p className="text-white/70 mb-4">Visit any DocLens store for a complimentary eye checkup by certified optometrists.</p>
              <Link to="/contact" className="text-white font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Book Now <ArrowRight size={16} />
              </Link>
            </div>
            <div className="group bg-white border-2 border-[#E8EAF2] rounded-2xl p-8 hover:scale-[1.02] hover:shadow-lg transition-all cursor-pointer">
              <ShieldCheck className="text-[#D4A855] mb-4" size={40} />
              <h3 className="text-xl font-bold text-[#0A0A3E] mb-2 font-display">Frame Protection</h3>
              <p className="text-[#5A5E7A] mb-4">Extended warranty coverage with scratch replacement and free adjustments.</p>
              <Link to="/about" className="text-[#00C9D6] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — replaced fake "Trust Brands" */}
      <section ref={testimonialsRef as React.RefObject<HTMLElement>} className="reveal py-20 bg-white" aria-label="Customer testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A3E] font-display">What Our Customers Say</h2>
            <p className="text-[#5A5E7A] mt-3">Trusted by thousands across Bangladesh</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#FAFBFD] rounded-2xl p-8 border border-[#E8EAF2] hover:shadow-lg transition-shadow relative">
                <Quote size={32} className="text-[#00C9D6]/20 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={16} className={s <= t.rating ? 'text-[#D4A855]' : 'text-gray-300'} fill={s <= t.rating ? '#D4A855' : 'none'} />
                  ))}
                </div>
                <p className="text-[#5A5E7A] mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00C9D6] to-[#0A0A3E] flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A0A3E] text-sm">{t.name}</p>
                    <p className="text-xs text-[#9CA0B8]">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} className="text-[#D4A855]" fill="#D4A855" />)}
              </div>
              <span className="font-bold text-[#0A0A3E] text-lg">4.8/5</span>
              <span className="text-[#9CA0B8] text-sm">(10K+ Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      <VirtualTryOn isOpen={isTryOnOpen} onClose={() => setIsTryOnOpen(false)} />
    </div>
  );
};

export default Home;
