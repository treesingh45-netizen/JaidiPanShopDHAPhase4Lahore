import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CategoryId,
  CartItem,
  CustomerLocation,
  CustomerProfile,
  MenuItem,
  OrderType,
  PageId,
} from '../types';
import { INITIAL_MENU_ITEMS } from '../data/menuData';

interface StoreContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  location: CustomerLocation;
  setLocation: React.Dispatch<React.SetStateAction<CustomerLocation>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (cat: CategoryId | 'all') => void;
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    quantity?: number,
    customOptions?: {
      size?: string;
      sugar?: 'Regular' | 'Less Sugar' | 'No Sugar';
      ice?: 'Normal Ice' | 'Less Ice' | 'No Ice';
      instructions?: string;
    }
  ) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isBagDrawerOpen: boolean;
  setIsBagDrawerOpen: (open: boolean) => void;
  isOrderReviewOpen: boolean;
  setIsOrderReviewOpen: (open: boolean) => void;
  isOrderConfirmed: boolean;
  setIsOrderConfirmed: (confirmed: boolean) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  customerProfile: CustomerProfile;
  setCustomerProfile: React.Dispatch<React.SetStateAction<CustomerProfile>>;
  activeDetailItem: MenuItem | null;
  setActiveDetailItem: (item: MenuItem | null) => void;
  toastMessage: string | null;
  menuItems: MenuItem[];
  updateMenuItem: (item: MenuItem) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  generateWhatsAppUrl: () => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [location, setLocation] = useState<CustomerLocation>(() => {
    const saved = localStorage.getItem('jaidi_location');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      city: 'Lahore',
      area: 'DHA Phase 4',
      address: 'DHA Phase 4, Sector CCA, Lahore',
      houseOrShop: '',
      street: '',
      instructions: '',
    };
  });

  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>(() => {
    const saved = localStorage.getItem('jaidi_customer_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      name: '',
      phone: '',
      email: '',
    };
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('jaidi_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('jaidi_menu_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_MENU_ITEMS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [isBagDrawerOpen, setIsBagDrawerOpen] = useState(false);
  const [isOrderReviewOpen, setIsOrderReviewOpen] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [activeDetailItem, setActiveDetailItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('jaidi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('jaidi_location', JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem('jaidi_customer_profile', JSON.stringify(customerProfile));
  }, [customerProfile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    customOptions?: {
      size?: string;
      sugar?: 'Regular' | 'Less Sugar' | 'No Sugar';
      ice?: 'Normal Ice' | 'Less Ice' | 'No Ice';
      instructions?: string;
    }
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.item.id === item.id &&
          ci.selectedSize === customOptions?.size &&
          ci.sugarLevel === customOptions?.sugar &&
          ci.iceLevel === customOptions?.ice
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          item,
          quantity,
          selectedSize: customOptions?.size,
          sugarLevel: customOptions?.sugar || 'Regular',
          iceLevel: customOptions?.ice || 'Normal Ice',
          specialInstructions: customOptions?.instructions || '',
        },
      ];
    });

    showToast(`Added ${item.name} to Bag`);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateMenuItem = (updated: MenuItem) => {
    setMenuItems((prev) => {
      const next = prev.map((item) => (item.id === updated.id ? updated : item));
      localStorage.setItem('jaidi_menu_items', JSON.stringify(next));
      return next;
    });
    showToast('Menu item updated successfully');
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const subtotal = cart.reduce((acc, curr) => {
    return acc + curr.item.price * curr.quantity;
  }, 0);

  const deliveryFee = orderType === 'delivery' && cart.length > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  const generateWhatsAppUrl = (): string => {
    const brandPhone = '923014002475';
    const customerName = customerProfile.name.trim() || 'Valued Customer';
    const customerPhone = customerProfile.phone.trim() || 'Not specified';

    let addressBlock = '';
    if (orderType === 'delivery') {
      const parts = [
        location.houseOrShop ? `House/Shop: ${location.houseOrShop}` : '',
        location.street ? `Street: ${location.street}` : '',
        location.area ? `Area: ${location.area}` : 'DHA Phase 4',
        location.city ? `City: ${location.city}` : 'Lahore',
        location.instructions ? `Note: ${location.instructions}` : '',
      ].filter(Boolean);
      addressBlock = `Delivery Address:\n${parts.join(', ')}`;
    } else {
      addressBlock = `Pick-Up Location:\nJaidi Pan Shop — DHA Phase 4, Sector CCA, Lahore`;
    }

    const itemsText = cart
      .map((ci) => {
        let details = '';
        if (ci.selectedSize) details += ` [${ci.selectedSize}]`;
        if (ci.sugarLevel && ci.sugarLevel !== 'Regular') details += ` (${ci.sugarLevel})`;
        if (ci.iceLevel && ci.iceLevel !== 'Normal Ice') details += ` (${ci.iceLevel})`;
        return `${ci.quantity} × ${ci.item.name}${details} — Rs. ${ci.item.price * ci.quantity}`;
      })
      .join('\n');

    const message = `*NEW JAIDI PAN SHOP ORDER*

*Customer Name:* ${customerName}
*Phone:* ${customerPhone}

*Order Type:* ${orderType === 'delivery' ? 'Delivery' : 'Pick-Up'}

${addressBlock}

---
${itemsText}
---

*Subtotal:* Rs. ${subtotal.toLocaleString()}
*Delivery:* Rs. ${deliveryFee.toLocaleString()}
*Total:* Rs. ${total.toLocaleString()}

${location.instructions ? `*Customer Notes:*\n${location.instructions}\n` : ''}
Please confirm my order.`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${brandPhone}?text=${encoded}`;
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        orderType,
        setOrderType,
        location,
        setLocation,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        total,
        isBagDrawerOpen,
        setIsBagDrawerOpen,
        isOrderReviewOpen,
        setIsOrderReviewOpen,
        isOrderConfirmed,
        setIsOrderConfirmed,
        isAccountModalOpen,
        setIsAccountModalOpen,
        customerProfile,
        setCustomerProfile,
        activeDetailItem,
        setActiveDetailItem,
        toastMessage,
        menuItems,
        updateMenuItem,
        isAdminModalOpen,
        setIsAdminModalOpen,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
