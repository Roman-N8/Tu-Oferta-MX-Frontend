import { useEffect, useState } from "react";
import type { Product } from "../domain/types";
import { catalogRepository } from "../data/catalogRepository";

export function useProductDetail(productId?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const p = await catalogRepository.getById(productId);
        if (alive) setProduct(p);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Error al cargar producto");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [productId]);

  return { product, loading, error };
}
