import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  addToCart: (data: { productId: string; quantity: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === product.id);
          let newItems: CartItem[];

          if (existingItem) {
            newItems = state.items.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            newItems = [
              ...state.items,
              { id: `cart-${Date.now()}`, productId: product.id, product, quantity: 1 },
            ];
          }

          const totalItems = newItems.reduce((sum: number, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum: number, item) => sum + item.product.price * item.quantity,
            0
          );

          return { items: newItems, totalItems, totalPrice };
        }),

      addToCart: ({ productId, quantity }: { productId: string; quantity: number }) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === productId);
          let newItems: CartItem[];

          if (existingItem) {
            newItems = state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            const product = state.items.find((item) => item.productId === productId)?.product;
            if (product) {
              newItems = [
                ...state.items,
                { id: `cart-${Date.now()}`, productId, product, quantity },
              ];
            } else {
              return state;
            }
          }

          const totalItems = newItems.reduce((sum: number, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum: number, item) => sum + item.product.price * item.quantity,
            0
          );

          return { items: newItems, totalItems, totalPrice };
        }),

      removeItem: (id: string) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          const totalItems = newItems.reduce((sum: number, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum: number, item) => sum + item.product.price * item.quantity,
            0
          );
          return { items: newItems, totalItems, totalPrice };
        }),

      updateQuantity: (id: string, quantity: number) =>
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((item) => item.id !== id);
            const totalItems = newItems.reduce((sum: number, item) => sum + item.quantity, 0);
            const totalPrice = newItems.reduce(
              (sum: number, item) => sum + item.product.price * item.quantity,
              0
            );
            return { items: newItems, totalItems, totalPrice };
          }

          const newItems = state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          const totalItems = newItems.reduce((sum: number, item) => sum + item.quantity, 0);
          const totalPrice = newItems.reduce(
            (sum: number, item) => sum + item.product.price * item.quantity,
            0
          );
          return { items: newItems, totalItems, totalPrice };
        }),

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);