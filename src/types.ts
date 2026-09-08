export type UserRole = 'customer' | 'restaurant' | 'driver' | 'admin';

export type CuisineType = 
  | 'All' 
  | 'Indian' 
  | 'Italian' 
  | 'Asian' 
  | 'Burgers' 
  | 'Pizza' 
  | 'Healthy' 
  | 'Mexican' 
  | 'Desserts';

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: 'Appetizers' | 'Main Course' | 'Pizzas & Pasta' | 'Burgers & Wraps' | 'Desserts' | 'Beverages';
  image: string;
  isAvailable: boolean;
  isVegetarian: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  rating?: number;
  calories?: number;
  prepTimeMinutes?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: CuisineType[];
  rating: number;
  reviewCount: number;
  deliveryTime: string; // e.g. "20-30 min"
  deliveryFee: number;
  minOrder: number;
  image: string;
  address: string;
  phone: string;
  isOpen: boolean;
  isFeatured?: boolean;
  tags: string[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customization?: {
    spiciness?: 'Mild' | 'Medium' | 'Hot' | 'Extra Hot';
    extraCheese?: boolean;
    specialInstructions?: string;
  };
}

export type OrderStatus = 
  | 'PLACED' 
  | 'CONFIRMED' 
  | 'PREPARING' 
  | 'OUT_FOR_DELIVERY' 
  | 'DELIVERED' 
  | 'CANCELLED';

export type PaymentMethod = 'CREDIT_CARD' | 'RAZORPAY_SIM' | 'UPI_GPAY' | 'CASH_ON_DELIVERY';

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image?: string;
}

export interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  vehicleType: 'Bike' | 'Scooter' | 'E-Bike' | 'Car';
  vehicleNumber: string;
  rating: number;
  isAvailable: boolean;
  currentLat?: number;
  currentLng?: number;
  avatar: string;
}

export interface Order {
  id: string; // e.g., "ORD-8921"
  userId: string;
  userName: string;
  userPhone: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantPhone: string;
  restaurantImage: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  createdAt: string;
  estimatedDeliveryTime: string;
  deliveryPersonId?: string;
  deliveryPersonName?: string;
  deliveryPersonPhone?: string;
  deliveryPersonAvatar?: string;
  driverLat?: number;
  driverLng?: number;
  driverEtaMinutes?: number;
  specialNotes?: string;
}

export interface Review {
  id: string;
  restaurantId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface PromoCode {
  code: string;
  discountType: 'PERCENT' | 'FLAT';
  value: number; // e.g., 20 for 20% or 5 for $5
  minSubtotal: number;
  description: string;
}

export interface InternshipTaskInfo {
  taskId: string;
  studentCode: string;
  domain: string;
  company: string;
  techStack: string[];
  submissionRequirements: string[];
}
