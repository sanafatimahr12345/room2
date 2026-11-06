import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromotionCards } from './components/PromotionCards';
import { WhyChooseUs } from './components/WhyChooseUs';
import { RoomsSection } from './components/RoomsSection';
import { PopularMeals } from './components/PopularMeals';
import { FacilitiesSection } from './components/FacilitiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { BookingModal } from './components/BookingModal';
import { BookingDetailsModal } from './components/BookingDetailsModal';
import { RoomDetailsModal } from './components/RoomDetailsModal';
import { MealDetailsModal } from './components/MealDetailsModal';
import { Room, FoodItem, CartItem, SearchFilter, BookingRecord } from './types';
import { HOTEL_INFO, ROOMS_DATA, SAMPLE_INITIAL_BOOKINGS } from './data/hotelData';
import { MessageSquare, PhoneCall } from 'lucide-react';

export default function App() {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Booking modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  // Booking Details Modal state & stored bookings
  const [bookings, setBookings] = useState<BookingRecord[]>(SAMPLE_INITIAL_BOOKINGS);
  const [isBookingDetailsOpen, setIsBookingDetailsOpen] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);

  // Room details popup state
  const [roomForDetails, setRoomForDetails] = useState<Room | null>(null);

  // Meal details popup state
  const [mealForDetails, setMealForDetails] = useState<FoodItem | null>(null);

  // Search filter state from Hero
  const [activeFilter, setActiveFilter] = useState<SearchFilter | null>(null);

  // Cart operations
  const handleAddToCart = (food: FoodItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.food.id === food.id);
      if (existing) {
        return prevCart.map((item) =>
          item.food.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { food, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (foodId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.food.id === foodId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveFromCart = (foodId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.food.id !== foodId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Booking handlers
  const handleOpenBookingModal = (room?: Room) => {
    setSelectedRoomForBooking(room || ROOMS_DATA[0]);
    setIsBookingOpen(true);
  };

  const handleBookingCreated = (newRecord: BookingRecord) => {
    setBookings((prev) => [newRecord, ...prev]);
    setActiveBookingId(newRecord.id);
  };

  const handleViewBookingDetails = (bookingId?: string) => {
    if (bookingId) setActiveBookingId(bookingId);
    setIsBookingDetailsOpen(true);
  };

  const handleSearchFilter = (filter: SearchFilter) => {
    setActiveFilter(filter);
    if (filter.roomType !== 'all') {
      const targetRoom = ROOMS_DATA.find((r) => r.id === filter.roomType);
      if (targetRoom) {
        setSelectedRoomForBooking(targetRoom);
      }
    }
  };

  const handleScrollToRooms = () => {
    const el = document.getElementById('rooms');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToDining = () => {
    const el = document.getElementById('dining');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050b08] text-[#E8ECE9] relative selection:bg-[#D4AF37] selection:text-black">
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => handleOpenBookingModal()}
        onOpenBookingDetails={() => handleViewBookingDetails()}
      />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section with Search Bar */}
        <Hero
          onSearch={handleSearchFilter}
          onBookClick={() => handleOpenBookingModal()}
        />

        {/* 2. Side-by-side Booking & Food Promotion */}
        <PromotionCards
          onViewRoomsClick={handleScrollToRooms}
          onOrderNowClick={handleScrollToDining}
        />

        {/* 3. Why Choose Us Section */}
        <WhyChooseUs />

        {/* 4. Rooms & Suites Section */}
        <RoomsSection
          onSelectRoom={(room) => handleOpenBookingModal(room)}
          onViewDetails={(room) => setRoomForDetails(room)}
          activeFilter={activeFilter}
          onClearFilter={() => setActiveFilter(null)}
        />

        {/* 5. Popular Meals Section */}
        <PopularMeals
          onAddToCart={handleAddToCart}
          onViewMealDetails={(meal) => setMealForDetails(meal)}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalCartItemsCount}
        />

        {/* 6. Facilities Section */}
        <FacilitiesSection />

        {/* Contact & Inquiry Section */}
        <ContactSection />
      </main>

      {/* 7. Footer */}
      <Footer
        onBookClick={() => handleOpenBookingModal()}
        onOrderClick={handleScrollToDining}
        onOpenBookingDetails={() => handleViewBookingDetails()}
      />

      {/* Slide-in Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Room Reservation Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedRoom={selectedRoomForBooking}
        initialCheckIn={activeFilter?.checkIn}
        initialCheckOut={activeFilter?.checkOut}
        initialGuests={activeFilter?.guests}
        onBookingSuccess={handleBookingCreated}
        onViewBookingDetails={handleViewBookingDetails}
      />

      {/* Booking Details & Status Lookup Modal */}
      <BookingDetailsModal
        isOpen={isBookingDetailsOpen}
        onClose={() => setIsBookingDetailsOpen(false)}
        bookings={bookings}
        activeBookingId={activeBookingId}
      />

      {/* Room Details Modal */}
      <RoomDetailsModal
        isOpen={Boolean(roomForDetails)}
        onClose={() => setRoomForDetails(null)}
        room={roomForDetails}
        onBookRoom={(room) => handleOpenBookingModal(room)}
      />

      {/* Meal Details Modal */}
      <MealDetailsModal
        isOpen={Boolean(mealForDetails)}
        onClose={() => setMealForDetails(null)}
        meal={mealForDetails}
        onAddToCart={handleAddToCart}
        isAdded={Boolean(mealForDetails && cart.some((c) => c.food.id === mealForDetails.id))}
      />

      {/* Floating Quick WhatsApp & Reception Contact */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <a
          href={`https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(
            'Hello Great Treasure Global Hotel & Suites, I would like to make an inquiry.'
          )}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25D366] text-black font-bold text-xs shadow-2xl hover:brightness-110 hover:scale-105 transition-all duration-300"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline font-semibold">WhatsApp Concierge</span>
        </a>

        <a
          href={`tel:${HOTEL_INFO.phone}`}
          aria-label="Call front desk"
          className="w-10 h-10 rounded-full bg-[#0E291C] border border-[#D4AF37]/50 text-[#FDE68A] flex items-center justify-center shadow-xl hover:bg-[#153e2a] hover:border-[#D4AF37] transition-all"
        >
          <PhoneCall className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
