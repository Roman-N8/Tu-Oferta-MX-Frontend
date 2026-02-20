export type WishlistItem = {
  productId: string | number;
  title: string;
  brand: string;
  imageUrl: string;
  price: number;
};

export type WishlistState = {
  items: WishlistItem[];
};