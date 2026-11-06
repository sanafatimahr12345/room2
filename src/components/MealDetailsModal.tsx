import React from 'react';
import { X, Plus, Check, Clock, Flame, Sparkles, Utensils } from 'lucide-react';
import { FoodItem } from '../types';

interface MealDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: FoodItem | null;
  onAddToCart: (meal: FoodItem) => void;
  isAdded: boolean;
}

export const MealDetailsModal: React.FC<MealDetailsModalProps> = ({
  isOpen,
  onClose,
  meal,
  onAddToCart,
  isAdded,
}) => {
  if (!isOpen || !meal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative w-full max-w-lg bg-[#07150E] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-7 text-white shadow-2xl z-10 overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-[#0E2419] text-[#A5B8AE] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative h-56 rounded-2xl overflow-hidden mb-5 border border-[#D4AF37]/30">
            <img
              src={meal.image}
              alt={meal.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07150E] via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-md bg-[#050b08]/85 text-[#FDE68A] border border-[#D4AF37]/40 text-[10px] font-semibold tracking-wide uppercase">
                {meal.category}
              </span>
              {meal.isPopular && (
                <span className="px-2 py-1 rounded-md bg-[#D4AF37] text-black text-[10px] font-bold flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" />
                  Popular
                </span>
              )}
            </div>
            {meal.spiceLevel && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 rounded-md bg-rose-950/90 border border-rose-500/50 text-rose-300 text-[10px] font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3 text-rose-400" />
                  {meal.spiceLevel}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-luxury text-xl font-bold text-white">
                {meal.name}
              </h3>
              <span className="font-mono text-xl font-bold text-[#FDE68A] shrink-0">
                {meal.formattedPrice}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#AAB8B0] leading-relaxed">
              {meal.description}
            </p>

            {/* Preparation Details */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#0B2117] border border-[#1b3f2b] text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <span className="text-[#8DA396] block text-[10px]">Estimated Prep Time</span>
                  <strong className="text-white">{meal.prepTime || '15-20 mins'}</strong>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <span className="text-[#8DA396] block text-[10px]">Serving Style</span>
                  <strong className="text-white">Freshly Cooked to Order</strong>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            {meal.ingredients && meal.ingredients.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2">
                  Key Ingredients & Accompaniments
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {meal.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-2.5 py-1 rounded-md bg-[#06140D] border border-[#153423] text-xs text-[#D1DDD5]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-[#183928] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#0F2F20] text-[#BAC7BF] hover:text-white text-xs font-semibold"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => onAddToCart(meal)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                  isAdded
                    ? 'bg-emerald-500 text-black'
                    : 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black hover:brightness-110 shadow-[#D4AF37]/20'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Food Basket</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add to Food Basket ({meal.formattedPrice})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
