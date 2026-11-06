import React, { useState } from 'react';
import { Calendar, Users, BedDouble, Search, Sparkles, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { SearchFilter } from '../types';

interface HeroProps {
  onSearch: (filter: SearchFilter) => void;
  onBookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onBookClick }) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(today);
  const [checkOut, setCheckOut] = useState<string>(tomorrow);
  const [guests, setGuests] = useState<number>(2);
  const [roomType, setRoomType] = useState<string>('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      checkIn,
      checkOut,
      guests,
      roomType,
    });
    const roomsSection = document.getElementById('rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Hero Image with Measured Luxury Dark & Emerald Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="Luxury hotel bedroom suite at Great Treasure Global Hotel"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-fade-in"
        />
        {/* Deep dark green and obsidian overlay scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b08] via-[#050b08]/80 to-[#050b08]/50" />
        <div className="absolute inset-0 bg-[#071910]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center my-auto pt-8 sm:pt-12">
        {/* Luxury Tagline / Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0E291C]/80 border border-[#D4AF37]/40 backdrop-blur-md mb-6 shadow-lg shadow-[#0E291C]/50">
          <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#FDE68A] uppercase">
            5-Star Hospitality & Fine Cuisine
          </span>
        </div>

        {/* Welcome Headline */}
        <h1 className="font-luxury text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wide leading-tight sm:leading-tight mb-5 drop-shadow-md text-balance">
          Welcome to <br />
          <span className="gold-text-gradient drop-shadow-lg">
            GREAT TREASURE GLOBAL HOTEL & SUITES
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl text-[#D1DDD5] font-light max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow">
          Luxury, Comfort & Great Taste – All in One Place.
        </p>

        {/* Two Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-[#D4AF37]/30 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book a Room</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#dining"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#0E2419]/90 border border-[#D4AF37]/50 text-[#FDE68A] font-semibold text-sm sm:text-base tracking-wide hover:bg-[#163827] hover:border-[#FDE68A] transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer shadow-lg"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
            <span>Order Food</span>
          </a>
        </div>
      </div>

      {/* Stylish Hotel Booking Search Bar */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="glass-card rounded-2xl p-4 sm:p-6 shadow-2xl border border-[#D4AF37]/30">
          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
          >
            {/* Check-in Date */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Check-in Date</span>
              </label>
              <input
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#07150E] border border-[#1e4632] text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                required
              />
            </div>

            {/* Check-out Date */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Check-out Date</span>
              </label>
              <input
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#07150E] border border-[#1e4632] text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                required
              />
            </div>

            {/* Guests Count */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Guests</span>
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#07150E] border border-[#1e4632] text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
              >
                <option value={1} className="bg-[#07150E]">1 Guest</option>
                <option value={2} className="bg-[#07150E]">2 Guests</option>
                <option value={3} className="bg-[#07150E]">3 Guests</option>
                <option value={4} className="bg-[#07150E]">4+ Guests (Suite)</option>
              </select>
            </div>

            {/* Room Type */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5" />
                <span>Room Type</span>
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#07150E] border border-[#1e4632] text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer"
              >
                <option value="all" className="bg-[#07150E]">All Rooms & Suites</option>
                <option value="standard-room" className="bg-[#07150E]">Standard Room (₦25,000)</option>
                <option value="deluxe-room" className="bg-[#07150E]">Deluxe Room (₦35,000)</option>
                <option value="executive-suite" className="bg-[#07150E]">Executive Suite (₦55,000)</option>
                <option value="presidential-suite" className="bg-[#07150E]">Presidential Suite (₦85,000)</option>
              </select>
            </div>

            {/* Check Availability CTA */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black font-bold text-sm tracking-wide hover:brightness-110 shadow-lg shadow-[#D4AF37]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Check Availability</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
