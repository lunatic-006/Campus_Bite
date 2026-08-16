export const INITIAL_MENU_ITEMS = [
  {
    id: 'item-1',
    name: 'Special Masala Dosa',
    category: 'South Indian',
    price: 65,
    originalPrice: 80,
    rating: 4.8,
    reviewsCount: 340,
    prepTimeMinutes: 8,
    calories: 320,
    isVeg: true,
    isJain: false,
    stockLeft: 12,
    totalStock: 50,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
    description: 'Crispy golden crepe filled with spiced potato masala, served with coconut chutney & hot sambar.',
    popular: true,
    availableSlots: ['7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM']
  },
  {
    id: 'item-2',
    name: 'Paneer Butter Masala Thali',
    category: 'North Indian',
    price: 110,
    originalPrice: 130,
    rating: 4.9,
    reviewsCount: 512,
    prepTimeMinutes: 12,
    calories: 650,
    isVeg: true,
    isJain: false,
    stockLeft: 5, // Low stock indicator
    totalStock: 40,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    description: 'Rich cottage cheese gravy, 3 Butter Phulkas, Jeera Rice, Dal Tadka, Salad & Gulab Jamun.',
    popular: true,
    availableSlots: ['7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM']
  },
  {
    id: 'item-3',
    name: 'Samosa Pav (Set of 2)',
    category: 'Quick Snacks',
    price: 35,
    originalPrice: 40,
    rating: 4.6,
    reviewsCount: 210,
    prepTimeMinutes: 3,
    calories: 280,
    isVeg: true,
    isJain: false,
    stockLeft: 24,
    totalStock: 80,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    description: 'Hot spiced potato samosas stuffed inside fresh pav with garlic chutney & fried green chilli.',
    popular: false,
    availableSlots: ['7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM']
  },
  {
    id: 'item-4',
    name: 'Delhi Style Chole Bhature',
    category: 'North Indian',
    price: 90,
    originalPrice: 100,
    rating: 4.7,
    reviewsCount: 420,
    prepTimeMinutes: 10,
    calories: 580,
    isVeg: true,
    isJain: false,
    stockLeft: 8,
    totalStock: 35,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    description: 'Two fluffy balloon bhatures paired with slow-cooked tangy chickpea curry and pickled onions.',
    popular: true,
    availableSlots: ['7:30 PM', '7:45 PM', '8:00 PM']
  },
  {
    id: 'item-5',
    name: 'Cold Coffee with Ice Cream',
    category: 'Beverages',
    price: 50,
    originalPrice: 60,
    rating: 4.9,
    reviewsCount: 890,
    prepTimeMinutes: 4,
    calories: 220,
    isVeg: true,
    isJain: true,
    stockLeft: 30,
    totalStock: 100,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    description: 'Thick blended espresso shake topped with a rich scoop of vanilla ice cream & chocolate drizzle.',
    popular: true,
    availableSlots: ['7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM']
  },
  {
    id: 'item-6',
    name: 'Veg Hakka Noodles',
    category: 'Chinese & Rolls',
    price: 75,
    originalPrice: 85,
    rating: 4.5,
    reviewsCount: 180,
    prepTimeMinutes: 7,
    calories: 410,
    isVeg: true,
    isJain: false,
    stockLeft: 0, // Out of stock indicator
    totalStock: 30,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    description: 'Wok-tossed noodles with shredded cabbage, capsicum, carrots, garlic, and schezwan kick.',
    popular: false,
    availableSlots: []
  },
  {
    id: 'item-7',
    name: 'Paneer Franky Roll',
    category: 'Chinese & Rolls',
    price: 60,
    originalPrice: 70,
    rating: 4.7,
    reviewsCount: 290,
    prepTimeMinutes: 6,
    calories: 360,
    isVeg: true,
    isJain: false,
    stockLeft: 18,
    totalStock: 45,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80',
    description: 'Grilled whole wheat wrap stuffed with spiced paneer cubes, onions, mint chutney, and chaat masala.',
    popular: true,
    availableSlots: ['7:00 PM', '7:15 PM', '7:30 PM', '7:45 PM', '8:00 PM']
  },
  {
    id: 'item-8',
    name: 'Hyderabadi Veg Dum Biryani',
    category: 'Special Meals',
    price: 120,
    originalPrice: 140,
    rating: 4.9,
    reviewsCount: 610,
    prepTimeMinutes: 10,
    calories: 520,
    isVeg: true,
    isJain: false,
    stockLeft: 6,
    totalStock: 30,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    description: 'Aromatic basmati rice dum-cooked with fresh vegetables, whole spices, saffron, served with spicy mirchi ka salan & raita.',
    popular: true,
    availableSlots: ['7:15 PM', '7:30 PM', '7:45 PM']
  }
];

