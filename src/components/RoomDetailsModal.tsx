import React from 'react';
import { X, Users, Bed, Wifi, Check, Sparkles, CalendarPlus, ShieldCheck, Clock, Maximize2, Eye } from 'lucide-react';
import { Room } from '../types';

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  onBookRoom: (room: Room) => void;
}

export const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  isOpen,
  onClose,
  room,
  onBookRoom,
}) => {
  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative w-full max-w-3xl bg-[#07150E] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-10 overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-[#0E2419] text-[#A5B8AE] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Room Specifications & Amenities
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white">
                {room.name}
              </h3>
              <div className="text-left sm:text-right">
                <span className="font-mono text-2xl font-bold text-[#FDE68A]">
                  {room.formattedPrice}
                </span>
                <span className="text-xs text-[#9EB2A7] ml-1">/ night</span>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6 border border-[#D4AF37]/30">
            <img
              src={room.image}
              alt={room.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07150E] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {room.size && (
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 text-xs text-[#FDE68A] flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  {room.size}
                </span>
              )}
              {room.view && (
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#D4AF37]/40 text-xs text-[#FDE68A] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  {room.view}
                </span>
              )}
            </div>
          </div>

          {/* Room Description & Specs */}
          <div className="space-y-6">
            <p className="text-sm text-[#C8D7CF] leading-relaxed">
              {room.description}
            </p>

            {/* Key Specs Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#0B2117] border border-[#1b3f2b] text-xs">
                <span className="text-[#8DA396] block mb-1">Capacity</span>
                <strong className="text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {room.capacity}
                </strong>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B2117] border border-[#1b3f2b] text-xs">
                <span className="text-[#8DA396] block mb-1">Bed Configuration</span>
                <strong className="text-white flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {room.bed}
                </strong>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B2117] border border-[#1b3f2b] text-xs">
                <span className="text-[#8DA396] block mb-1">Internet</span>
                <strong className="text-white flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Free Gigabit Wi-Fi
                </strong>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0B2117] border border-[#1b3f2b] text-xs">
                <span className="text-[#8DA396] block mb-1">Check-in Schedule</span>
                <strong className="text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {room.checkInTime || '2:00 PM'}
                </strong>
              </div>
            </div>

            {/* Room Amenities Full List */}
            <div>
              <h4 className="font-luxury text-sm font-bold text-white mb-3 uppercase tracking-wider text-[#D4AF37]">
                Included Amenities & Suite Perks
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-[#D1DDD5]">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 p-2 rounded-lg bg-[#06140D] border border-[#153423]">
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#183928] flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0F2F20] text-[#BAC7BF] hover:text-white text-xs font-semibold uppercase tracking-wider"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookRoom(room);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/25 cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Book This Room Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
