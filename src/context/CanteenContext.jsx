import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MENU_ITEMS, PEAK_HOURS_INFO, MOCK_EXISTING_ORDERS } from '../data/canteenData';

const CanteenContext = createContext();

export const CanteenProvider = ({ children }) => {
  // App View Mode: 'student' | 'kitchen' | 'counter'
  const [viewMode, setViewMode] = useState('student');
  
  // Menu Data
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('campusbite_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  // Selected Category
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);

  // Cart State
  const [cart, setCart] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('7:30 PM');
  const [orderType, setOrderType] = useState('SCHEDULED'); // 'NOW' | 'SCHEDULED'
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active Orders List
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('campusbite_orders');
    return saved ? JSON.parse(saved) : MOCK_EXISTING_ORDERS;
  });

  // Active Selected Token for Modal View
  const [activeTokenOrder, setActiveTokenOrder] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('campusbite_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('campusbite_orders', JSON.stringify(orders));
  }, [orders]);

  // Add Item to Cart
  const addToCart = (item) => {
    if (item.stockLeft <= 0) return;

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  // Remove / Decrement Item
  const removeFromCart = (itemId) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === itemId);
      if (existing.qty > 1) {
        return prev.map(i => i.id === itemId ? { ...i, qty: i.qty - 1 } : i);
      }
      return prev.filter(i => i.id !== itemId);
    });
  };

  // Clear Cart
  const clearCart = () => setCart([]);

  // Compute Cart Totals
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const packagingFee = cart.length > 0 ? 5 : 0;
  const platformFee = cart.length > 0 ? 2 : 0;
  const cartTotal = cartSubtotal + packagingFee + platformFee;

  // Place Order & Create Token
  const placeOrder = (paymentApp = 'Google Pay') => {
    if (cart.length === 0) return null;

    const random4DigitOTP = Math.floor(1000 + Math.random() * 9000).toString();
    const orderIdNum = Math.floor(8000 + Math.random() * 1999);
    const newOrderId = `CB-${orderIdNum}`;

    const newOrder = {
      orderId: newOrderId,
      timestamp: `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Today`,
      slotTime: orderType === 'NOW' ? 'Immediate (~10 mins)' : selectedTimeSlot,
      status: 'KITCHEN_PREPARING',
      items: [...cart],
      totalAmount: cartTotal,
      paymentMethod: `UPI (${paymentApp})`,
      transactionRef: `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      otp: random4DigitOTP,
      qrData: `CAMPUSBITE-ORD-${orderIdNum}-${selectedTimeSlot}`,
      counterNo: 'Counter 2 (Express Token Pickup)'
    };

    // Deduct stock
    setMenuItems(prev => prev.map(item => {
      const inCart = cart.find(c => c.id === item.id);
      if (inCart) {
        return { ...item, stockLeft: Math.max(0, item.stockLeft - inCart.qty) };
      }
      return item;
    }));

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    setActiveTokenOrder(newOrder);

    return newOrder;
  };

  // Kitchen Status Update
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
  };

  // OTP / QR Code Verification at Counter Kiosk
  const verifyCounterToken = (otpOrQr) => {
    const matched = orders.find(o => o.otp === otpOrQr || o.qrData === otpOrQr || o.orderId === otpOrQr);
    if (matched) {
      updateOrderStatus(matched.orderId, 'COMPLETED');
      return { success: true, order: matched };
    }
    return { success: false, message: 'Invalid OTP or QR Token Code!' };
  };

  // Toggle Item Availability (Kitchen Staff)
  const toggleStockStatus = (itemId) => {
    setMenuItems(prev => prev.map(i => {
      if (i.id === itemId) {
        const isOutOfStock = i.stockLeft === 0;
        return {
          ...i,
          stockLeft: isOutOfStock ? i.totalStock : 0
        };
      }
      return i;
    }));
  };

  return (
    <CanteenContext.Provider
      value={{
        viewMode,
        setViewMode,
        menuItems,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        vegOnlyFilter,
        setVegOnlyFilter,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        selectedTimeSlot,
        setSelectedTimeSlot,
        orderType,
        setOrderType,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        packagingFee,
        platformFee,
        cartTotal,
        placeOrder,
        orders,
        updateOrderStatus,
        verifyCounterToken,
        toggleStockStatus,
        activeTokenOrder,
        setActiveTokenOrder,
        peakHoursInfo: PEAK_HOURS_INFO
      }}
    >
      {children}
    </CanteenContext.Provider>
  );
};

export const useCanteen = () => {
  const context = useContext(CanteenContext);
  if (!context) throw new Error('useCanteen must be used within a CanteenProvider');
  return context;
};
