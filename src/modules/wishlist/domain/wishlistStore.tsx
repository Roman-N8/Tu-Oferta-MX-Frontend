import React, { createContext, useContext, useMemo, useReducer } from "react";
import type { WishlistItem, WishlistState } from "./types";
import { loadWishlist, saveWishlist } from "../data/wishlistStorage";

type Actions =
  | { type: "TOGGLE"; payload: WishlistItem }
  | { type: "REMOVE"; productId: WishlistItem["productId"] }
  | { type: "CLEAR" };

function reducer(state: WishlistState, action: Actions): WishlistState {
  switch (action.type) {
    case "TOGGLE": {
      const p = action.payload;
      const exists = state.items.some((i) => String(i.productId) === String(p.productId));
      if (exists) {
        return { items: state.items.filter((i) => String(i.productId) !== String(p.productId)) };
      }
      return { items: [p, ...state.items] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => String(i.productId) !== String(action.productId)) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type Ctx = {
  state: WishlistState;
  toggle: (item: WishlistItem) => void;
  remove: (productId: WishlistItem["productId"]) => void;
  clear: () => void;
  count: number;
  has: (productId: WishlistItem["productId"]) => boolean;
};

const WishlistContext = createContext<Ctx | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadWishlist());

  React.useEffect(() => {
    saveWishlist(state);
  }, [state]);

  const value = useMemo<Ctx>(() => {
    const count = state.items.length;

    return {
      state,
      toggle: (item) => dispatch({ type: "TOGGLE", payload: item }),
      remove: (productId) => dispatch({ type: "REMOVE", productId }),
      clear: () => dispatch({ type: "CLEAR" }),
      count,
      has: (productId) => state.items.some((i) => String(i.productId) === String(productId)),
    };
  }, [state]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlistContext() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlistContext must be used within WishlistProvider");
  return ctx;
}