import type { CatalogSearchParams, CatalogSearchResult, Product } from "../domain/types";
import { PRODUCTS } from "../domain/mock/products.mock";

function includesLoose(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase());
}

export const catalogRepository = {
  async getById(productId: string | number) {
  await new Promise((r) => setTimeout(r, 200));
  const found = PRODUCTS.find((p) => String(p.id) === String(productId));
  if (!found) throw new Error("Producto no encontrado");
  return found;
},

  async search(params: CatalogSearchParams): Promise<CatalogSearchResult> {
    await new Promise((r) => setTimeout(r, 250));

    let items: Product[] = [...PRODUCTS];

    // q
    if (params.q?.trim()) {
      items = items.filter((p) => includesLoose(p.title, params.q!));
    }

    // category
    if (params.filters.categoryId) {
      items = items.filter((p) => p.categoryId === params.filters.categoryId);
    }

    // rating min
    if (params.filters.ratingMin) {
      items = items.filter((p) => (p.rating ?? 0) >= params.filters.ratingMin!);
    }

    // price range
    if (params.filters.priceMin !== undefined) {
      items = items.filter((p) => p.price >= params.filters.priceMin!);
    }
    if (params.filters.priceMax !== undefined) {
      items = items.filter((p) => p.price <= params.filters.priceMax!);
    }

    // sort
    switch (params.sort) {
      case "price_asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        items.sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
        items.sort((a, b) => Number(String(b.id).slice(1)) - Number(String(a.id).slice(1)));
        break;
      default:
        
        break;
    }

    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / params.pageSize));
    const page = Math.min(Math.max(1, params.page), totalPages);

    const start = (page - 1) * params.pageSize;
    const paged = items.slice(start, start + params.pageSize);

    return {
      items: paged,
      total,
      page,
      pageSize: params.pageSize,
      totalPages,
    };
  },
};
