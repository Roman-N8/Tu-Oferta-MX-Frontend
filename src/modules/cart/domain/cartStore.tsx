import React, { createContext, useContext, useMemo, useReducer } from "react";
import type { CartItem, CartState } from "./types";
import { loadCart, saveCart } from "../data/cartStorage";

type CartActions =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; productId: CartItem["productId"] }
  | { type: "SET_QTY"; productId: CartItem["productId"]; quantity: number }
  | { type: "CLEAR" };

function reducer(state: CartState, action: CartActions): CartState {
  switch (action.type) {
    case "ADD": {
      const p = action.payload;
      const existing = state.items.find((i) => String(i.productId) === String(p.productId));
      if (existing) {
        // suma cantidad sin pasar stock si existe
        const max = typeof existing.stock === "number" ? existing.stock : Infinity;
        const nextQty = Math.min(existing.quantity + p.quantity, max);
        return {
          items: state.items.map((i) =>
            String(i.productId) === String(p.productId) ? { ...i, quantity: nextQty } : i
          ),
        };
      }
      return { items: [...state.items, p] };
    }

    case "REMOVE":
      return { items: state.items.filter((i) => String(i.productId) !== String(action.productId)) };

    case "SET_QTY": {
      const qty = Math.max(1, Math.floor(action.quantity || 1));
      return {
        items: state.items.map((i) => {
          if (String(i.productId) !== String(action.productId)) return i;
          const max = typeof i.stock === "number" ? i.stock : Infinity;
          return { ...i, quantity: Math.min(qty, max) };
        }),
      };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

type CartContextValue = {
  state: CartState;
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (productId: CartItem["productId"]) => void;
  setQty: (productId: CartItem["productId"], quantity: number) => void;
  clear: () => void;

  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadCart());

  // persist
  React.useEffect(() => {
    saveCart(state);
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0);

    return {
      state,
      addItem: (item, qty = 1) => dispatch({ type: "ADD", payload: { ...item, quantity: qty } }),
      removeItem: (productId) => dispatch({ type: "REMOVE", productId }),
      setQty: (productId, quantity) => dispatch({ type: "SET_QTY", productId, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
      totalItems,
      subtotal,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used inside CartProvider");
  return ctx;
}
