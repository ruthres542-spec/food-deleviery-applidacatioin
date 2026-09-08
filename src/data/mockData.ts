import { Restaurant, MenuItem, DeliveryPerson, Order, PromoCode, Review } from '../types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Spicy Tandoor India',
    description: 'Authentic North & South Indian delicacies, aromatic biryanis, and tandoori curries.',
    cuisine: ['Indian', 'Healthy'],
    rating: 4.8,
    reviewCount: 342,
    deliveryTime: '25-35 min',
    deliveryFee: 35,
    minOrder: 149,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    address: '45 Spice Route Ave, Food Plaza',
    phone: '+91 98765 43210',
    isOpen: true,
    isFeatured: true,
    tags: ['Butter Chicken', 'Biryani', 'Naan', 'Top Rated']
  },
  {
    id: 'rest-2',
    name: 'Bella Italia Trattoria',
    description: 'Handcrafted wood-fired pizzas, fresh artisanal pasta, and classic Italian desserts.',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.9,
    reviewCount: 512,
    deliveryTime: '20-30 min',
    deliveryFee: 25,
    minOrder: 199,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    address: '12 Via Roma Way, Culinary District',
    phone: '+91 98765 87654',
    isOpen: true,
    isFeatured: true,
    tags: ['Wood-fired', 'Fresh Pasta', 'Gourmet Pizza']
  },
  {
    id: 'rest-3',
    name: 'Dragon Wok & Dim Sum',
    description: 'Szechuan stir-fries, steaming dim sum baskets, and flavorful ramen bowls.',
    cuisine: ['Asian'],
    rating: 4.7,
    reviewCount: 289,
    deliveryTime: '30-40 min',
    deliveryFee: 45,
    minOrder: 129,
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    address: '88 Dragon Alley, Chinatown',
    phone: '+91 98765 34567',
    isOpen: true,
    isFeatured: false,
    tags: ['Dim Sum', 'Ramen', 'Dumplings']
  },
  {
    id: 'rest-4',
    name: 'Burger Craft & Co.',
    description: 'Smash burgers with 100% Angus beef, brioche buns, and house truffle fries.',
    cuisine: ['Burgers'],
    rating: 4.6,
    reviewCount: 420,
    deliveryTime: '15-25 min',
    deliveryFee: 20,
    minOrder: 129,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    address: '101 Meatpacker Lane',
    phone: '+91 98765 45678',
    isOpen: true,
    isFeatured: true,
    tags: ['Smash Burgers', 'Truffle Fries', 'Milkshakes']
  },
  {
    id: 'rest-5',
    name: 'Urban Bowl Healthy & Vegan',
    description: 'Fresh organic poke bowls, superfood salads, and cold-pressed green juices.',
    cuisine: ['Healthy', 'Asian'],
    rating: 4.8,
    reviewCount: 198,
    deliveryTime: '20-30 min',
    deliveryFee: 30,
    minOrder: 149,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    address: '22 Green Life Blvd',
    phone: '+91 98765 56789',
    isOpen: true,
    isFeatured: false,
    tags: ['Keto', 'Vegan', 'Organic', 'Acai']
  },
  {
    id: 'rest-6',
    name: 'Taqueria Del Sol',
    description: 'Sizzling street tacos, stuffed burritos, fresh guacamole, and churros.',
    cuisine: ['Mexican'],
    rating: 4.7,
    reviewCount: 310,
    deliveryTime: '25-35 min',
    deliveryFee: 35,
    minOrder: 129,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    address: '77 Sol Plaza',
    phone: '+91 98765 67890',
    isOpen: true,
    isFeatured: false,
    tags: ['Tacos', 'Burritos', 'Margaritas', 'Guacamole']
  },
  {
    id: 'rest-7',
    name: 'Pizzeria Napoli',
    description: 'Neapolitan sourdough pizza baked in 90 seconds at 900 degrees.',
    cuisine: ['Pizza', 'Italian'],
    rating: 4.9,
    reviewCount: 650,
    deliveryTime: '20-30 min',
    deliveryFee: 25,
    minOrder: 189,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    address: '33 Vesuvio Street',
    phone: '+91 98765 78901',
    isOpen: true,
    isFeatured: false,
    tags: ['Margherita', 'Sourdough', 'Calzone']
  },
  {
    id: 'rest-8',
    name: 'Sweet Dreams Bakery & Shakes',
    description: 'Decadent chocolate cakes, loaded sundaes, macarons, and thick freakshakes.',
    cuisine: ['Desserts'],
    rating: 4.9,
    reviewCount: 480,
    deliveryTime: '15-25 min',
    deliveryFee: 25,
    minOrder: 99,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    address: '99 Sugar Street',
    phone: '+91 98765 89012',
    isOpen: true,
    isFeatured: true,
    tags: ['Cakes', 'Waffles', 'Thick Shakes', 'Gelato']
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // Spicy Tandoor India (rest-1)
  {
    id: 'menu-101',
    restaurantId: 'rest-1',
    name: 'Chicken Tikka Masala',
    description: 'Tender grilled chicken chunks cooked in a rich, creamy tomato gravy infused with garlic and fenugreek.',
    price: 299,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    rating: 4.9,
    calories: 680,
    prepTimeMinutes: 20
  },
  {
    id: 'menu-102',
    restaurantId: 'rest-1',
    name: 'Hyderabadi Dum Biryani',
    description: 'Aromatic basmati rice layered with marinated chicken, saffron, caramelised onions, and whole spices.',
    price: 329,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: false,
    isSpicy: true,
    rating: 4.8,
    calories: 750,
    prepTimeMinutes: 25
  },
  {
    id: 'menu-103',
    restaurantId: 'rest-1',
    name: 'Paneer Butter Masala',
    description: 'Fresh cottage cheese cubes simmered in a velvet smooth cashew-tomato butter sauce.',
    price: 269,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: true,
    isSpicy: false,
    rating: 4.9,
    calories: 590,
    prepTimeMinutes: 18
  },
  {
    id: 'menu-104',
    restaurantId: 'rest-1',
    name: 'Garlic Butter Naan (2 pcs)',
    description: 'Clay oven baked flatbread brushed with garlic cloves and melted ghee.',
    price: 69,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: true,
    rating: 4.9,
    calories: 280,
    prepTimeMinutes: 8
  },
  {
    id: 'menu-105',
    restaurantId: 'rest-1',
    name: 'Mango Lassi',
    description: 'Chilled refreshing yogurt smoothie blended with ripe Alphonso mangoes and cardamom.',
    price: 89,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1528823872057-9c018a7a8241?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: true,
    rating: 4.8,
    calories: 220,
    prepTimeMinutes: 5
  },

  // Bella Italia Trattoria (rest-2)
  {
    id: 'menu-201',
    restaurantId: 'rest-2',
    name: 'Truffle Mushroom Fettuccine',
    description: 'Handmade fettuccine pasta tossed in black truffle cream sauce with roasted wild mushrooms and parmesan.',
    price: 349,
    category: 'Pizzas & Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: true,
    rating: 4.9,
    calories: 620,
    prepTimeMinutes: 15
  },
  {
    id: 'menu-202',
    restaurantId: 'rest-2',
    name: 'Pizza Margherita DOC',
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, fragrant basil leaves, and extra virgin olive oil.',
    price: 299,
    category: 'Pizzas & Pasta',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: true,
    rating: 4.9,
    calories: 780,
    prepTimeMinutes: 18
  },
  {
    id: 'menu-203',
    restaurantId: 'rest-2',
    name: 'Classic Tiramisu',
    description: 'Espresso-soaked ladyfingers layered with whipped mascarpone cream and dusted with dark cocoa.',
    price: 189,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: true,
    rating: 5.0,
    calories: 410,
    prepTimeMinutes: 5
  },

  // Burger Craft & Co (rest-4)
  {
    id: 'menu-401',
    restaurantId: 'rest-4',
    name: 'Double Truffle Smash Burger',
    description: 'Two smash Angus beef patties, double American cheese, caramelized onions, black truffle aioli on brioche.',
    price: 249,
    category: 'Burgers & Wraps',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: false,
    rating: 4.8,
    calories: 890,
    prepTimeMinutes: 12
  },
  {
    id: 'menu-402',
    restaurantId: 'rest-4',
    name: 'Loaded Truffle Parmesan Fries',
    description: 'Crispy skin-on fries tossed in white truffle oil, grated parmesan, and fresh parsley with garlic dip.',
    price: 129,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: true,
    rating: 4.7,
    calories: 450,
    prepTimeMinutes: 10
  },

  // Urban Bowl (rest-5)
  {
    id: 'menu-501',
    restaurantId: 'rest-5',
    name: 'Ahi Tuna Crunch Poke Bowl',
    description: 'Sustainably caught yellowfin tuna, sushi rice, avocado, edamame, cucumber, pickled ginger, and spicy mayo.',
    price: 329,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: false,
    rating: 4.9,
    calories: 520,
    prepTimeMinutes: 10
  },
  {
    id: 'menu-502',
    restaurantId: 'rest-5',
    name: 'Green Detox Cold Pressed Juice',
    description: 'Spinach, cucumber, green apple, celery, lemon, and ginger juice.',
    price: 119,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    isVegetarian: true,
    isVegan: true,
    rating: 4.8,
    calories: 110,
    prepTimeMinutes: 3
  }
];

