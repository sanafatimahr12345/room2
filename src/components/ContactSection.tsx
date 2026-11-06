import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Room Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: 'Room Inquiry',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
          Reach Our Concierge
        </span>
        <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
          Contact Us
        </h2>
        <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-3 mb-4" />
        <p className="text-[#C1CEC7] text-sm sm:text-base leading-relaxed">
          Have inquiries regarding hotel accommodations, corporate bookings, event catering,
          or special requests? We are here 24/7 to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information & WhatsApp Card */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/30 space-y-6">
          <h3 className="font-luxury text-2xl font-bold text-white">
            Get in Touch
          </h3>
          <p className="text-sm text-[#AAB8B0] leading-relaxed">
            Our concierge desk is staffed around the clock to cater to your every request with prestige and promptness.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4 text-sm text-[#D1DDD5]">
              <div className="w-10 h-10 rounded-xl bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <strong className="block text-white font-medium">Hotel Address</strong>
                <span>{HOTEL_INFO.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-4 text-sm text-[#D1DDD5]">
              <div className="w-10 h-10 rounded-xl bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <strong className="block text-white font-medium">Phone Enquiries</strong>
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-[#D4AF37] transition-colors">
                  {HOTEL_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 text-sm text-[#D1DDD5]">
              <div className="w-10 h-10 rounded-xl bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <strong className="block text-white font-medium">Email Reservations</strong>
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-[#D4AF37] transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 text-sm text-[#D1DDD5]">
              <div className="w-10 h-10 rounded-xl bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <strong className="block text-white font-medium">Operating Hours</strong>
                <span>{HOTEL_INFO.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Action Box */}
          <div className="pt-4 border-t border-[#183928]">
            <a
              href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Hello Great Treasure Hotel Concierge, I would like to make an inquiry.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-black font-bold text-sm tracking-wide hover:brightness-105 flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/20"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp Directly</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/30">
          <h3 className="font-luxury text-2xl font-bold text-white mb-2">
            Send Us a Message
          </h3>
          <p className="text-sm text-[#AAB8B0] mb-6">
            Fill out the form below and our guest relations team will respond within 15 minutes.
          </p>

          {isSubmitted ? (
            <div className="py-12 px-6 rounded-xl bg-[#0A2619] border border-emerald-500/50 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="font-luxury text-xl font-bold text-white">
                Message Sent Successfully!
              </h4>
              <p className="text-sm text-[#C1CEC7] max-w-md mx-auto">
                Thank you for contacting Great Treasure Global Hotel & Suites. Our reservation manager will contact you promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Adebayo"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07160F] border border-[#1e4632] text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0803 123 4567"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07160F] border border-[#1e4632] text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. adebayo@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07160F] border border-[#1e4632] text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Subject / Department
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07160F] border border-[#1e4632] text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <option value="Room Inquiry">Room & Suite Reservation</option>
                    <option value="Restaurant / Food Order">Restaurant & Catering Order</option>
                    <option value="Grand Event Hall">Event Hall Booking</option>
                    <option value="VIP Concierge">VIP Airport Pickup & Concierge</option>
                    <option value="General">General Inquiries</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your reservation dates, guest count, or meal preferences..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#07160F] border border-[#1e4632] text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#D4AF37]/25 hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
