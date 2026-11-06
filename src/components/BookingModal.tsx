import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, BedDouble, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Room, BookingRecord } from '../types';
import { ROOMS_DATA } from '../data/hotelData';
import { createWhatsAppRoomBookingLink } from '../utils/whatsapp';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoom: Room | null;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onBookingSuccess?: (record: BookingRecord) => void;
  onViewBookingDetails?: (bookingId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedRoom,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  onBookingSuccess,
  onViewBookingDetails,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [currentRoomId, setCurrentRoomId] = useState<string>(
    selectedRoom ? selectedRoom.id : ROOMS_DATA[0].id
  );
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || today);
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || tomorrow);
  const [guests, setGuests] = useState<number>(initialGuests);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    if (selectedRoom) {
      setCurrentRoomId(selectedRoom.id);
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
  }, [initialCheckIn, initialCheckOut]);

  if (!isOpen) return null;

  const room = ROOMS_DATA.find((r) => r.id === currentRoomId) || ROOMS_DATA[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const calculatedNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const nights = isNaN(calculatedNights) || calculatedNights < 1 ? 1 : calculatedNights;

  const totalPrice = room.price * nights;
  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert('Please enter your full name and phone number.');
      return;
    }

    const newCode = `GT-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(newCode);

    const record: BookingRecord = {
      id: newCode,
      room,
      checkIn,
      checkOut,
      nights,
      guests,
      guestName,
      guestPhone,
      guestEmail,
      specialRequests,
      totalPrice,
      formattedTotal,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0],
    };

    if (onBookingSuccess) {
      onBookingSuccess(record);
    }

    const waLink = createWhatsAppRoomBookingLink({
      room,
      checkIn,
      checkOut,
      nights,
      guests,
      guestName,
      guestPhone,
      specialRequests,
    });

    window.open(waLink, '_blank');
    setIsSuccess(true);
  };

  const handleDirectReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert('Please enter your full name and phone number.');
      return;
    }

    const newCode = `GT-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(newCode);

    const record: BookingRecord = {
      id: newCode,
      room,
      checkIn,
      checkOut,
      nights,
      guests,
      guestName,
      guestPhone,
      guestEmail,
      specialRequests,
      totalPrice,
      formattedTotal,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0],
    };

    if (onBookingSuccess) {
      onBookingSuccess(record);
    }

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="relative w-full max-w-2xl bg-[#07150E] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl z-10 overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-[#0E2419] text-[#A5B8AE] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#0F3322] border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Reservation Recorded
                </span>
                <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
                  Thank You, {guestName}!
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#091E14] border border-[#D4AF37]/30 max-w-md mx-auto text-left space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-[#173827] pb-2">
                  <span className="text-[#9EAEA4]">Booking Reference:</span>
                  <span className="font-mono font-bold text-[#FDE68A]">{confirmationCode}</span>
                </div>
                <div className="flex justify-between border-b border-[#173827] pb-2">
                  <span className="text-[#9EAEA4]">Room Category:</span>
                  <span className="font-bold text-white">{room.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#173827] pb-2">
                  <span className="text-[#9EAEA4]">Dates:</span>
                  <span className="font-semibold text-white">
                    {checkIn} to {checkOut} ({nights} Night{nights > 1 ? 's' : ''})
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#173827] pb-2">
                  <span className="text-[#9EAEA4]">Guests:</span>
                  <span className="text-white">{guests} Guest{guests > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#9EAEA4]">Total Estimated:</span>
                  <span className="font-mono font-bold text-lg text-[#FDE68A]">{formattedTotal}</span>
                </div>
              </div>

              <p className="text-xs text-[#A0B2A7] max-w-md mx-auto">
                A reservation confirmation email has been logged. Our concierge will call or message your phone ({guestPhone}) shortly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                {onViewBookingDetails && (
                  <button
                    onClick={() => {
                      onClose();
                      onViewBookingDetails(confirmationCode);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 hover:brightness-110 cursor-pointer"
                  >
                    View Full Booking Details
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0E2419] border border-[#1b3f2b] text-[#C1CEC7] hover:text-white font-semibold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Modal Header */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Direct Hotel Reservation
                </span>
                <h3 className="font-luxury text-2xl sm:text-3xl font-bold text-white">
                  Reserve Your Suite
                </h3>
              </div>

              {/* Selected Room Banner */}
              <div className="p-3 sm:p-4 rounded-2xl bg-[#0B2117] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <img
                  src={room.image}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-24 h-20 rounded-xl object-cover border border-[#D4AF37]/30 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-luxury text-lg font-bold text-white truncate">
                      {room.name}
                    </h4>
                    <span className="font-mono font-bold text-base text-[#FDE68A]">
                      {room.formattedPrice}
                      <span className="text-xs font-normal text-[#AAB8B0]"> / night</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#A0B3A8] line-clamp-1 mt-0.5">
                    {room.capacity} · {room.bed} · Free Wi-Fi
                  </p>
                </div>
              </div>

              {/* Booking Form */}
              <form className="space-y-4">
                {/* Change Room Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                    <BedDouble className="w-3.5 h-3.5" />
                    Select Room Category
                  </label>
                  <select
                    value={currentRoomId}
                    onChange={(e) => setCurrentRoomId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#06140D] border border-[#1b3f2b] text-white text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37]"
                  >
                    {ROOMS_DATA.map((r) => (
                      <option key={r.id} value={r.id} className="bg-[#07150E]">
                        {r.name} – {r.formattedPrice} / night ({r.capacity})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Check-in *
                    </label>
                    <input
                      type="date"
                      min={today}
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#06140D] border border-[#1b3f2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Check-out *
                    </label>
                    <input
                      type="date"
                      min={checkIn || today}
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#06140D] border border-[#1b3f2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-[#06140D] border border-[#1b3f2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value={1} className="bg-[#07150E]">1 Guest</option>
                      <option value={2} className="bg-[#07150E]">2 Guests</option>
                      <option value={3} className="bg-[#07150E]">3 Guests</option>
                      <option value={4} className="bg-[#07150E]">4 Guests</option>
                    </select>
                  </div>
                </div>

                {/* Guest Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Guest Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Okafor"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#06140D] border border-[#1b3f2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 456 7890"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#06140D] border border-[#1b3f2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. samuel@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#06140D] border border-[#1b3f2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Special Requests (Airport pickup, high floor, etc.)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Late check-in around 9pm, quiet room"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#06140D] border border-[#1b3f2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Calculation Summary Bar */}
                <div className="p-4 rounded-xl bg-[#05110A] border border-[#1b3f2b] flex items-center justify-between">
                  <div className="text-xs text-[#9EAEA4]">
                    <div>Stay: <strong className="text-white">{nights} Night{nights > 1 ? 's' : ''}</strong></div>
                    <div>Rate: <span className="font-mono">{room.formattedPrice}</span> / night</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#D4AF37] uppercase tracking-wider block font-semibold">
                      Total Stay Cost:
                    </span>
                    <span className="text-xl font-mono font-bold text-[#FDE68A]">
                      {formattedTotal}
                    </span>
                  </div>
                </div>

                {/* Dual Action Buttons: Instant Reservation or WhatsApp Reservation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppBooking}
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-black font-bold text-xs sm:text-sm tracking-wide hover:brightness-105 flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Reserve via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDirectReservation}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] text-black font-bold text-xs sm:text-sm tracking-wide hover:brightness-110 flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/25 transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Instant Direct Booking</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
