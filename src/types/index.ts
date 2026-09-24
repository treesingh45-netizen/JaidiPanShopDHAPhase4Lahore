export type OrderType = 'delivery' | 'pickup';

export type CategoryId =
  | 'fresh-juices'
  | 'jaidi-shakes'
  | 'ice-cream'
  | 'salads'
  | 'milkshakes'
  | 'ice-cream-shakes'
  | 'savories'
  | 'desserts'
  | 'gola-falooda'
  | 'jaidi-cocktails'
  | 'signature-smoothies'
  | 'soda'
  | 'tea-coffee'
  | 'slushes'
  | 'beverages';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  count: number;
  description: string;
  image: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  image: string;
  ingredients?: string[];
  isAvailable: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  isVegetarian?: boolean;
  isNew?: boolean;
  calories?: string;
  availableSizes?: { name: string; extraPrice: number }[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedSize?: string;
  sugarLevel?: 'Regular' | 'Less Sugar' | 'No Sugar';
  iceLevel?: 'Normal Ice' | 'Less Ice' | 'No Ice';
  specialInstructions?: string;
}

export interface CustomerLocation {
  city: string;
  area: string;
  address: string;
  houseOrShop: string;
  street: string;
  instructions: string;
}

export interface CustomerProfile {
  name: string;
  phone: string;
  email: string;
}

export interface TeamMember {
  id: string;
  roleNumber: string;
  role: string;
  name: string;
  bio: string;
  image: string;
  specialty: string;
}

export type PageId = 'home' | 'menu' | 'category' | 'about' | 'contact';
