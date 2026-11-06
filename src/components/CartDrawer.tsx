import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, CheckCircle, Utensils } from 'lucide-react';
import { CartItem } from '../types';
import { createWhatsAppFoodOrderLink } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (foodId: string, delta: number) => void;
  onRemoveItem: (foodId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'room' | 'dine-in' | 'delivery'>('room');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [roomOrAddress, setRoomOrAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isOrderedSuccess, setIsOrderedSuccess] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0);
  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(totalAmount);

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    const waLink = createWhatsAppFoodOrderLink({
      cart,
      orderType,
      roomOrAddress,
      customerName,
      customerPhone,
      notes,
    });

    window.open(waLink, '_blank');
    setIsOrderedSuccess(true);
    setTimeout(() => {
      onClearCart();
      setIsOrderedSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#07130D] border-l border-[#D4AF37]/30 text-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#173827] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0F2F20] border border-[#D4AF37]/40 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-luxury text-lg font-bold text-white">Your Food Basket</h3>
                <span className="text-xs text-[#9EB2A7]">
                  {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#0F2F20] text-[#BAC7BF] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isOrderedSuccess ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
                <h4 className="font-luxury text-2xl font-bold text-white">Order Sent!</h4>
                <p className="text-sm text-[#BAC7BF]">
                  Your order has been routed to our chef via WhatsApp. We will start preparation immediately.
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0E2419] border border-[#1b3d2b] flex items-center justify-center mx-auto text-[#D4AF37]">
                  <Utensils className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-luxury text-lg font-bold text-white">Your cart is empty</h4>
                <p className="text-xs text-[#9EAEA4] max-w-xs mx-auto">
                  Explore our African delicacies, grilled specialties, savory snacks, and chilled drinks.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold text-xs uppercase tracking-wider"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.food.id}
                      className="flex items-center gap-3.5 p-3 rounded-xl bg-[#0A1F15] border border-[#1b3d2a]"
                    >
                      <img
                        src={item.food.image}
                        alt={item.food.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover border border-[#D4AF37]/20 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-luxury text-sm font-bold text-white truncate">
                          {item.food.name}
                        </h4>
                        <div className="text-xs font-mono font-semibold text-[#FDE68A]">
                          {item.food.formattedPrice}
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.food.id, -1)}
                            className="w-6 h-6 rounded bg-[#10291D] border border-[#1d4430] flex items-center justify-center text-[#D1DDD5] hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold font-mono px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.food.id, 1)}
                            className="w-6 h-6 rounded bg-[#10291D] border border-[#1d4430] flex items-center justify-center text-[#D1DDD5] hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-mono font-bold text-white">
                          ₦{(item.food.price * item.quantity).toLocaleString()}
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.food.id)}
                          className="mt-2 text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Details Form */}
                <form id="cart-order-form" onSubmit={handleWhatsAppOrder} className="space-y-4 pt-4 border-t border-[#173827]">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Service Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType('room')}
                        className={`py-2 px-2 text-[11px] font-semibold rounded-lg border transition-all ${
                          orderType === 'room'
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : 'bg-[#0A1F15] text-[#BAC7BF] border-[#1d4430]'
                        }`}
                      >
                        Room Service
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('dine-in')}
                        className={`py-2 px-2 text-[11px] font-semibold rounded-lg border transition-all ${
                          orderType === 'dine-in'
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : 'bg-[#0A1F15] text-[#BAC7BF] border-[#1d4430]'
                        }`}
                      >
                        Dine-In
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`py-2 px-2 text-[11px] font-semibold rounded-lg border transition-all ${
                          orderType === 'delivery'
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                            : 'bg-[#0A1F15] text-[#BAC7BF] border-[#1d4430]'
                        }`}
                      >
                        Delivery
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                      {orderType === 'room'
                        ? 'Room Number *'
                        : orderType === 'dine-in'
                        ? 'Table / Lounge Area'
                        : 'Delivery Street Address *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        orderType === 'room'
                          ? 'e.g. Room 204'
                          : orderType === 'dine-in'
                          ? 'e.g. Poolside Cabana #3'
                          : 'e.g. 15 Admiralty Way, Lekki'
                      }
                      value={roomOrAddress}
                      onChange={(e) => setRoomOrAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0A1F15] border border-[#1b3d2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0A1F15] border border-[#1b3d2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0803 000 0000"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0A1F15] border border-[#1b3d2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                      Kitchen Notes (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Extra pepper sauce, extra serviette"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0A1F15] border border-[#1b3d2b] text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && !isOrderedSuccess && (
            <div className="p-6 border-t border-[#173827] bg-[#05100B] space-y-4">
              <div className="flex items-center justify-between text-base font-bold">
                <span className="text-[#C1CEC7]">Total Amount:</span>
                <span className="font-mono text-xl text-[#FDE68A]">{formattedTotal}</span>
              </div>

              <button
                type="submit"
                form="cart-order-form"
                className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] text-black font-bold text-sm tracking-wide hover:brightness-105 flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Place Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
