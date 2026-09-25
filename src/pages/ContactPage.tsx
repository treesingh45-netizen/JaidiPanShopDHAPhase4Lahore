import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Send,
  CheckCircle2,
  Clock,
  Compass,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16 pt-4 sm:pt-6">
      {/* 1. CONTACT HERO */}
      <section className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 border border-neutral-200 text-center max-w-4xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
          Customer Support & Inquiries
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight">
          GET IN TOUCH
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 max-w-md mx-auto leading-relaxed">
          Visit Jaidi, call us, or connect with us online. We are always ready to serve you.
        </p>
      </section>

      {/* 2. CONTACT CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Address Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D90000] flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-base">Store Address</h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              DHA Phase 4, Sector CCA, DHA Phase 4, Lahore, Pakistan
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=DHA+Phase+4+Sector+CCA+Lahore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#D90000] hover:underline flex items-center gap-1 pt-1"
          >
            <span>View on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Phone / WhatsApp Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D90000] flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-base">Phone & WhatsApp</h3>
            <p className="text-xs text-neutral-600 mt-1">
              Direct hotline for inquiries & bulk catering orders.
            </p>
          </div>
          <div className="space-y-1 pt-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 font-medium">Call:</span>
              <a href="tel:03014002475" className="font-bold text-neutral-900 hover:text-[#D90000]">
                0301 4002475
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 font-medium">WhatsApp:</span>
              <a
                href="https://wa.me/923014002475"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#25D366] hover:underline"
              >
                +92 301 4002475
              </a>
            </div>
          </div>
        </div>

        {/* Email & Social Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D90000] flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-base">Email & Social</h3>
            <p className="text-xs text-neutral-600 mt-1">
              Official communication and customer feedback.
            </p>
          </div>
          <div className="space-y-1.5 pt-1 text-xs">
            <div>
              <a
                href="mailto:info@jaidipanshop.pk"
                className="font-bold text-neutral-800 hover:text-[#D90000]"
              >
                info@jaidipanshop.pk
              </a>
            </div>
            <div className="flex items-center gap-3 pt-1 text-neutral-600">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D90000] font-semibold flex items-center gap-1"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>·</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D90000] font-semibold flex items-center gap-1"
              >
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE MAP & LOCATION */}
      <section className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
              Find Us In Person
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-neutral-900">
              Jaidi Pan Shop — DHA Phase 4, Sector CCA
            </h3>
            <p className="text-xs text-neutral-600 mt-1">
              Open 7 days a week · Dine-In, Takeaway & Fast WhatsApp Delivery
            </p>
          </div>

          <a
            href="https://www.google.com/maps/place/Jaidi+Pan+Shop/@31.4822212,74.3965288,17z/data=!3m1!4b1!4m6!3m5!1s0x391905fd0e9e1087:0x4b054f062cd24b52!8m2!3d31.4822212!4d74.3965288!16s%2Fg%2F1tf1944p"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#D90000] hover:bg-[#A80000] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0 cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <Compass className="w-4 h-4" />
            <span>Get Directions</span>
          </a>
        </div>

        {/* Real Interactive Google Maps Embed with Pin & Info Overlay */}
        <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-neutral-100 overflow-hidden">
          <iframe
            title="Jaidi Pan Shop DHA Phase 4 Lahore Location Map"
            src="https://maps.google.com/maps?q=31.4822212,74.3965288+(Jaidi+Pan+Shop)&t=&z=17&ie=UTF8&iwloc=B&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Floating Location Quick Info Card */}
          <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-neutral-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D90000] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs text-neutral-900 block font-display">
                JAIDI PAN SHOP
              </span>
              <span className="text-[11px] text-neutral-600 font-medium">
                DHA Phase 4, Sector CCA, Lahore
              </span>
            </div>
            <a
              href="https://www.google.com/maps/place/Jaidi+Pan+Shop/@31.4822212,74.3965288,17z/data=!3m1!4b1!4m6!3m5!1s0x391905fd0e9e1087:0x4b054f062cd24b52!8m2!3d31.4822212!4d74.3965288!16s%2Fg%2F1tf1944p"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-[#D90000] hover:text-[#A80000] text-xs font-semibold underline underline-offset-2 flex items-center gap-1"
            >
              <span>View Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="absolute bottom-3 right-3 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] text-neutral-600 font-mono shadow-xs border border-neutral-200">
            31.4822° N, 74.3965° E
          </div>
        </div>
      </section>

      {/* 4. CONTACT FORM (Not an ordering form) */}
      <section className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 max-w-2xl mx-auto shadow-xs">
        <div className="text-center space-y-1 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D90000]">
            Send a Note
          </span>
          <h3 className="text-2xl font-display font-bold text-neutral-900">
            Customer Feedback & Inquiries
          </h3>
          <p className="text-xs text-neutral-500">
            Have questions about catering, events, or feedback? Drop us a message.
          </p>
        </div>

        {formSubmitted && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Thank you for your message! Our team will respond shortly.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Muhammad Tariq"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                placeholder="0301 4002475"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Your Message
            </label>
            <textarea
              required
              rows={4}
              placeholder="How can we assist you?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-[#F7F7F7] border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:bg-white focus:outline-none focus:border-[#D90000]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D90000] hover:bg-[#A80000] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </div>
  );
};
