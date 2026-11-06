import { HOTEL_INFO } from '../data/hotelData';
import { CartItem, Room } from '../types';

export function createWhatsAppRoomBookingLink(params: {
  room: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  guestName: string;
  guestPhone: string;
  specialRequests?: string;
}): string {
  const totalPrice = params.room.price * Math.max(params.nights, 1);
  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const message = `*ROOM RESERVATION REQUEST* 🏨
*Hotel:* ${HOTEL_INFO.name}
-----------------------------
*Room Type:* ${params.room.name}
*Check-in Date:* ${params.checkIn}
*Check-out Date:* ${params.checkOut}
*Duration:* ${params.nights} Night${params.nights > 1 ? 's' : ''}
*Guests:* ${params.guests}
*Rate per Night:* ${params.room.formattedPrice}
*Estimated Total:* ${formattedTotal}
-----------------------------
*Guest Name:* ${params.guestName}
*Phone Number:* ${params.guestPhone}
${params.specialRequests ? `*Special Requests:* ${params.specialRequests}\n` : ''}
Please confirm availability and reservation instructions. Thank you!`;

  return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppFoodOrderLink(params: {
  cart: CartItem[];
  orderType: 'room' | 'delivery' | 'dine-in';
  roomOrAddress: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
}): string {
  const total = params.cart.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
  const formattedTotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(total);

  const itemsList = params.cart
    .map(
      (item) =>
        `• ${item.quantity}x ${item.food.name} (₦${(item.food.price * item.quantity).toLocaleString()})`
    )
    .join('\n');

  const orderTypeLabel =
    params.orderType === 'room'
      ? `Room Service (Room #${params.roomOrAddress || 'N/A'})`
      : params.orderType === 'dine-in'
      ? `Restaurant Dine-In (Table: ${params.roomOrAddress || 'TBD'})`
      : `Home/Office Delivery (${params.roomOrAddress || 'N/A'})`;

  const message = `*RESTAURANT FOOD ORDER* 🍽️
*Restaurant:* ${HOTEL_INFO.name} Dining
-----------------------------
*Order Type:* ${orderTypeLabel}
*Customer Name:* ${params.customerName}
*Phone:* ${params.customerPhone}
-----------------------------
*Items Ordered:*
${itemsList}

*Grand Total:* ${formattedTotal}
${params.notes ? `*Special Instructions:* ${params.notes}\n` : ''}
Please prepare my order and confirm estimated delivery/service time. Thank you!`;

  return `https://wa.me/${HOTEL_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
