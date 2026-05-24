import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react';

const slides = [
  {
    title: "See the World\nin Style",
    subtitle: "Premium eyewear crafted for the modern you",
    cta: "Shop Eyeglasses",
    ctaLink: "/products?category=eyeglasses",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800",
    badge: "Up to 50% OFF on Selected Frames"
  },
  {
    title: "Summer\nSunglasses",
    subtitle: "Polarized lenses for ultimate protection",
    cta: "Explore Sunglasses",
    ctaLink: "/products?category=sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    badge: "New Summer Collection"
  },
  {
    title: "Protect\nYour Eyes",
    subtitle: "Blue light blocking for the digital age",
    cta: "Shop Computer Glasses",
    ctaLink: "/products?category=computer-glasses",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800",
    badge: "Anti Blue Light Technology"
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
      setAnimKey(prev => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx: number) => { setCurrent(idx); setAnimKey(prev => prev + 1); };
  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const slide = slides[current];

  return (
    <section aria-label="Featured promotions">
      <div className="relative bg-[#0F172A] min-h-[480px] md:min-h-[560px] flex items-center overflow-hidden">
        {/* Background images */}
        {slides.map((s, idx) => (
          <div key={idx} className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{ opacity: idx === current ? 1 : 0 }}>
            <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-30" loading={idx === 0 ? 'eager' : 'lazy'} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-[#0F172A]/40" />
          </div>
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white" key={animKey} aria-live="polite">
            <span className="hero-text-reveal inline-block bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6 text-white/80">
              {slide.badge}
            </span>
            <h1 className="hero-text-reveal-delay-1 text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-6 leading-[1.05] tracking-tight whitespace-pre-line">
              {slide.title}
            </h1>
            <p className="hero-text-reveal-delay-2 text-lg text-white/50 mb-8 max-w-lg">
              {slide.subtitle}
            </p>
            <div className="hero-text-reveal-delay-3 flex flex-wrap gap-3">
              <Link to={slide.ctaLink}
                className="btn-press inline-flex items-center gap-2 bg-[#6366F1] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#4F46E5] transition-all">
                {slide.cta}
              </Link>
              <Link to="/products"
                className="btn-press inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-[#0F172A] transition-all">
                View All
              </Link>
            </div>
          </div>
        </div>

        <button onClick={prev} className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all border border-white/10" aria-label="Previous slide">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all border border-white/10" aria-label="Next slide">
          <ChevronRight size={20} />
        </button>

        <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => goTo(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${idx === current ? 'bg-[#6366F1] w-8' : 'bg-white/20 hover:bg-white/40 w-2'}`}
              aria-label={`Go to slide ${idx + 1}`} />
          ))}
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white border-b border-[#E2E8F0] py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Truck size={22} />, title: 'Free Delivery', sub: 'On orders above ৳3000' },
              { icon: <Shield size={22} />, title: '1 Year Warranty', sub: 'On all frames' },
              { icon: <RotateCcw size={22} />, title: '14 Day Returns', sub: 'Easy return policy' },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-center gap-3">
                <div className="text-[#0F172A]">{f.icon}</div>
                <div>
                  <h3 className="font-semibold text-[#0F172A] text-sm">{f.title}</h3>
                  <p className="text-xs text-[#94A3B8]">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
