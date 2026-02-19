export type ProviderContact = {
  phone?: string;
  email?: string;
  whatsapp?: string;
  website?: string;
  address?: string;
};

export type ProviderSectionType = "products" | "about" | "policies" | "reviews";

export type ProviderSection = {
  id: string;
  label: string;
  type: ProviderSectionType;
};

export type ProviderProfile = {
  id: string | number;
  name: string;
  rating: number;
  description: string;
  coverImageUrl: string;
  avatarImageUrl: string;
  location?: string;
  contact: ProviderContact;
  sections: ProviderSection[];

  // opcional: productos “del proveedor” (mock por ahora)
  productIds?: Array<string | number>;
};
