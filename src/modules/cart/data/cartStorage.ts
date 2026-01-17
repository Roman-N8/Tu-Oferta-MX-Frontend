import type { CartState } from "../domain/types";

const KEY = "tuoferta_cart_v1";

export function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!parsed?.items || !Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

export function saveCart(state: CartState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function clearCartStorage() {
  localStorage.removeItem(KEY);
}
