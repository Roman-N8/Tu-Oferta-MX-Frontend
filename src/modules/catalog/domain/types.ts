export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string | number;
  title: string;
  brand: string;
  imageUrl: string;
  images?: string[];       
  rating: number;
  reviewsCount: number;
  price: number;
  oldPrice?: number;
  categoryId: string;

  description?: string;     
  specs?: ProductSpec[];    
  stock?: number;           
};

export type Category = {
  id: string;
  name: string;
};

export type SortKey = "relevance" | "price_asc" | "price_desc" | "rating_desc" | "newest";
export type ViewMode = "grid" | "list";

export type SearchFilters = {
  categoryId?: string;
  ratingMin?: number;       // 1..5
  priceMin?: number;
  priceMax?: number;
};

export type CatalogSearchParams = {
  q?: string;
  filters: SearchFilters;
  sort: SortKey;
  page: number;
  pageSize: number;
};

export type CatalogSearchResult = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
