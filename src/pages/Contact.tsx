import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-20 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#6366F1]/8 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">Contact Us</h1>
          <p className="text-white/50 text-lg">We'd love to hear from you. Reach out anytime!</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: <MapPin className="text-[#6366F1]" size={22} />, title: 'Visit Us', lines: ['123 Gulshan Avenue', 'Dhaka 1212, Bangladesh'] },
              { icon: <Phone className="text-[#6366F1]" size={22} />, title: 'Call Us', lines: ['+880 1234-567890', '+880 9876-543210'] },
              { icon: <Mail className="text-[#6366F1]" size={22} />, title: 'Email Us', lines: ['info@doclensbd.com', 'support@doclensbd.com'] },
              { icon: <Clock className="text-[#F59E0B]" size={22} />, title: 'Working Hours', lines: ['Sat-Thu: 10AM - 9PM', 'Friday: 3PM - 9PM'] },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-card p-5 flex items-start gap-4 border border-[#E2E8F0] hover:shadow-md transition-shadow">
                <div className="bg-[#F1F5F9] p-3 rounded-xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-[#0F172A] text-sm font-display">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-[#475569] text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-8 border border-[#E2E8F0]">
              <h2 className="text-2xl font-display font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                <MessageSquare className="text-[#6366F1]" size={24} /> Send us a Message
              </h2>
              {sent && (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-6 font-medium flex items-center gap-2 border border-emerald-200">
                  <CheckCircle size={18} /> Message sent successfully! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Full Name</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40 focus:bg-white transition-all text-sm" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40 focus:bg-white transition-all text-sm" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Phone</label>
                    <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40 focus:bg-white transition-all text-sm" placeholder="+880 XXXX-XXXXXX" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Subject</label>
                    <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40 focus:bg-white transition-all text-sm">
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="prescription">Prescription Help</option>
                      <option value="return">Returns & Exchange</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full bg-[#F1F5F9] border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/40 focus:bg-white transition-all text-sm resize-none" placeholder="How can we help you?" />
                </div>
                <button type="submit" className="w-full bg-[#0F172A] text-white py-4 rounded-xl font-bold hover:bg-[#1E293B] transition-all flex items-center justify-center gap-2 text-sm btn-press">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-10 bg-white rounded-2xl shadow-card overflow-hidden border border-[#E2E8F0]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.4543!2d90.4152!3d23.7934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40c603%3A0xec01cd75f33139f5!2sGulshan%201!5e0!3m2!1sen!2sbd!4v1"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="DocLensBD Location"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
