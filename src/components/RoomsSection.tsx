import React from 'react';
import { Users, Bed, Wifi, Check, Sparkles, CalendarPlus, Filter } from 'lucide-react';
import { Room, SearchFilter } from '../types';
import { ROOMS_DATA } from '../data/hotelData';

interface RoomsSectionProps {
  onSelectRoom: (room: Room) => void;
  onViewDetails: (room: Room) => void;
  activeFilter?: SearchFilter | null;
  onClearFilter?: () => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  onSelectRoom,
  onViewDetails,
  activeFilter,
  onClearFilter,
}) => {
  const filteredRooms = activeFilter && activeFilter.roomType !== 'all'
    ? ROOMS_DATA.filter((r) => r.id === activeFilter.roomType)
    : ROOMS_DATA;

  return (
    <section id="rooms" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
            Rest in Absolute Opulence
          </span>
          <h2 className="font-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
            Rooms & Suites
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mt-3" />
        </div>

        {activeFilter && (
          <div className="flex items-center gap-3 bg-[#0A1F15] border border-[#D4AF37]/40 px-4 py-2 rounded-xl text-xs sm:text-sm text-[#D1DDD5]">
            <Filter className="w-4 h-4 text-[#D4AF37]" />
            <span>
              Dates: <strong className="text-white">{activeFilter.checkIn}</strong> to{' '}
              <strong className="text-white">{activeFilter.checkOut}</strong> (Guests: {activeFilter.guests})
            </span>
            {activeFilter.roomType !== 'all' && onClearFilter && (
              <button
                onClick={onClearFilter}
                className="ml-2 text-[#D4AF37] underline hover:text-[#FDE68A] cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
        )}
      </div>

      {/* Grid of 4 Premium Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-[#D4AF37]/25 relative group"
          >
            {/* Featured Ribbon if applicable */}
            {room.featured && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2.5 py-1 rounded-md bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-black" />
                  Popular Choice
                </span>
              </div>
            )}

            {/* Room Image with Zoom on Hover */}
            <div
              onClick={() => onViewDetails(room)}
              className="relative h-56 w-full overflow-hidden cursor-pointer"
            >
              <img
                src={room.image}
                alt={`${room.name} interior at Great Treasure Hotel`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091E14] via-[#091E14]/30 to-transparent" />

              {/* Price Tag Overlay */}
              <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white drop-shadow-md">
                    {room.formattedPrice}
                  </span>
                  <span className="text-xs text-[#D1DDD5] font-light ml-1">/ night</span>
                </div>
              </div>
            </div>

            {/* Room Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3
                  onClick={() => onViewDetails(room)}
                  className="font-luxury text-xl font-bold text-white group-hover:text-[#FDE68A] transition-colors mb-2 cursor-pointer"
                >
                  {room.name}
                </h3>
                <p className="text-xs text-[#AAB8B0] line-clamp-2 mb-4 leading-relaxed">
                  {room.description}
                </p>

                {/* Key Specifications */}
                <div className="space-y-2 py-3 border-y border-[#183627] text-xs text-[#D1DDD5]">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>Capacity: {room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>Bed: {room.bed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>Free Wi-Fi: Included</span>
                  </div>
                </div>

                {/* Amenities bullet tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-[11px] text-[#A5C0B2] flex items-center gap-1"
                    >
                      <Check className="w-3 h-3 text-[#D4AF37]" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Details + Book Now */}
              <div className="pt-5 mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onViewDetails(room)}
                  className="py-2.5 px-2.5 rounded-xl bg-[#091F15] border border-[#D4AF37]/40 text-[#FDE68A] hover:bg-[#123625] hover:border-[#D4AF37] text-xs font-semibold tracking-wide flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <span>Room Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectRoom(room)}
                  className="py-2.5 px-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black font-bold text-xs tracking-wide shadow-md shadow-[#D4AF37]/20 hover:brightness-110 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Book Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
