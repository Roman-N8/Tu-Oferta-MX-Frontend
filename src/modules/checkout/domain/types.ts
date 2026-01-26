export type ShippingAddress = {
  fullName: string;
  phone: string;
  email?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  notes?: string;
};

export type PaymentMethod = {
  type: "card" | "cash" | "transfer";
  cardLast4?: string;
  cardHolder?: string;
};

export type CheckoutState = {
  shipping?: ShippingAddress;
  payment?: PaymentMethod;
};
