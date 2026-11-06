import React from 'react';
import { Crown, CalendarCheck, UtensilsCrossed, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface FooterProps {
  onBookClick: () => void;
  onOrderClick: () => void;
  onOpenBookingDetails?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onBookClick,
  onOrderClick,
  onOpenBookingDetails,
}) => {
  return (
    <footer className="bg-[#030705] border-t border-[#D4AF37]/25 text-[#BAC7BF] pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Golden Line / Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Promotional Call-to-Action Banner */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/35 mb-16 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Logo Mark */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D1C] flex items-center justify-center mx-auto mb-5 shadow-xl shadow-[#D4AF37]/20 border border-[#FDE68A]/40">
              <Crown className="w-7 h-7 text-black" />
            </div>

            <h2 className="font-luxury text-2xl sm:text-4xl font-bold text-white tracking-wide mb-3">
              Book Your Stay or Order Now
            </h2>

            <p className="text-sm sm:text-base text-[#C7D5CD] mb-8 leading-relaxed">
              Experience world-class luxury, peaceful relaxation, and unforgettable gourmet dining at
              Great Treasure Global Hotel & Suites. Your royal escape awaits.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#D4AF37]/25 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book a Room</span>
              </button>

              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0E2419] border border-[#D4AF37]/50 text-[#FDE68A] hover:bg-[#153625] font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
                <span>Order Food</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Column Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#132d20]">
          {/* Col 1: About Us */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6D1C] flex items-center justify-center">
                <Crown className="w-4 h-4 text-black" />
              </div>
              <span className="font-luxury font-bold text-base text-white">
                GREAT TREASURE
              </span>
            </div>
            <p className="text-xs text-[#9EAEA4] leading-relaxed">
              A premier 5-star haven delivering prestigious lodging, grand banquet hosting,
              and authentic African & intercontinental gastronomic delights in Lagos, Nigeria.
            </p>
            <div className="pt-2 text-xs text-[#D4AF37]">
              <span>Motto: "Luxury, Comfort & Great Taste"</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-luxury text-base font-bold text-white tracking-wide border-b border-[#D4AF37]/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#BAC7BF]">
              <li>
                <a href="#rooms" className="hover:text-[#FDE68A] transition-colors flex items-center justify-between">
                  <span>Rooms & Suites</span>
                  <span className="text-[#D4AF37]">₦25,000+</span>
                </a>
              </li>
              <li>
                <a href="#dining" className="hover:text-[#FDE68A] transition-colors flex items-center justify-between">
                  <span>Restaurant & Lounge Menu</span>
                  <span className="text-[#D4AF37]">₦1,000+</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBookingDetails}
                  className="text-left text-[#FDE68A] hover:underline flex items-center justify-between w-full cursor-pointer"
                >
                  <span>Check Booking Details</span>
                  <span className="text-[#D4AF37]">Status →</span>
                </button>
              </li>
              <li>
                <a href="#facilities" className="hover:text-[#FDE68A] transition-colors">
                  Facilities & Amenities
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-[#FDE68A] transition-colors">
                  Grand Event Hall Booking
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#FDE68A] transition-colors">
                  Why Choose Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Us */}
          <div className="space-y-4">
            <h4 className="font-luxury text-base font-bold text-white tracking-wide border-b border-[#D4AF37]/30 pb-2">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-[#9EAEA4]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Follow Us */}
          <div className="space-y-4">
            <h4 className="font-luxury text-base font-bold text-white tracking-wide border-b border-[#D4AF37]/30 pb-2">
              Follow Us
            </h4>
            <p className="text-xs text-[#9EAEA4]">
              Connect with us for seasonal promotions, banquet packages, and chef specials.
            </p>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-[#0E2419] text-[#A7F3D0] hover:bg-[#163827] transition-colors"
              >
                <span>WhatsApp Channel</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#25D366]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-[#0E2419] text-[#D1DDD5] hover:bg-[#163827] transition-colors"
              >
                <span>Instagram @greattreasurehotel</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-[#0E2419] text-[#D1DDD5] hover:bg-[#163827] transition-colors"
              >
                <span>Facebook / Great Treasure Hotel</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B8B82]">
          <p>© {new Date().getFullYear()} {HOTEL_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-[#D4AF37] transition-colors">Terms of Hospitality</a>
            <span>·</span>
            <a href="#security" className="hover:text-[#D4AF37] transition-colors">Security Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
