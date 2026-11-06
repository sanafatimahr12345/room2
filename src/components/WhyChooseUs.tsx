import React from 'react';
import { Crown, UtensilsCrossed, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_US_DATA } from '../data/hotelData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#D4AF37]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-[#D4AF37]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-[#D4AF37]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <Crown className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="why-us" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
          Experience Excellence
        </span>
        <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
          Why Choose Us
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4 mb-4" />
        <p className="text-[#C1CEC7] text-sm sm:text-base leading-relaxed">
          At Great Treasure Global Hotel & Suites, we combine prestigious luxury with warm
          African hospitality, creating memories that linger long after check-out.
        </p>
      </div>

      {/* 5 Feature Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
        {WHY_CHOOSE_US_DATA.map((item, index) => (
          <div
            key={item.id}
            className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 text-center flex flex-col items-center justify-between border border-[#D4AF37]/25 relative group"
          >
            {/* Golden Icon with Halo */}
            <div className="mb-5 relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#123624] to-[#0A1D13] border border-[#D4AF37]/40 flex items-center justify-center shadow-lg shadow-[#0E291C]/40 group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-300">
                {getIcon(item.icon)}
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-[#D4AF37]/15 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>

            {/* Title */}
            <h3 className="font-luxury text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-[#FDE68A] transition-colors">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#AAB8B0] leading-relaxed">
              {item.description}
            </p>

            {/* Subtle bottom indicator */}
            <div className="w-8 h-0.5 bg-[#D4AF37]/30 mt-5 group-hover:w-16 group-hover:bg-[#D4AF37] transition-all duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};
