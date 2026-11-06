import React from 'react';
import { Zap, Wifi, Shield, Car, Building2, CheckCircle2, Calendar } from 'lucide-react';
import { FACILITIES_DATA, HOTEL_INFO } from '../data/hotelData';

export const FacilitiesSection: React.FC = () => {
  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-emerald-400" />;
      case 'Wifi':
        return <Wifi className="w-6 h-6 text-emerald-400" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-emerald-400" />;
      case 'Car':
        return <Car className="w-6 h-6 text-emerald-400" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-emerald-400" />;
      default:
        return <Zap className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="facilities" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
          World-Class Infrastructure
        </span>
        <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
          Our Facilities
        </h2>
        <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-3 mb-4" />
        <p className="text-[#C1CEC7] text-sm sm:text-base leading-relaxed">
          Designed to guarantee total comfort, seamless connectivity, and uncompromised security
          for all our esteemed hotel guests and visitors.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {FACILITIES_DATA.slice(0, 4).map((facility) => (
          <div
            key={facility.id}
            className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 border border-[#D4AF37]/20 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#09281A] border border-emerald-500/30 flex items-center justify-center group-hover:scale-105 group-hover:border-emerald-400 transition-all duration-300">
                  {getFacilityIcon(facility.icon)}
                </div>
                <span className="text-[11px] font-semibold text-emerald-400/90 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                  {facility.badge}
                </span>
              </div>

              <h3 className="font-luxury text-xl font-bold text-white mb-2 group-hover:text-[#FDE68A] transition-colors">
                {facility.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A5B5AD] leading-relaxed">
                {facility.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#163626] flex items-center gap-2 text-xs text-[#D4AF37]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Available 24 hours daily</span>
            </div>
          </div>
        ))}

        {/* 5th Facility Spotlight: Grand Event Hall */}
        <div className="md:col-span-2 lg:col-span-2 glass-card rounded-2xl overflow-hidden border border-[#D4AF37]/35 relative flex flex-col lg:flex-row group">
          <div className="lg:w-1/2 relative h-56 lg:h-auto overflow-hidden">
            <img
              src="/images/event_hall.jpg"
              alt="Grand Event Hall at Great Treasure Hotel"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#071910] via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-[#050b08]/85 border border-[#D4AF37]/50 text-[#FDE68A] text-xs font-semibold uppercase backdrop-blur-md">
                Featured Facility
              </span>
            </div>
          </div>

          <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#09281A] border border-emerald-500/30 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-luxury text-2xl font-bold text-white">
                    Grand Event Hall
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    Conferences, Banquets & Royal Galas
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#AAB8B0] leading-relaxed mb-4">
                Our prestigious Grand Event Hall accommodates up to 500 seated guests with state-of-the-art
                sound acoustics, crystal chandeliers, executive podium, and VIP dressing suites.
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-[#D1DDD5] mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>500+ Banquet Capacity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Audio-Visual Systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Central Air Conditioning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Dedicated Catering Crew</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#173827]">
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Great Treasure Hotel, I would like to inquire about booking the Grand Event Hall for an upcoming event.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#113824] border border-[#D4AF37]/40 text-[#FDE68A] hover:bg-[#1a4a32] text-xs font-semibold tracking-wide transition-all"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Inquire About Event Hall Booking</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
