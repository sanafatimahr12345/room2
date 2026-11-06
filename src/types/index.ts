export interface Room {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  capacity: string;
  bed: string;
  wifi: boolean;
  image: string;
  description: string;
  amenities: string[];
  featured?: boolean;
  size?: string;
  view?: string;
  checkInTime?: string;
  checkOutTime?: string;
  highlights?: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  formattedPrice: string;
  category: 'Rice Dishes' | 'Swallow' | 'Soups' | 'Snacks' | 'Drinks';
  description: string;
  image: string;
  spiceLevel?: string;
  isPopular?: boolean;
  prepTime?: string;
  ingredients?: string[];
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
}

export interface BookingState {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
}

export interface BookingRecord {
  id: string;
  room: Room;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  specialRequests?: string;
  totalPrice: number;
  formattedTotal: string;
  status: 'Confirmed' | 'Active' | 'Pending';
  createdAt: string;
}

export interface SearchFilter {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
}
