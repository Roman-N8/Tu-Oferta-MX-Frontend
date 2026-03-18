import type { Order } from "../domain/order.types";

const KEY = "tuoferta_orders_v1";

type OrdersState = { orders: Order[] };

export function loadOrders(): OrdersState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { orders: [] };
    return JSON.parse(raw);
  } catch {
    return { orders: [] };
  }
}

export function saveOrders(state: OrdersState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}