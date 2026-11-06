import React, { useState, useEffect } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Crown, ShoppingBag, Menu, X, Phone, CalendarCheck, Utensils, FileText } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  onOpenBookingDetails: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenBooking,
  onOpenBookingDetails,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Rooms & Suites', href: '#rooms' },
    { label: 'Restaurant', href: '#dining' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050b08]/95 backdrop-blur-md border-b border-[#D4AF37]/25 shadow-2xl shadow-black/80 py-3.5'
          : 'bg-gradient-to-b from-[#050b08]/90 via-[#050b08]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 group text-left whitespace-nowrap shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6D1C] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 border border-[#FDE68A]/40 group-hover:scale-105 transition-transform duration-300">
              <Crown className="w-5 h-5 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-luxury text-base sm:text-lg font-bold tracking-wider text-white group-hover:text-[#FDE68A] transition-colors leading-tight">
                GREAT TREASURE
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                Hotel & Suites
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#C5D1C9] hover:text-[#FDE68A] transition-colors duration-200 tracking-wide hover:underline hover:underline-offset-8 hover:decoration-[#D4AF37] whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Cart Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="View shopping cart"
              className="relative p-2.5 rounded-full bg-[#0E2419] border border-[#D4AF37]/30 text-[#FDE68A] hover:bg-[#163626] hover:border-[#D4AF37] transition-all duration-200 shadow-md flex items-center justify-center cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-black text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#050b08] shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Booking Details Check Button */}
            <button
              onClick={onOpenBookingDetails}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0E2419] border border-[#D4AF37]/40 text-[#FDE68A] hover:bg-[#163626] hover:border-[#D4AF37] font-medium text-xs tracking-wide transition-all cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Booking Details</span>
            </button>

            {/* Book Now Primary Button */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black font-semibold text-xs sm:text-sm tracking-wide hover:brightness-110 shadow-lg shadow-[#D4AF37]/25 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book a Room</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#0E2419] border border-[#D4AF37]/30 text-[#E8ECE9] hover:text-[#D4AF37] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#07130D] border-b border-[#D4AF37]/30 px-6 py-6 space-y-4 shadow-2xl transition-all">
          <div className="flex flex-col space-y-3 pb-4 border-b border-[#1c3d2c]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-[#E8ECE9] hover:text-[#D4AF37] py-2 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#D4AF37] text-sm">→</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C59B27] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <CalendarCheck className="w-4 h-4" />
              Book a Room
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBookingDetails();
              }}
              className="w-full py-2.5 rounded-lg bg-[#0E2419] border border-[#D4AF37]/50 text-[#FDE68A] font-semibold text-sm flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              Check Booking Details
            </button>
            <a
              href="#dining"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-[#0E2419] border border-[#D4AF37]/40 text-[#FDE68A] font-medium text-sm flex items-center justify-center gap-2 text-center"
            >
              <Utensils className="w-4 h-4" />
              Order Food Menu
            </a>
            <a
              href={`https://wa.me/${HOTEL_INFO.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-lg bg-[#143B27] text-[#A7F3D0] text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp Help: {HOTEL_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
