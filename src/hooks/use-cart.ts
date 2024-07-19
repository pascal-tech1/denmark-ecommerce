import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  imageUrl: string;
  blurImage: string;
  title: string;
  price: number;
  quantity: number;
  _id: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (_id: string) => void;
  updateQuantity: (_id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      cartItems: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find((i) => i._id === item._id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((i) =>
                i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
              )
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...item, quantity: 1 }]
            };
          }
        }),
      removeFromCart: (_id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item._id !== _id)
        })),
      updateQuantity: (_id, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item._id === _id ? { ...item, quantity } : item
          )
        })),
      clearCart: () =>
        set(() => ({
          cartItems: []
        }))
    }),
    {
      name: "cartItems",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
