import React, { useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { ProductCard, type ProductCardProps } from "./productCard";

export interface ProductCarouselSectionProps {
  title: string;
  products: ProductCardProps[];
  /**
   * Si se proporcionan categorías, se mostrarán tabs.
   * Cada producto debe tener un campo `category` en `extraData` o se puede
   * mapear externamente. Para simplificar, usamos un campo opcional aquí.
   */
  categories?: string[];
  getProductCategory?: (product: ProductCardProps) => string | undefined;
  /**
   * Si es true y hay categorías, el primer tab será "Todo".
   */
  showAllTab?: boolean;
}

export const ProductCarouselSection: React.FC<ProductCarouselSectionProps> = ({
  title,
  products,
  categories,
  getProductCategory,
  showAllTab = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | "ALL">(
    "ALL"
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  const hasCategories = categories && categories.length > 0;

  const visibleProducts = useMemo(() => {
    if (!hasCategories || activeCategory === "ALL") return products;
    if (!getProductCategory) return products;
    return products.filter(
      (p) => getProductCategory(p) === activeCategory
    );
  }, [activeCategory, hasCategories, products, getProductCategory]);

  const scrollBy = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    const scrollAmount = 260 * 2; // aprox 2 cards
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const tabBase =
    "px-2 pb-2 text-xs sm:text-sm border-b-2 border-transparent text-slate-500 cursor-pointer";
  const tabActive =
    "border-[#F68743] text-[#011C40] font-semibold";

  return (
    <section className="bg-[#F5F7FA] px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header sección */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#011C40]">
              {title}
            </h2>

            {hasCategories && (
              <div className="mt-3 flex flex-wrap gap-4 text-xs sm:text-sm">
                {showAllTab && (
                  <button
                    type="button"
                    className={`${tabBase} ${
                      activeCategory === "ALL" ? tabActive : ""
                    }`}
                    onClick={() => setActiveCategory("ALL")}
                  >
                    Todo
                  </button>
                )}

                {categories!.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`${tabBase} ${
                      activeCategory === cat ? tabActive : ""
                    }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Flechas */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-8 w-8 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50"
              onClick={() => scrollBy("left")}
            >
              <HiChevronLeft className="h-4 w-4 text-[#011C40]" />
            </button>
            <button
              type="button"
              className="h-8 w-8 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50"
              onClick={() => scrollBy("right")}
            >
              <HiChevronRight className="h-4 w-4 text-[#011C40]" />
            </button>
          </div>
        </div>

        {/* Carrusel */}
        <div
          ref={containerRef}
          className="mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
        >
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}

          {visibleProducts.length === 0 && (
            <p className="text-xs text-slate-500 px-1">
              No hay productos para esta categoría.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
