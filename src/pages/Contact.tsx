import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

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
      <section className="bg-gradient-to-r from-[#000042] to-[#000066] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-white/70 text-lg">We'd love to hear from you. Reach out anytime!</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: <MapPin className="text-[#00BAC6]" size={24} />, title: 'Visit Us', lines: ['123 Gulshan Avenue', 'Dhaka 1212, Bangladesh'] },
              { icon: <Phone className="text-[#00BAC6]" size={24} />, title: 'Call Us', lines: ['+880 1234-567890', '+880 9876-543210'] },
              { icon: <Mail className="text-[#00BAC6]" size={24} />, title: 'Email Us', lines: ['info@doclensbd.com', 'support@doclensbd.com'] },
              { icon: <Clock className="text-[#00BAC6]" size={24} />, title: 'Working Hours', lines: ['Sat-Thu: 10AM - 9PM', 'Friday: 3PM - 9PM'] },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4">
                <div className="bg-[#000042]/5 p-3 rounded-xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-[#000042]">{item.title}</h3>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-gray-500 text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-[#000042] mb-6 flex items-center gap-2">
                <MessageSquare className="text-[#00BAC6]" /> Send us a Message
              </h2>
              {sent && (
                <div className="bg-green-100 text-green-800 p-4 rounded-xl mb-6 font-medium">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-600 block mb-1">Full Name</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#000042]" placeholder="Your name" /></div>
                  <div><label className="text-sm font-medium text-gray-600 block mb-1">Email</label><input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#000042]" placeholder="your@email.com" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-600 block mb-1">Phone</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#000042]" placeholder="+880 XXXX-XXXXXX" /></div>
                  <div><label className="text-sm font-medium text-gray-600 block mb-1">Subject</label>
                    <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#000042]">
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Question</option>
                      <option value="prescription">Prescription Help</option>
                      <option value="return">Returns & Exchange</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div><label className="text-sm font-medium text-gray-600 block mb-1">Message</label><textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#000042]" placeholder="How can we help you?" /></div>
                <button type="submit" className="w-full bg-[#000042] text-white py-4 rounded-xl font-bold hover:bg-[#000060] transition-all flex items-center justify-center gap-2 text-lg">
                  <Send size={20} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map placeholder — embedded Google Maps */}
        <div className="mt-10 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-3 text-gray-400" />
              <p className="font-medium">123 Gulshan Avenue, Dhaka 1212</p>
              <p className="text-sm">Google Maps integration available in production</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
