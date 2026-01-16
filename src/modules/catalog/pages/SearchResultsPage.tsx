import { useMemo } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import type { SearchFilters, SortKey, ViewMode } from "../domain/types";

import ResultsHeader from "../components/search/ResultHeader";
import FiltersSidebar from "../components/search/FiltersSidebar";
import { useCatalogSearch } from "../hooks/useCatalogSearch";
import { ProductCard } from "../components/productCard";

const PAGE_SIZE = 12;

function asNumber(v: string | null): number | undefined {
  if (v === null || v.trim() === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export default function SearchResultsPage() {
  const navigate = useNavigate(); // ✅ AQUÍ

  const { categoryId } = useParams();
  const [params, setParams] = useSearchParams();

  const q = params.get("q") ?? "";
  const sort = (params.get("sort") as SortKey) ?? "relevance";
  const view = (params.get("view") as ViewMode) ?? "grid";
  const page = Math.max(1, Number(params.get("page") ?? "1"));

  const filters: SearchFilters = {
    categoryId: categoryId ?? (params.get("category") ?? undefined),
    ratingMin: asNumber(params.get("ratingMin")),
    priceMin: asNumber(params.get("min")),
    priceMax: asNumber(params.get("max")),
  };

  function updateParams(next: Record<string, string | number | undefined | null>) {
    const copy = new URLSearchParams(params);

    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") copy.delete(k);
      else copy.set(k, String(v));
    });

    setParams(copy);
  }

  const title = useMemo(() => {
    if (q) return `Resultados para “${q}”`;
    if (filters.categoryId) return `Categoría seleccionada`;
    return "Catálogo";
  }, [q, filters.categoryId]);

  const { data, loading, error } = useCatalogSearch({
    q,
    filters,
    sort,
    page,
    pageSize: PAGE_SIZE,
  });

  const AnyProductCard = ProductCard as any;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          <aside className="lg:sticky lg:top-6 h-fit">
            <FiltersSidebar
              value={filters}
              onChange={(next) => {
                updateParams({
                  category: next.categoryId ?? "",
                  ratingMin: next.ratingMin ?? "",
                  min: next.priceMin ?? "",
                  max: next.priceMax ?? "",
                  page: 1,
                });
              }}
            />
          </aside>

          <section className="min-w-0">
            <ResultsHeader
              title={title}
              total={data?.total ?? 0}
              sort={sort}
              view={view}
              onChangeSort={(s) => updateParams({ sort: s, page: 1 })}
              onChangeView={(v) => updateParams({ view: v })}
            />

            <div className="mt-5">
              {error && (
                <div className="bg-white border border-red-100 rounded-2xl p-4 text-red-700">
                  {error}
                </div>
              )}

              {loading && (
                <div className="bg-white border border-slate-100 rounded-2xl p-6 text-slate-500">
                  Cargando productos...
                </div>
              )}

              {!loading && !error && data && data.items.length === 0 && (
                <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center">
                  <div className="text-lg font-semibold text-slate-900">Sin resultados</div>
                  <div className="text-sm text-slate-500 mt-1">
                    Prueba ajustar filtros o la búsqueda.
                  </div>
                </div>
              )}

              {!loading && !error && data && data.items.length > 0 && (
                <>
                  {view === "grid" ? (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                      {data.items.map((p: any) => (
                        <AnyProductCard
                          key={p.id}
                          id={p.id}
                          brand={p.brand}
                          name={p.title}
                          imageUrl={p.imageUrl}
                          rating={p.rating}
                          reviewCount={p.reviewsCount}
                          price={p.price}
                          oldPrice={p.oldPrice}
                          discountPercent={
                            p.oldPrice && p.oldPrice > p.price
                              ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
                              : undefined
                          }
                          onOpen={() => navigate(`/product/${p.id}`)}
                          onAddToCart={() => console.log("add-to-cart", p.id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col gap-3">
                      {data.items.map((p: any) => (
                        <div
                          key={p.id}
                          className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between"
                        >
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 truncate">{p.title}</div>
                            <div className="text-sm text-slate-500">
                              {p.brand} · ⭐ {p.rating} ({p.reviewsCount})
                            </div>
                          </div>
                          <div className="text-[#F68743] font-extrabold">
                            ${Number(p.price).toLocaleString("es-MX")}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-center gap-2">
                    <button
                      className="px-3 py-2 rounded-xl border border-slate-200 bg-white disabled:opacity-40"
                      disabled={(data?.page ?? 1) <= 1}
                      onClick={() => updateParams({ page: Math.max(1, (data?.page ?? 1) - 1) })}
                    >
                      ←
                    </button>

                    <div className="text-sm text-slate-600">
                      Página {data.page} de {data.totalPages}
                    </div>

                    <button
                      className="px-3 py-2 rounded-xl border border-slate-200 bg-white disabled:opacity-40"
                      disabled={(data?.page ?? 1) >= (data?.totalPages ?? 1)}
                      onClick={() => updateParams({ page: (data?.page ?? 1) + 1 })}
                    >
                      →
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
