import type { WishlistState } from "../domain/types";

const KEY = "tuoferta_wishlist_v1";

export function loadWishlist(): WishlistState {
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

export function saveWishlist(state: WishlistState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function clearWishlistStorage() {
  localStorage.removeItem(KEY);
}