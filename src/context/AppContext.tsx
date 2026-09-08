import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Restaurant, 
  MenuItem, 
  CartItem, 
  Order, 
  DeliveryPerson, 
  PromoCode, 
  CuisineType,
  OrderStatus 
} from '../types';
import { 
  INITIAL_RESTAURANTS, 
  INITIAL_MENU_ITEMS, 
  INITIAL_DRIVERS, 
  INITIAL_ORDERS, 
  PROMO_CODES 
} from '../data/mockData';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Role & Nav
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  deliveryAddress: string;
  setDeliveryAddress: (addr: string) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCuisine: CuisineType;
  setSelectedCuisine: (c: CuisineType) => void;
  isVegOnlyFilter: boolean;
  setIsVegOnlyFilter: (v: boolean) => void;

  // Data Collections
  restaurants: Restaurant[];
  menuItems: MenuItem[];
  drivers: DeliveryPerson[];
  orders: Order[];
  
  // Favorites
  favoriteRestaurantIds: string[];
  toggleFavoriteRestaurant: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, customization?: CartItem['customization']) => void;
  removeFromCart: (menuItemId: string) => void;
  updateCartQuantity: (menuItemId: string, delta: number) => void;
  clearCart: () => void;
  appliedPromo: PromoCode | null;
  applyPromoCode: (codeStr: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  
  // Cart Calculations
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartTax: number;
  cartDiscount: number;
  cartTotal: number;
  
  // Modals & Active Selections
  activeRestaurant: Restaurant | null;
  setActiveRestaurant: (rest: Restaurant | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  trackingOrder: Order | null;
  setTrackingOrder: (order: Order | null) => void;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  isTaskPortalOpen: boolean;
  setIsTaskPortalOpen: (open: boolean) => void;
  
  // Order Actions
  placeOrder: (paymentMethod: Order['paymentMethod'], specialNotes?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, driverId?: string) => void;
  
  // Restaurant Admin Actions
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  toggleMenuItemAvailability: (itemId: string) => void;
  toggleRestaurantOpenStatus: (restaurantId: string) => void;

  // Toast Notice
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Apt 4B, 124 Park View Ave, Tech District');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType>('All');
  const [isVegOnlyFilter, setIsVegOnlyFilter] = useState(false);

  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [drivers, setDrivers] = useState<DeliveryPerson[]>(INITIAL_DRIVERS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [favoriteRestaurantIds, setFavoriteRestaurantIds] = useState<string[]>(['rest-1', 'rest-4']);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  // Modals
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isTaskPortalOpen, setIsTaskPortalOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  const toggleFavoriteRestaurant = (id: string) => {
    setFavoriteRestaurantIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    showToast(favoriteRestaurantIds.includes(id) ? 'Removed from favorites' : 'Added to favorites ❤️');
  };

  // Cart Functions
  const addToCart = (item: MenuItem, customization?: CartItem['customization']) => {
    // If cart has items from another restaurant, confirm reset
    if (cart.length > 0 && cart[0].menuItem.restaurantId !== item.restaurantId) {
      if (!window.confirm('Your cart contains items from another restaurant. Would you like to reset your cart to add this item?')) {
        return;
      }
      setCart([{ menuItem: item, quantity: 1, customization }]);
      setAppliedPromo(null);
      showToast(`Added ${item.name} to cart!`);
      return;
    }

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((ci) => ci.menuItem.id === item.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { menuItem: item, quantity: 1, customization }];
      }
    });
    showToast(`Added ${item.name} to cart! 🍕`);
  };

  const removeFromCart = (menuItemId: string) => {
    setCart((prev) => prev.filter((item) => item.menuItem.id !== menuItemId));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (menuItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.menuItem.id === menuItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (codeStr: string) => {
    const clean = codeStr.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === clean);
    if (!found) {
      return { success: false, message: 'Invalid promo code' };
    }
    const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
    if (subtotal < found.minSubtotal) {
      return { success: false, message: `Minimum subtotal for ${clean} is $${found.minSubtotal}` };
    }
    setAppliedPromo(found);
    return { success: true, message: `Applied ${found.code}: ${found.description}` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const cartRestaurant = cart.length > 0 ? restaurants.find((r) => r.id === cart[0].menuItem.restaurantId) : null;
  const cartDeliveryFee = cartSubtotal > 0 ? (cartRestaurant?.deliveryFee ?? 2.99) : 0;
  const cartTax = cartSubtotal * 0.08; // 8% sales tax

  let cartDiscount = 0;
  if (appliedPromo && cartSubtotal >= appliedPromo.minSubtotal) {
    if (appliedPromo.discountType === 'PERCENT') {
      cartDiscount = Math.min((cartSubtotal * appliedPromo.value) / 100, 10);
    } else {
      cartDiscount = appliedPromo.value;
    }
  }

  const cartTotal = Math.max(0, cartSubtotal + cartDeliveryFee + cartTax - cartDiscount);

  // Place Order
  const placeOrder = (paymentMethod: Order['paymentMethod'], specialNotes?: string): Order => {
    if (cart.length === 0) {
      throw new Error('Cart is empty');
    }
    const restaurant = restaurants.find((r) => r.id === cart[0].menuItem.restaurantId);
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: orderId,
      userId: 'usr-101',
      userName: 'John Doe',
      userPhone: '+1 (555) 123-4567',
      restaurantId: restaurant?.id || 'rest-1',
      restaurantName: restaurant?.name || 'Partner Kitchen',
      restaurantAddress: restaurant?.address || 'City Center',
      restaurantPhone: restaurant?.phone || '+1 (555) 000-0000',
      restaurantImage: restaurant?.image || '',
      items: cart.map((ci, idx) => ({
        id: `item-${idx}`,
        menuItemId: ci.menuItem.id,
        name: ci.menuItem.name,
        price: ci.menuItem.price,
        quantity: ci.quantity,
        subtotal: ci.menuItem.price * ci.quantity,
        image: ci.menuItem.image
      })),
      subtotal: cartSubtotal,
      deliveryFee: cartDeliveryFee,
      tax: cartTax,
      discount: cartDiscount,
      totalAmount: cartTotal,
      status: 'PLACED',
      deliveryAddress,
      paymentMethod,
      paymentStatus: 'PAID',
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: '25-30 min',
      deliveryPersonId: 'driver-1',
      deliveryPersonName: 'Rajesh Kumar',
      deliveryPersonPhone: '+1 (555) 901-2345',
      deliveryPersonAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      driverLat: 12.9716,
      driverLng: 77.5946,
      driverEtaMinutes: 20,
      specialNotes
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setTrackingOrder(newOrder);

    // Fire Confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }

    showToast(`Order #${orderId} Placed Successfully! 🎉`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, driverId?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updated = { ...ord, status };
          if (driverId) {
            const driverObj = drivers.find((d) => d.id === driverId);
            if (driverObj) {
              updated.deliveryPersonId = driverObj.id;
              updated.deliveryPersonName = driverObj.name;
              updated.deliveryPersonPhone = driverObj.phone;
              updated.deliveryPersonAvatar = driverObj.avatar;
            }
          }
          if (trackingOrder?.id === orderId) {
            setTrackingOrder(updated);
          }
          return updated;
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} updated to ${status.replace(/_/g, ' ')}`);
  };

  const addMenuItem = (newItem: Omit<MenuItem, 'id'>) => {
    const id = `menu-${Date.now()}`;
    const created: MenuItem = { ...newItem, id };
    setMenuItems((prev) => [...prev, created]);
    showToast(`Added ${created.name} to menu!`);
  };

  const toggleMenuItemAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item))
    );
    showToast('Updated item stock status');
  };

  const toggleRestaurantOpenStatus = (restaurantId: string) => {
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurantId ? { ...r, isOpen: !r.isOpen } : r))
    );
    showToast('Updated restaurant status');
  };

  // Real-time tracking simulation loop for OUT_FOR_DELIVERY orders
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((ord) => {
          if (ord.status === 'OUT_FOR_DELIVERY' && ord.driverEtaMinutes && ord.driverEtaMinutes > 1) {
            const newEta = ord.driverEtaMinutes - 1;
            const updated = {
              ...ord,
              driverEtaMinutes: newEta,
              status: newEta <= 1 ? ('DELIVERED' as OrderStatus) : ord.status
            };
            if (trackingOrder?.id === ord.id) {
              setTrackingOrder(updated);
            }
            return updated;
          }
          return ord;
        })
      );
    }, 15000); // adjust ETA every 15 seconds for realistic effect

    return () => clearInterval(interval);
  }, [trackingOrder?.id]);

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        deliveryAddress,
        setDeliveryAddress,
        searchQuery,
        setSearchQuery,
        selectedCuisine,
        setSelectedCuisine,
        isVegOnlyFilter,
        setIsVegOnlyFilter,
        restaurants,
        menuItems,
        drivers,
        orders,
        favoriteRestaurantIds,
        toggleFavoriteRestaurant,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        cartSubtotal,
        cartDeliveryFee,
        cartTax,
        cartDiscount,
        cartTotal,
        activeRestaurant,
        setActiveRestaurant,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        trackingOrder,
        setTrackingOrder,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        isTaskPortalOpen,
        setIsTaskPortalOpen,
        placeOrder,
        updateOrderStatus,
        addMenuItem,
        toggleMenuItemAvailability,
        toggleRestaurantOpenStatus,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
