import { useEffect, useState } from "react";
import type { CatalogSearchParams, CatalogSearchResult } from "../domain/types";
import { catalogRepository } from "../data/catalogRepository";

export function useCatalogSearch(params: CatalogSearchParams) {
  const [data, setData] = useState<CatalogSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await catalogRepository.search(params);
        if (alive) setData(res);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Error al cargar productos");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [params.q, params.filters.categoryId, params.filters.ratingMin, params.filters.priceMin, params.filters.priceMax, params.sort, params.page, params.pageSize]);

  return { data, loading, error };
}
