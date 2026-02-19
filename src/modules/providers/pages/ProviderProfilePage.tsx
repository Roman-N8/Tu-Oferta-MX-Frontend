import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProviderHero from "../components/profile/ProviderHero";
import ProviderContactCard from "../components/profile/ProviderContact";
import ProviderSectionsTabs from "../components/profile/ProviderSectionsTabs";
import ProviderSectionContent from "../components/profile/ProviderSectionContent";
import { useProviderProfile } from "../hooks/useProviderProfile";

import { useCart } from "../../cart/hooks/useCart";
import { useCatalogSearch } from "../../catalog/hooks/useCatalogSearch";

export default function ProviderProfilePage() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const { provider, loading, error } = useProviderProfile(providerId);

  // Mock productos: reutilizamos tu search (sin API) y filtramos por ids
  const { data } = useCatalogSearch({
    q: "",
    filters: {},
    sort: "relevance",
    page: 1,
    pageSize: 100,
  });

  const products = useMemo(() => {
    if (!provider || !data?.items?.length) return [];
    if (!provider.productIds?.length) return data.items.slice(0, 12);
    const set = new Set(provider.productIds.map(String));
    return data.items.filter((p: any) => set.has(String(p.id)));
  }, [provider, data]);

  const [activeSectionId, setActiveSectionId] = useState<string>("s-products");

  const activeType = useMemo(() => {
    if (!provider) return "products";
    const found = provider.sections.find((s) => s.id === activeSectionId) ?? provider.sections[0];
    return found?.type ?? "products";
  }, [provider, activeSectionId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-slate-500">
          Cargando proveedor...
        </div>
      </div>
    );
  }

  if (error || !provider) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="bg-white border border-red-100 rounded-2xl p-6 text-red-700">
          {error ?? "Proveedor no encontrado"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        <ProviderHero provider={provider} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-4">
            <ProviderSectionsTabs
              sections={provider.sections}
              activeId={activeSectionId}
              onChange={setActiveSectionId}
            />

            <ProviderSectionContent
              type={activeType as any}
              provider={provider}
              products={products}
              onOpenProduct={(p) => navigate(`/product/${p.id}`)}
              onAddToCart={(p: any) =>
                addItem(
                  {
                    productId: p.id,
                    title: p.title ?? p.name,
                    brand: p.brand,
                    imageUrl: p.imageUrl,
                    price: p.price,
                    stock: p.stock,
                  },
                  1
                )
              }
            />
          </div>

          <ProviderContactCard contact={provider.contact} />
        </div>
      </div>
    </div>
  );
}