export const INITIAL_DRIVERS: DeliveryPerson[] = [
  {
    id: 'driver-1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 01234',
    vehicleType: 'Scooter',
    vehicleNumber: 'KA-01-EQ-9821',
    rating: 4.9,
    isAvailable: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    currentLat: 12.9716,
    currentLng: 77.5946
  },
  {
    id: 'driver-2',
    name: 'Alex Rivera',
    phone: '+91 98765 12345',
    vehicleType: 'E-Bike',
    vehicleNumber: 'EB-7721',
    rating: 4.8,
    isAvailable: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    currentLat: 12.9780,
    currentLng: 77.6010
  },
  {
    id: 'driver-3',
    name: 'Sarah Chen',
    phone: '+91 98765 23456',
    vehicleType: 'Bike',
    vehicleNumber: 'BK-4410',
    rating: 4.95,
    isAvailable: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    currentLat: 12.9650,
    currentLng: 77.5890
  }
];

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'SWIGGY50',
    discountType: 'PERCENT',
    value: 50,
    minSubtotal: 199,
    description: '50% OFF on your order (max ₹100 discount)'
  },
  {
    code: 'SAVE20',
    discountType: 'PERCENT',
    value: 20,
    minSubtotal: 149,
    description: '20% OFF on subtotal above ₹149'
  },
  {
    code: 'FREEDEL',
    discountType: 'FLAT',
    value: 35,
    minSubtotal: 199,
    description: 'Free delivery (₹35 off delivery fee)'
  },
  {
    code: 'DASFOOD100',
    discountType: 'FLAT',
    value: 100,
    minSubtotal: 299,
    description: 'Data Alcott Systems Special ₹100 Flat discount'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-7819',
    userId: 'usr-101',
    userName: 'John Doe',
    userPhone: '+91 98765 12345',
    restaurantId: 'rest-1',
    restaurantName: 'Spicy Tandoor India',
    restaurantAddress: '45 Spice Route Ave, Food Plaza',
    restaurantPhone: '+91 98765 23456',
    restaurantImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    items: [
      {
        id: 'oi-1',
        menuItemId: 'menu-101',
        name: 'Chicken Tikka Masala',
        price: 299,
        quantity: 1,
        subtotal: 299,
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'oi-2',
        menuItemId: 'menu-104',
        name: 'Garlic Butter Naan (2 pcs)',
        price: 69,
        quantity: 2,
        subtotal: 138,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 437,
    deliveryFee: 35,
    tax: 22,
    discount: 50,
    totalAmount: 444,
    status: 'OUT_FOR_DELIVERY',
    deliveryAddress: 'Apt 4B, 124 Park View Ave, Tech District',
    paymentMethod: 'RAZORPAY_SIM',
    paymentStatus: 'PAID',
    createdAt: new Date(Date.now() - 18 * 60000).toISOString(), // 18 mins ago
    estimatedDeliveryTime: '12 min',
    deliveryPersonId: 'driver-1',
    deliveryPersonName: 'Rajesh Kumar',
    deliveryPersonPhone: '+91 98765 01234',
    deliveryPersonAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    driverLat: 12.9740,
    driverLng: 77.5980,
    driverEtaMinutes: 8,
    specialNotes: 'Ring bell twice upon arrival please!'
  },
  {
    id: 'ORD-7820',
    userId: 'usr-101',
    userName: 'John Doe',
    userPhone: '+91 98765 12345',
    restaurantId: 'rest-2',
    restaurantName: 'Bella Italia Trattoria',
    restaurantAddress: '12 Via Roma Way, Culinary District',
    restaurantPhone: '+91 98765 87654',
    restaurantImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    items: [
      {
        id: 'oi-3',
        menuItemId: 'menu-201',
        name: 'Truffle Mushroom Fettuccine',
        price: 349,
        quantity: 1,
        subtotal: 349,
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281292?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'oi-4',
        menuItemId: 'menu-203',
        name: 'Classic Tiramisu',
        price: 189,
        quantity: 1,
        subtotal: 189,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 538,
    deliveryFee: 25,
    tax: 27,
    discount: 0,
    totalAmount: 590,
    status: 'DELIVERED',
    deliveryAddress: 'Apt 4B, 124 Park View Ave, Tech District',
    paymentMethod: 'UPI_GPAY',
    paymentStatus: 'PAID',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
    estimatedDeliveryTime: 'Delivered',
    deliveryPersonId: 'driver-2',
    deliveryPersonName: 'Alex Rivera'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    restaurantId: 'rest-1',
    userName: 'Anita Sharma',
    rating: 5,
    comment: 'The Butter Chicken and Garlic Naan were warm, fresh and incredibly flavorful! Super fast delivery.',
    createdAt: 'Yesterday'
  },
  {
    id: 'rev-2',
    restaurantId: 'rest-1',
    userName: 'Michael B.',
    rating: 5,
    comment: 'Biryani was authentic with fragrant basmati and rich spices. Best Indian food in town.',
    createdAt: '3 days ago'
  }
];

export const INTERNSHIP_TASK_DATA = {
  taskId: 'JV-EC-002',
  studentCode: 'DAS-JV-002',
  domain: 'E-Commerce Food Delivery',
  company: 'Data Alcott Systems',
  website: 'www.dataalcott.com',
  internshipPortal: 'www.freeinternships.in',
  taskName: 'Food Delivery Application',
  industry: 'Food & Restaurant Technology',
  techStack: ['Spring Boot 3.x', 'Hibernate / JPA', 'MySQL 8', 'Spring Security', 'Thymeleaf', 'Maven', 'REST API'],
  timeline: [
    { day: 'Day 1', title: 'Project Setup & Database Design', hours: 3, status: 'Completed' },
    { day: 'Day 2', title: 'Authentication & Security (Spring Security)', hours: 3, status: 'Completed' },
    { day: 'Day 3', title: 'Restaurant & Menu Management', hours: 3, status: 'Completed' },
    { day: 'Day 4', title: 'Shopping Cart & Session State', hours: 3, status: 'Completed' },
    { day: 'Day 5', title: 'Order Processing & Checkout', hours: 3, status: 'Completed' },
    { day: 'Day 6', title: 'Delivery Assignment & Real-time Tracking', hours: 3, status: 'Completed' },
    { day: 'Day 7', title: 'Testing, Admin Analytics & Submission', hours: 4, status: 'Completed' }
  ],
  dbTables: [
    { name: 'users', desc: 'User account details, roles, auth credentials, addresses' },
    { name: 'restaurants', desc: 'Restaurant listings, ratings, phone, address, cuisine' },
    { name: 'menu_items', desc: 'Dishes, prices, categories, availability, images' },
    { name: 'cart_items', desc: 'User shopping carts, item quantities, customizations' },
    { name: 'orders', desc: 'Order transaction, subtotal, status, payment details' },
    { name: 'order_items', desc: 'Order line items, menu item references, price at order' },
    { name: 'delivery_persons', desc: 'Delivery driver profiles, vehicle types, availability' },
    { name: 'delivery_assignments', desc: 'Order assignments, assigned timestamps, delivery state' },
    { name: 'reviews', desc: 'Restaurant customer ratings and comments' }
  ]
};
