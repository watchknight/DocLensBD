import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react';

const slides = [
  {
    title: "See the World in Style",
    subtitle: "Premium eyewear at unbeatable prices",
    cta: "Shop Eyeglasses",
    ctaLink: "/products?category=eyeglasses",
    bgGradient: "from-[#0A0A3E] via-[#12124F] to-[#0A0A3E]",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800",
    badge: "🎉 Up to 50% OFF on Selected Frames"
  },
  {
    title: "Summer Sunglasses",
    subtitle: "Protect your eyes with polarized lenses",
    cta: "Explore Sunglasses",
    ctaLink: "/products?category=sunglasses",
    bgGradient: "from-amber-700 via-orange-600 to-rose-600",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    badge: "☀️ New Summer Collection Arrived!"
  },
  {
    title: "Protect Your Eyes",
    subtitle: "Blue light blocking glasses for digital life",
    cta: "Shop Computer Glasses",
    ctaLink: "/products?category=computer-glasses",
    bgGradient: "from-[#0A0A3E] via-blue-900 to-[#0A0A3E]",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800",
    badge: "💻 Anti Blue Light Technology"
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

  const goTo = (idx: number) => {
    setCurrent(idx);
    setAnimKey(prev => prev + 1);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const slide = slides[current];

  return (
    <section aria-label="Featured promotions">
      {/* Carousel */}
      <div className={`relative bg-gradient-to-r ${slide.bgGradient} min-h-[460px] md:min-h-[540px] flex items-center overflow-hidden`}
           style={{ transition: 'background 1s ease' }}>
        
        {/* Background Image with crossfade */}
        {slides.map((s, idx) => (
          <div key={idx}
            className="absolute right-0 top-0 w-full md:w-2/3 h-full transition-opacity duration-1000 ease-out"
            style={{ opacity: idx === current ? 1 : 0 }}>
            <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-20 md:opacity-25" loading={idx === 0 ? 'eager' : 'lazy'} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A3E] via-[#0A0A3E]/70 to-transparent" />
          </div>
        ))}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white" key={animKey} aria-live="polite">
            <span className="hero-text-reveal inline-block glass px-5 py-2.5 rounded-full text-sm font-medium mb-6">
              {slide.badge}
            </span>
            <h1 className="hero-text-reveal-delay-1 text-4xl md:text-6xl lg:text-7xl font-display font-extrabold mb-5 leading-[1.08] tracking-tight">
              {slide.title}
            </h1>
            <p className="hero-text-reveal-delay-2 text-lg md:text-xl text-white/70 mb-8 max-w-lg">
              {slide.subtitle}
            </p>
            <div className="hero-text-reveal-delay-3 flex flex-wrap gap-4">
              <Link to={slide.ctaLink}
                className="btn-press inline-flex items-center gap-2 bg-[#00C9D6] text-white px-8 py-4 rounded-full font-bold hover:bg-[#00B3BF] transition-all shadow-lg shadow-[#00C9D6]/30 hover:shadow-xl hover:shadow-[#00C9D6]/40">
                {slide.cta}
              </Link>
              <Link to="/products"
                className="btn-press inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#0A0A3E] transition-all">
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prev} className="absolute z-20 left-4 top-1/2 -translate-y-1/2 glass hover:bg-white/20 text-white p-3 rounded-full transition-all" aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="absolute z-20 right-4 top-1/2 -translate-y-1/2 glass hover:bg-white/20 text-white p-3 rounded-full transition-all" aria-label="Next slide">
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => goTo(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 ${idx === current ? 'bg-[#00C9D6] w-10' : 'bg-white/30 hover:bg-white/50 w-2.5'}`}
              aria-label={`Go to slide ${idx + 1}`} />
          ))}
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white shadow-sm py-5 border-b border-[#E8EAF2]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-[#0A0A3E]/5 p-3 rounded-xl">
                <Truck className="text-[#0A0A3E]" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A3E]">Free Delivery</h3>
                <p className="text-sm text-[#5A5E7A]">On orders above ৳3000</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-[#00C9D6]/10 p-3 rounded-xl">
                <Shield className="text-[#00C9D6]" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A3E]">1 Year Warranty</h3>
                <p className="text-sm text-[#5A5E7A]">On all frames</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-[#0A0A3E]/5 p-3 rounded-xl">
                <RotateCcw className="text-[#0A0A3E]" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-[#0A0A3E]">14 Day Returns</h3>
                <p className="text-sm text-[#5A5E7A]">Easy return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
