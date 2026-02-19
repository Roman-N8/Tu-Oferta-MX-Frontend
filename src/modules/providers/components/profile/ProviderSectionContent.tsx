import type { ProviderProfile, ProviderSectionType } from "../../domain/types";
import { ProductCard } from "../../../catalog/components/productCard";

type ProductLike = any;

export default function ProviderSectionContent({
  type,
  provider,
  products,
  onOpenProduct,
  onAddToCart,
}: {
  type: ProviderSectionType;
  provider: ProviderProfile;
  products: ProductLike[];
  onOpenProduct: (p: ProductLike) => void;
  onAddToCart: (p: ProductLike) => void;
}) {
  if (type === "about") {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-5">
        <h3 className="text-base font-semibold text-[#011C40]">Acerca de {provider.name}</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {provider.description}
        </p>
      </div>
    );
  }

  if (type === "policies") {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-5">
        <h3 className="text-base font-semibold text-[#011C40]">Políticas</h3>
        <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1">
          <li>Devoluciones dentro de 7 días (mock).</li>
          <li>Garantía según producto (mock).</li>
          <li>Facturación disponible (mock).</li>
        </ul>
      </div>
    );
  }

  if (type === "reviews") {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl p-5">
        <h3 className="text-base font-semibold text-[#011C40]">Reseñas</h3>
        <div className="mt-3 text-sm text-slate-600">
          Aún no hay reseñas (mock).
        </div>
      </div>
    );
  }

  // products
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5">
      <h3 className="text-base font-semibold text-[#011C40]">Productos</h3>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((p: any) => (
          <ProductCard
            key={p.id}
            id={p.id}
            brand={p.brand}
            name={p.title ?? p.name}
            imageUrl={p.imageUrl}
            rating={p.rating ?? 0}
            reviewCount={p.reviewsCount ?? p.reviewCount ?? 0}
            price={p.price}
            oldPrice={p.oldPrice}
            discountPercent={
              p.oldPrice && p.oldPrice > p.price
                ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
                : undefined
            }
            onOpen={() => onOpenProduct(p)}
            onAddToCart={() => onAddToCart(p)}
          />
        ))}
      </div>
    </div>
  );
}
