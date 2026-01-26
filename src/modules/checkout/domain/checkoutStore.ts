import React, { createContext, useContext, useMemo, useReducer } from "react";
import type { CheckoutState, ShippingAddress, PaymentMethod } from "./types";

type Actions =
  | { type: "SET_SHIPPING"; payload: ShippingAddress }
  | { type: "SET_PAYMENT"; payload: PaymentMethod }
  | { type: "CLEAR" };

function reducer(state: CheckoutState, action: Actions): CheckoutState {
  switch (action.type) {
    case "SET_SHIPPING":
      return { ...state, shipping: action.payload };
    case "SET_PAYMENT":
      return { ...state, payment: action.payload };
    case "CLEAR":
      return {};
    default:
      return state;
  }
}

type Ctx = {
  state: CheckoutState;
  setShipping: (s: ShippingAddress) => void;
  setPayment: (p: PaymentMethod) => void;
  clear: () => void;
};

const CheckoutContext = createContext<Ctx | null>(null);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {});

  const value = useMemo<Ctx>(
    () => ({
      state,
      setShipping: (s) => dispatch({ type: "SET_SHIPPING", payload: s }),
      setPayment: (p) => dispatch({ type: "SET_PAYMENT", payload: p }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state]
  );

  return React.createElement(CheckoutContext.Provider, { value }, children);
}

export function useCheckoutContext() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckoutContext must be used within CheckoutProvider");
  return ctx;
}
