import { useMemo, useState } from "react";
import { ProductCard, type ProductCardProps } from "./productCard";

type ProductCarouselSectionProps<T extends ProductCardProps = ProductCardProps> = {
  title: string;
  products: T[];
  categories?: string[];
  showAllTab?: boolean;
  getProductCategory?: (p: T) => string;

  onOpenProduct?: (p: T) => void;
  onAddToCart?: (p: T) => void;
};

export function ProductCarouselSection<T extends ProductCardProps = ProductCardProps>({
  title,
  products,
  categories,
  showAllTab = false,
  getProductCategory,
  onOpenProduct,
  onAddToCart,
}: ProductCarouselSectionProps<T>) {
  const [activeCat, setActiveCat] = useState<string>(showAllTab ? "Todo" : (categories?.[0] ?? "Todo"));

  const filtered = useMemo(() => {
    if (!categories?.length || !getProductCategory) return products;
    if (showAllTab && activeCat === "Todo") return products;
    return products.filter((p) => getProductCategory(p) === activeCat);
  }, [products, categories, getProductCategory, activeCat, showAllTab]);

  return (
    <section className="bg-[#F5F7FA] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#011C40]">{title}</h2>
        </div>

        {/* Tabs (si aplica) */}
        {categories?.length ? (
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
            {showAllTab && (
              <button
                type="button"
                onClick={() => setActiveCat("Todo")}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold border transition ${
                  activeCat === "Todo"
                    ? "bg-[#011C40] text-white border-[#011C40]"
                    : "bg-white text-[#011C40] border-slate-200 hover:bg-slate-50"
                }`}
              >
                Todo
              </button>
            )}

            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold border transition ${
                  activeCat === c
                    ? "bg-[#011C40] text-white border-[#011C40]"
                    : "bg-white text-[#011C40] border-slate-200 hover:bg-slate-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        ) : null}

        {/* Carousel */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {filtered.map((p) => (
            <div key={String(p.id)} className="shrink-0">
              <ProductCard
                {...p}
                onOpen={onOpenProduct ? () => onOpenProduct(p) : undefined}
                onAddToCart={onAddToCart ? () => onAddToCart(p) : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
