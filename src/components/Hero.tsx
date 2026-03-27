import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Truck, Shield, RotateCcw } from 'lucide-react';

const slides = [
  {
    title: "See the World in Style",
    subtitle: "Premium eyewear at unbeatable prices",
    cta: "Shop Eyeglasses",
    ctaLink: "/products?category=eyeglasses",
    bgGradient: "from-[#000042] via-[#000066] to-[#000042]",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800",
    badge: "🎉 Up to 50% OFF on Selected Frames"
  },
  {
    title: "Summer Sunglasses",
    subtitle: "Protect your eyes with polarized lenses",
    cta: "Explore Sunglasses",
    ctaLink: "/products?category=sunglasses",
    bgGradient: "from-amber-600 via-orange-600 to-red-600",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    badge: "☀️ New Summer Collection Arrived!"
  },
  {
    title: "Protect Your Eyes",
    subtitle: "Blue light blocking glasses for digital life",
    cta: "Shop Computer Glasses",
    ctaLink: "/products?category=computer-glasses",
    bgGradient: "from-[#000042] via-blue-900 to-[#000042]",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800",
    badge: "💻 Anti Blue Light Technology"
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const slide = slides[current];

  return (
    <section>
      {/* Carousel */}
      <div className={`relative bg-gradient-to-r ${slide.bgGradient} min-h-[420px] md:min-h-[500px] flex items-center overflow-hidden transition-all duration-700`}>
        {/* Background Image */}
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full">
          <img src={slide.image} alt="" className="w-full h-full object-cover opacity-20 md:opacity-30 carousel-slide" key={current} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#000042] via-[#000042]/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white carousel-slide" key={`text-${current}`}>
            <span className="inline-block bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-5 border border-white/20">
              {slide.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={slide.ctaLink}
                className="inline-flex items-center gap-2 bg-[#00BAC6] text-white px-8 py-4 rounded-full font-bold hover:bg-[#00a8b3] transition-all shadow-lg shadow-[#00BAC6]/30 hover:shadow-xl hover:shadow-[#00BAC6]/40">
                {slide.cta}
              </Link>
              <Link to="/products"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#000042] transition-all">
                View All
              </Link>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prev} className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all">
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === current ? 'bg-[#00BAC6] w-8' : 'bg-white/40 hover:bg-white/60'}`} />
          ))}
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white shadow-sm py-5 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-[#000042]/5 p-3 rounded-xl">
                <Truck className="text-[#000042]" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-[#000042]">Free Delivery</h3>
                <p className="text-sm text-gray-500">On orders above ৳3000</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-[#00BAC6]/10 p-3 rounded-xl">
                <Shield className="text-[#00BAC6]" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-[#000042]">1 Year Warranty</h3>
                <p className="text-sm text-gray-500">On all frames</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-[#000042]/5 p-3 rounded-xl">
                <RotateCcw className="text-[#000042]" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-[#000042]">14 Day Returns</h3>
                <p className="text-sm text-gray-500">Easy return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
