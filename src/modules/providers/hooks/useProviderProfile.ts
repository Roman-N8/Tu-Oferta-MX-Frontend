import { useEffect, useState } from "react";
import type { ProviderProfile } from "../domain/types";
import { providersRepository } from "../data/providersRepository";

export function useProviderProfile(providerId?: string) {
  const [provider, setProvider] = useState<ProviderProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!providerId) return;
    let alive = true;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await providersRepository.getById(providerId);
        if (alive) setProvider(data);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Error al cargar proveedor");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [providerId]);

  return { provider, loading, error };
}
