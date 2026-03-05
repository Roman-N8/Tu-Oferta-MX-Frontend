export type OrderStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  productId: string;
  title: string;
  imageUrl: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  number: string;
  date: string;
  total: number;
  status: OrderStatus;
  customerEmail: string;
  trackingCode?: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
};

export type ShippingAddress = {
  fullName: string;
  addressLine: string;
  city: string;
  postalCode: string;
  country: string;
};

export type PaymentInfo = {
  method: string;
  last4?: string;
};