export const CANTEEN_CATEGORIES = [
  'All Items',
  'Popular Right Now',
  'North Indian',
  'South Indian',
  'Quick Snacks',
  'Chinese & Rolls',
  'Beverages',
  'Special Meals'
];

export const PEAK_HOURS_INFO = {
  currentPeakStatus: 'HIGH_DEMAND', // 'LOW', 'MODERATE', 'HIGH_DEMAND'
  peakWindow: '7:00 PM - 8:00 PM (Dinner Rush)',
  estimatedWaitMinutes: 14,
  activeQueueCount: 42,
  kitchenLoadPercent: 78,
  timeSlots: [
    { time: '7:00 PM', label: '7:00 PM', load: 'Medium', loadPercent: 45, wait: '5 mins', available: true },
    { time: '7:15 PM', label: '7:15 PM', load: 'High', loadPercent: 82, wait: '12 mins', available: true },
    { time: '7:30 PM', label: '7:30 PM (Peak)', load: 'Critical Rush', loadPercent: 95, wait: '18 mins', available: true, warning: 'Kitchen at 95% capacity! Consider 7:45 PM slot.' },
    { time: '7:45 PM', label: '7:45 PM', load: 'Medium', loadPercent: 60, wait: '8 mins', available: true },
    { time: '8:00 PM', label: '8:00 PM', load: 'Low', loadPercent: 30, wait: '3 mins', available: true }
  ]
};

export const MOCK_UPI_APPS = [
  { id: 'gpay', name: 'Google Pay', icon: 'https://cdn-icons-png.flaticon.com/512/6124/6124998.png', color: 'bg-white text-slate-800 border-slate-200' },
  { id: 'phonepe', name: 'PhonePe', icon: 'https://cdn-icons-png.flaticon.com/512/825/825531.png', color: 'bg-purple-50 text-purple-900 border-purple-200' },
  { id: 'paytm', name: 'Paytm UPI', icon: 'https://cdn-icons-png.flaticon.com/512/825/825506.png', color: 'bg-sky-50 text-sky-900 border-sky-200' },
  { id: 'bhim', name: 'BHIM UPI', icon: 'https://cdn-icons-png.flaticon.com/512/825/825459.png', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' }
];

export const MOCK_EXISTING_ORDERS = [
  {
    orderId: 'CB-8942',
    timestamp: '7:12 PM Today',
    slotTime: '7:30 PM',
    status: 'KITCHEN_PREPARING', // 'PLACED', 'KITCHEN_PREPARING', 'READY_FOR_PICKUP', 'COMPLETED'
    items: [
      { name: 'Special Masala Dosa', qty: 1, price: 65 },
      { name: 'Cold Coffee with Ice Cream', qty: 1, price: 50 }
    ],
    totalAmount: 115,
    paymentMethod: 'UPI (Google Pay)',
    transactionRef: 'UPI/429108392104',
    otp: '4829',
    qrData: 'CAMPUSBITE-ORD-8942-730PM',
    counterNo: 'Counter 2 (Express Token Pickup)'
  }
];
