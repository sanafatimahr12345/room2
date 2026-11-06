import React from 'react';
import { Wifi, Zap, ShieldCheck, Tag, Utensils, Coffee, Wine, Clock, ArrowRight } from 'lucide-react';

interface PromotionCardsProps {
  onViewRoomsClick: () => void;
  onOrderNowClick: () => void;
}

export const PromotionCards: React.FC<PromotionCardsProps> = ({
  onViewRoomsClick,
  onOrderNowClick,
}) => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Promotion Card 1: Book Your Stay */}
        <div className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between border border-[#D4AF37]/30 transition-all duration-300">
          {/* Image Container with Scrim */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img
              src="/images/room_standard.jpg"
              alt="Luxury hotel bedroom suite at Great Treasure"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091B12] via-[#091B12]/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#050b08]/85 border border-[#D4AF37]/60 text-[#FDE68A] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                Hospitality Experience
              </span>
            </div>
            <div className="absolute bottom-4 left-6 right-6">
              <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Book Your Stay
              </h3>
              <p className="text-sm text-[#D1DDD5] mt-1">
                Indulge in royal comfort and tranquil relaxation.
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="flex items-center gap-3 text-sm text-[#E0E8E3]">
                <div className="w-8 h-8 rounded-lg bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Wifi className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="font-medium">Free Wi-Fi</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#E0E8E3]">
                <div className="w-8 h-8 rounded-lg bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="font-medium">24/7 Power Supply</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#E0E8E3]">
                <div className="w-8 h-8 rounded-lg bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="font-medium">Secure Environment</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#E0E8E3]">
                <div className="w-8 h-8 rounded-lg bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="font-medium">Best Rate Guarantee</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 mt-4 border-t border-[#1a3829]">
              <button
                onClick={onViewRoomsClick}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>View Rooms</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Promotion Card 2: Order Delicious Food */}
        <div className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col justify-between border border-[#D4AF37]/30 transition-all duration-300">
          {/* Image Container with Scrim */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <img
              src="/images/food_jollof.jpg"
              alt="Gourmet Jollof Rice and chicken at Great Treasure Restaurant"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091B12] via-[#091B12]/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full bg-[#050b08]/85 border border-[#D4AF37]/60 text-[#FDE68A] text-xs font-semibold tracking-wider uppercase backdrop-blur-md">
                Chef's Kitchen & Lounge
              </span>
            </div>
            <div className="absolute bottom-4 left-6 right-6">
              <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Order Delicious Food
              </h3>
              <p className="text-sm text-[#D1DDD5] mt-1">
                Authentic Nigerian delicacies and gourmet intercontinental dishes.
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="flex items-center gap-3 text-sm text-[#E0E8E3]">
                <div className="w-8 h-8 rounded-lg bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Utensils className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="font-medium">Local & Continental</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#E0E8E3]">
                <div className="w-8 h-8 rounded-lg bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Coffee className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="font-medium">Savory Snacks</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#E0E8E3]">
                <div className="w-8 h-8 rounded-lg bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Wine className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="font-medium">Chilled Drinks & Wines</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#E0E8E3]">
                <div className="w-8 h-8 rounded-lg bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <span className="font-medium">Fast Kitchen Service</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 mt-4 border-t border-[#1a3829]">
              <button
                onClick={onOrderNowClick}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
