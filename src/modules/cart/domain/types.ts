export type CartItem = {
  productId: string | number;
  title: string;
  brand: string;
  imageUrl: string;
  price: number;
  quantity: number;
  stock?: number;
};

export type CartState = {
  items: CartItem[];
};
