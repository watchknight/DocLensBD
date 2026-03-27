import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Users, Award, Globe, Heart, Star, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#000042] to-[#000066] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About DocLensBD</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">Bangladesh's most trusted online destination for premium eyewear. We believe everyone deserves to see clearly and look great doing it.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Users className="text-[#00BAC6]" size={36} />, num: '50K+', label: 'Happy Customers' },
              { icon: <Eye className="text-[#00BAC6]" size={36} />, num: '200+', label: 'Frame Styles' },
              { icon: <Globe className="text-[#00BAC6]" size={36} />, num: '64', label: 'Districts Served' },
              { icon: <Award className="text-[#00BAC6]" size={36} />, num: '5 yrs', label: 'In Business' },
            ].map((s, i) => (
              <div key={i} className="text-center bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-3">{s.icon}</div>
                <p className="text-3xl font-bold text-[#000042]">{s.num}</p>
                <p className="text-gray-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#000042] mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 2019, DocLensBD started with a simple mission: to provide high-quality, stylish eyewear at affordable prices to people across Bangladesh. We noticed that buying glasses was often an expensive and inconvenient experience, so we set out to change that.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Today, we serve customers in all 64 districts of Bangladesh, offering over 200 frame styles, free eye checkups, and a seamless online shopping experience. Our state-of-the-art lens lab ensures every pair is crafted to perfection.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We're proud to have helped over 50,000 people see the world more clearly — and we're just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#000042] text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Heart className="text-red-400" size={32} />, title: 'Customer First', desc: 'Every decision we make starts with our customers. Your satisfaction is our priority.' },
              { icon: <Star className="text-amber-400" size={32} />, title: 'Quality Matters', desc: 'We source premium materials and use advanced manufacturing to deliver lasting eyewear.' },
              { icon: <Eye className="text-[#00BAC6]" size={32} />, title: 'Vision for All', desc: 'We believe quality eye care should be accessible and affordable for everyone in Bangladesh.' },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-[#000042] mb-2">{v.title}</h3>
                <p className="text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-gradient-to-r from-[#00BAC6] to-[#008a93]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Pair?</h2>
          <p className="text-white/80 mb-8">Explore our collection and experience the DocLensBD difference.</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-white text-[#000042] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all">
            Shop Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
