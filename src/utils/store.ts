import { ActionType, CartType } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
}

export const useCartStore = create(persist<CartType & ActionType>((set, get) => ({
  products: INITIAL_STATE.products,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,
  addToCart(item) {
    const products = get().products
    const productInState = products.find(product => product.id === item.id);
    if (productInState) {
      const updatedProducts = products.map((product) =>
        product.id === productInState.id
          ? {
            ...item,
            quantity: product.quantity + item.quantity,
            price: product.price + item.price,
          }
          : item
      );
      set((state) => ({
        products: updatedProducts,
        totalItems: state.totalItems + item.quantity,
        // totalItems:0,
        totalPrice: state.totalPrice + item.price,
      }))
      console.log(updatedProducts);


    } else {
      set((state) => ({
        products: [...state.products, item],
        totalItems: state.totalItems + item.quantity,
        totalPrice: state.totalPrice + item.price,

      }))
    }
  },
  removeFromCart(item) {
    set((state) => ({
      products: state.products.filter((product) => product.id !== item.id),
      totalItems:state.totalItems-item.quantity,
      totalPrice:state.totalPrice-item.price,
      // totalItems: 0,
      // totalPrice: 0,
    }))

  }
}), { name: "cart-storage" }));
