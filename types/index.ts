// Lego Theme Types
export interface LegoTheme {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  icon: string;
}

// Product Types
export interface Product {
  id: string;
  setName: string;
  setNumber: string;
  theme: string;
  subTheme: string;
  description: string;
  price: number;
  originalPrice?: number;
  pieces: number;
  minifigures: number;
  releaseYear: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm';
  };
  weight: number; // in grams
  condition: ProductCondition;
  boxCondition?: BoxCondition;
  images: string[];
  stock: number;
  isFeatured: boolean;
  isRare: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductCondition = 'new' | 'used' | 'rare';
export type BoxCondition = 'MISB' | 'BIB' | 'loose' | 'no-box';

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingInfo: ShippingInfo;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'expired';
export type PaymentMethod = 'va_bca' | 'va_mandiri' | 'va_bni' | 'va_bri' | 'gopay' | 'ovo' | 'shopeepay' | 'dana' | 'credit_card';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'expired';

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface ShippingInfo {
  courier: string;
  service: string;
  estimatedDays: string;
  weight: number;
}

// Shipping Types
export interface ShippingOption {
  courier: string;
  service: string;
  cost: number;
  estimatedDays: string;
}

export interface ShippingRequest {
  origin: string;
  destination: string;
  weight: number;
  couriers: string[];
}

// Admin Dashboard Types
export interface DashboardStats {
  totalVisitors: number;
  uniqueVisitors: number;
  totalOrders: number;
  totalRevenue: number;
  grossProfit: number;
  netProfit: number;
  conversionRate: number;
  averageOrderValue: number;
  topProducts: ProductStats[];
  recentOrders: Order[];
}

export interface ProductStats {
  product: Product;
  views: number;
  cartAdds: number;
  purchases: number;
  revenue: number;
}

// i18n Types
export type Language = 'id' | 'en';

export interface Translation {
  nav: {
    home: string;
    catalog: string;
    themes: string;
    cart: string;
    admin: string;
  };
  common: {
    search: string;
    filter: string;
    sort: string;
    price: string;
    addToCart: string;
    buyNow: string;
    outOfStock: string;
    inStock: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    view: string;
    back: string;
    next: string;
    previous: string;
  };
  product: {
    setNumber: string;
    pieces: string;
    minifigures: string;
    releaseYear: string;
    dimensions: string;
    weight: string;
    condition: string;
    boxCondition: string;
    description: string;
    relatedProducts: string;
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    shipping: string;
    total: string;
    checkout: string;
    continueShopping: string;
  };
  checkout: {
    title: string;
    customerInfo: string;
    shippingAddress: string;
    shippingMethod: string;
    paymentMethod: string;
    orderSummary: string;
    placeOrder: string;
  };
  order: {
    title: string;
    orderNumber: string;
    date: string;
    status: string;
    items: string;
    total: string;
    trackOrder: string;
  };
  admin: {
    dashboard: string;
    products: string;
    orders: string;
    customers: string;
    analytics: string;
    settings: string;
    addProduct: string;
    editProduct: string;
    deleteProduct: string;
  };
}