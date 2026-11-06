import React, { useState } from 'react';
import { X, Search, Calendar, Users, Phone, Mail, CheckCircle2, MessageSquare, Printer, Bed, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { BookingRecord } from '../types';
import { HOTEL_INFO } from '../data/hotelData';

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  activeBookingId?: string | null;
}

export const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  activeBookingId,
}) => {
  const [searchQuery, setSearchQuery] = useState(activeBookingId || '');
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(() => {
    if (activeBookingId) {
      const match = bookings.find((b) => b.id.toLowerCase() === activeBookingId.toLowerCase());
      if (match) return match;
    }
    return bookings.length > 0 ? bookings[0] : null;
  });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = bookings.find(
      (b) =>
        b.id.toLowerCase() === query ||
        b.guestPhone.toLowerCase().includes(query) ||
        b.guestName.toLowerCase().includes(query)
    );

    if (found) {
      setSelectedBooking(found);
    } else {
      alert(`No booking found matching "${searchQuery}". Please check your Reference ID or contact front desk.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
              <ShieldCheck className="w-4 h-4" />
              Verified Guest Services
            </span>
            <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white">
              Booking Details & Status
            </h3>
            <p className="text-xs text-[#9EB2A7] mt-1">
              View your hotel reservation details, dates, payment summary, and hospitality perks.
            </p>
          </div>

          {/* Search Bar & Fast Select */}
          <div className="mb-6 space-y-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter Booking ID (e.g. GT-782910) or Phone Number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0A1F15] border border-[#1b3f2b] text-white text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-xs uppercase tracking-wider shrink-0 hover:brightness-110 cursor-pointer"
              >
                Find Booking
              </button>
            </form>

            {/* Quick selectors if multiple bookings exist */}
            {bookings.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-[#8DA396] whitespace-nowrap">Your Bookings:</span>
                {bookings.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedBooking(b);
                      setSearchQuery(b.id);
                    }}
                    className={`px-3 py-1 rounded-lg border whitespace-nowrap transition-all ${
                      selectedBooking?.id === b.id
                        ? 'bg-[#0E2D1D] text-[#FDE68A] border-[#D4AF37]'
                        : 'bg-[#06140D] text-[#BAC7BF] border-[#183927]'
                    }`}
                  >
                    {b.id} ({b.room.name})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Booking Details Content */}
          {selectedBooking ? (
            <div className="space-y-6">
              {/* Card Banner: Status & Room */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0B2318] to-[#06160F] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedBooking.room.image}
                    alt={selectedBooking.room.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-xl object-cover border border-[#D4AF37]/30 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {selectedBooking.status}
                      </span>
                      <span className="text-xs font-mono text-[#D4AF37]">
                        Ref: #{selectedBooking.id}
                      </span>
                    </div>
                    <h4 className="font-luxury text-xl font-bold text-white mt-1">
                      {selectedBooking.room.name}
                    </h4>
                    <p className="text-xs text-[#9EB2A7]">
                      {selectedBooking.room.bed} · {selectedBooking.room.capacity}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-[#1a3d2a] w-full sm:w-auto">
                  <span className="text-[11px] text-[#A5B8AE] uppercase tracking-wider block">
                    Total Estimated Cost
                  </span>
                  <span className="font-mono text-2xl font-bold text-[#FDE68A]">
                    {selectedBooking.formattedTotal}
                  </span>
                  <span className="text-[11px] text-emerald-400 block mt-0.5 font-medium">
                    {selectedBooking.nights} Night{selectedBooking.nights > 1 ? 's' : ''} Stay
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Stay Dates Box */}
                <div className="p-4 rounded-xl bg-[#06140D] border border-[#1b3d2b] space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-semibold uppercase tracking-wider">
                    <Calendar className="w-4 h-4" />
                    <span>Dates & Check-In Schedule</span>
                  </div>
                  <div className="flex justify-between border-b border-[#143122] pb-1.5">
                    <span className="text-[#9EAEA4]">Check-In:</span>
                    <strong className="text-white">{selectedBooking.checkIn} (from {selectedBooking.room.checkInTime || '2:00 PM'})</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#143122] pb-1.5">
                    <span className="text-[#9EAEA4]">Check-Out:</span>
                    <strong className="text-white">{selectedBooking.checkOut} (until {selectedBooking.room.checkOutTime || '12:00 PM'})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9EAEA4]">Duration:</span>
                    <span className="text-[#FDE68A] font-semibold">{selectedBooking.nights} Night{selectedBooking.nights > 1 ? 's' : ''}</span>
                  </div>
                </div>

                {/* Guest Contact Box */}
                <div className="p-4 rounded-xl bg-[#06140D] border border-[#1b3d2b] space-y-2.5 text-xs">
                  <div className="flex items-center gap-2 text-[#D4AF37] font-semibold uppercase tracking-wider">
                    <Users className="w-4 h-4" />
                    <span>Guest Information</span>
                  </div>
                  <div className="flex justify-between border-b border-[#143122] pb-1.5">
                    <span className="text-[#9EAEA4]">Lead Guest:</span>
                    <strong className="text-white">{selectedBooking.guestName}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#143122] pb-1.5">
                    <span className="text-[#9EAEA4]">Phone:</span>
                    <strong className="text-white">{selectedBooking.guestPhone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9EAEA4]">Party Size:</span>
                    <span className="text-white">{selectedBooking.guests} Guest{selectedBooking.guests > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              {/* Special Requests & Hotel Notes */}
              {selectedBooking.specialRequests && (
                <div className="p-3.5 rounded-xl bg-[#06140D] border border-[#1b3d2b] text-xs">
                  <span className="text-[#D4AF37] font-semibold uppercase tracking-wider block mb-1">
                    Special Instructions / Guest Requests:
                  </span>
                  <p className="text-[#CAD7CF] italic">"{selectedBooking.specialRequests}"</p>
                </div>
              )}

              {/* Included Perks & Amenities */}
              <div className="p-4 rounded-xl bg-[#092217] border border-[#D4AF37]/25">
                <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-2">
                  Complimentary Hospitality Inclusions
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-[#C1DDD0]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>24/7 Electricity</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Free Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Secure Parking</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Room Service</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Great Treasure Concierge, I am inquiring regarding my Booking #${selectedBooking.id} for ${selectedBooking.guestName}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#25D366] text-black font-bold text-xs sm:text-sm tracking-wide hover:brightness-105 flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp Concierge with Ref #{selectedBooking.id}</span>
                </a>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-3 px-4 rounded-xl bg-[#0F2F20] border border-[#D4AF37]/50 text-[#FDE68A] hover:bg-[#153e2a] font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#D4AF37]" />
                  <span>Print Booking Receipt</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-3">
              <Calendar className="w-12 h-12 text-[#D4AF37]/50 mx-auto" />
              <h4 className="text-lg font-bold text-white">No Booking Selected</h4>
              <p className="text-xs text-[#9EB2A7] max-w-sm mx-auto">
                Please enter your reservation reference code or contact our reservation desk for immediate lookup.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
