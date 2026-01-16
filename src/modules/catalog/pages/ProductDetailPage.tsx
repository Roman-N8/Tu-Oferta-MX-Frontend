import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiStar } from "react-icons/hi";
import { useProductDetail } from "../hooks/useProductDetail";
import { ProductCard } from "../components/productCard";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const { product, loading, error } = useProductDetail(productId);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  const discountPercent = useMemo(() => {
    if (!product?.oldPrice || product.oldPrice <= product.price) return undefined;
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }, [product]);

  const fullStars = Math.round(product?.rating ?? 0);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 text-slate-500">
          Cargando producto...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="bg-white border border-red-100 rounded-2xl p-6 text-red-700">
          {error ?? "Producto no encontrado"}
        </div>
        <div className="mt-4">
          <Link to="/catalog" className="text-sm underline text-slate-600">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.imageUrl];
  const mainImage = activeImage ?? images[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:underline">Inicio</Link> <span> / </span>
          <Link to="/catalog" className="hover:underline">Catálogo</Link> <span> / </span>
          <span className="text-slate-700">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">
          {/* Left: gallery + description/specs */}
          <div className="space-y-6">
            {/* Gallery */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4">
              <div className="relative bg-[#F5F7FA] rounded-2xl flex items-center justify-center h-[380px] overflow-hidden">
                <img src={mainImage} alt={product.title} className="h-80 object-contain" />
                {discountPercent !== undefined && (
                  <div className="absolute left-4 top-4 rounded-md bg-[#F68743] px-2 py-1 text-[11px] font-semibold text-white">
                    {discountPercent}%
                  </div>
                )}
              </div>

              <div className="mt-3 flex gap-2 overflow-auto">
                {images.map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`h-20 w-20 rounded-xl border overflow-hidden bg-[#F5F7FA] flex items-center justify-center ${
                      img === mainImage ? "border-[#F68743]" : "border-slate-200"
                    }`}
                  >
                    <img src={img} alt="thumb" className="h-16 object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <h2 className="text-base font-semibold text-[#011C40]">Descripción</h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {product.description ?? "Este producto aún no tiene descripción."}
              </p>
            </div>

            {/* Specs */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <h2 className="text-base font-semibold text-[#011C40]">Especificaciones</h2>
              {product.specs?.length ? (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specs.map((s) => (
                    <div key={s.label} className="border border-slate-100 rounded-xl p-3">
                      <div className="text-xs text-slate-500">{s.label}</div>
                      <div className="text-sm font-semibold text-slate-900">{s.value}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-600">Sin especificaciones disponibles.</p>
              )}
            </div>
          </div>

          {/* Right: purchase panel */}
          <aside className="h-fit lg:sticky lg:top-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
              <p className="text-xs text-slate-500 font-medium">{product.brand}</p>
              <h1 className="mt-1 text-base font-semibold text-[#011C40]">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <HiStar
                      key={idx}
                      className={idx < fullStars ? "h-4 w-4 text-[#FBBF24]" : "h-4 w-4 text-slate-300"}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-500">
                  ({product.reviewsCount})
                </span>
              </div>

              {/* Price */}
              <div className="mt-4">
                {product.oldPrice ? (
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 line-through">
                      ${product.oldPrice.toLocaleString("es-MX")}
                    </span>
                    <span className="text-lg font-extrabold text-[#F68743]">
                      ${product.price.toLocaleString("es-MX")}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-extrabold text-[#F68743]">
                    ${product.price.toLocaleString("es-MX")}
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="mt-3 text-sm">
                {typeof product.stock === "number" && product.stock <= 0 ? (
                  <span className="text-red-600 font-semibold">Sin stock</span>
                ) : (
                  <span className="text-slate-600">
                    Disponible {typeof product.stock === "number" ? `(${product.stock})` : ""}
                  </span>
                )}
              </div>

              {/* Actions */}
              <button
                type="button"
                disabled={typeof product.stock === "number" && product.stock <= 0}
                className="mt-5 w-full rounded-md bg-[#F68743] px-4 py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 hover:bg-[#f46f1f] transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => console.log("add-to-cart", product.id)}
              >
                🛒 <span>Añadir al carrito</span>
              </button>

              <button
                type="button"
                className="mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#011C40] hover:bg-slate-50 transition"
                onClick={() => console.log("wishlist", product.id)}
              >
                ❤️ <span>Guardar</span>
              </button>

              <div className="mt-4 text-xs text-slate-500">
                * Envío y disponibilidad pueden variar por ubicación.
              </div>
            </div>
          </aside>
        </div>

        {/* (Opcional) Relacionados */}
        <div className="mt-8">
          <h3 className="text-base font-semibold text-[#011C40] mb-3">
            Productos relacionados
          </h3>
          <div className="flex gap-4 overflow-auto pb-2">
            {/* Por ahora usa tu carousel actual si ya lo tienes */}
            {/* Cuando tengas API: repo.getRelated(productId) */}
            {/* Mock rápido */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shrink-0">
                <ProductCard
                  id={`rel-${i}`}
                  brand="Marca"
                  name="Producto relacionado"
                  imageUrl="https://via.placeholder.com/400x400.png?text=Relacionado"
                  rating={4}
                  reviewCount={12}
                  price={1299}
                  oldPrice={1599}
                  discountPercent={19}
                  onAddToCart={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
