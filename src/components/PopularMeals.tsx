import React, { useState } from 'react';
import { Plus, Check, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { FoodItem } from '../types';
import { FOOD_ITEMS_DATA } from '../data/hotelData';

interface PopularMealsProps {
  onAddToCart: (food: FoodItem) => void;
  onViewMealDetails: (food: FoodItem) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const PopularMeals: React.FC<PopularMealsProps> = ({
  onAddToCart,
  onViewMealDetails,
  onOpenCart,
  cartCount,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [addedItemIds, setAddedItemIds] = useState<{ [id: string]: boolean }>({});

  const categories = ['All', 'Rice Dishes', 'Swallow', 'Soups', 'Snacks', 'Drinks'];

  const filteredItems =
    activeCategory === 'All'
      ? FOOD_ITEMS_DATA
      : FOOD_ITEMS_DATA.filter((item) => item.category === activeCategory);

  const handleAddClick = (item: FoodItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="dining" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
            Chef's Culinary Showcase
          </span>
          <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
            Popular Meals & Drinks
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mt-3" />
        </div>

        {/* View Cart Pill in Header */}
        <button
          onClick={onOpenCart}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-[#0F2F20] border border-[#D4AF37]/40 text-[#FDE68A] hover:bg-[#163D2B] transition-colors flex items-center gap-2 text-sm font-semibold cursor-pointer shadow-lg"
        >
          <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
          <span>View Cart</span>
          {cartCount > 0 && (
            <span className="bg-[#D4AF37] text-black text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount} items
            </span>
          )}
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeCategory === category
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold shadow-lg shadow-[#D4AF37]/25'
                : 'bg-[#0A1F15]/80 text-[#B7C7BF] border border-[#1c3f2d] hover:border-[#D4AF37]/50 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((meal) => {
          const isJustAdded = addedItemIds[meal.id];

          return (
            <div
              key={meal.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-[#D4AF37]/25 group"
            >
              {/* Food Image */}
              <div
                onClick={() => onViewMealDetails(meal)}
                className="relative h-48 w-full overflow-hidden bg-[#0A1A12] cursor-pointer"
              >
                <img
                  src={meal.image}
                  alt={meal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081810] via-transparent to-transparent" />

                {/* Category & Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-[#050b08]/85 text-[#FDE68A] border border-[#D4AF37]/40 text-[10px] font-semibold tracking-wide uppercase">
                    {meal.category}
                  </span>
                  {meal.isPopular && (
                    <span className="px-2 py-1 rounded-md bg-[#D4AF37] text-black text-[10px] font-bold flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      Chef Pick
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

              {/* Food Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3
                      onClick={() => onViewMealDetails(meal)}
                      className="font-luxury text-base sm:text-lg font-bold text-white group-hover:text-[#FDE68A] transition-colors leading-snug cursor-pointer"
                    >
                      {meal.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#9EB2A7] line-clamp-2 mb-4 leading-relaxed">
                    {meal.description}
                  </p>
                </div>

                {/* Price & Action row with Details and Add to Cart */}
                <div className="pt-3 border-t border-[#173827] flex items-center justify-between gap-2">
                  <span className="text-base sm:text-lg font-mono font-bold text-[#FDE68A]">
                    {meal.formattedPrice}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onViewMealDetails(meal)}
                      className="px-2.5 py-2 rounded-xl text-xs font-semibold bg-[#0A1F15] border border-[#D4AF37]/40 text-[#FDE68A] hover:bg-[#133625] transition-colors cursor-pointer"
                    >
                      Details
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddClick(meal)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-md ${
                        isJustAdded
                          ? 'bg-emerald-500 text-black'
                          : 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black hover:brightness-110 shadow-[#D4AF37]/20'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
