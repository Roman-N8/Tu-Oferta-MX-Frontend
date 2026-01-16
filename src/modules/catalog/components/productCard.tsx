import React from "react";
import { HiStar } from "react-icons/hi";

export interface ProductCardProps {
  id: string | number;
  brand: string;
  name: string;
  imageUrl: string;
  rating: number; // 0–5
  reviewCount: number; // cantidad de reseñas
  price: number; // precio actual
  oldPrice?: number; // precio anterior (opcional)
  discountPercent?: number; // % de descuento
  onAddToCart?: () => void;

  onOpen?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  brand,
  name,
  imageUrl,
  rating,
  reviewCount,
  price,
  oldPrice,
  discountPercent,
  onAddToCart,
  onOpen,
}) => {
  const fullStars = Math.round(rating);

  const handleOpen = () => {
    onOpen?.();
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <article
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : -1}
      aria-label={onOpen ? `Abrir detalle de ${name}` : undefined}
      onClick={onOpen ? handleOpen : undefined}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen();
              }
            }
          : undefined
      }
      className={[
        "bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden min-w-[220px] max-w-[260px]",
        onOpen ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F68743]/40" : "",
      ].join(" ")}
      data-product-id={id}
    >
      {/* Imagen + badge de descuento */}
      <div className="relative flex items-center justify-center bg-[#F5F7FA] h-40">
        <img src={imageUrl} alt={name} className="h-32 object-contain" />

        {typeof discountPercent === "number" && discountPercent > 0 && (
          <div className="absolute left-3 top-3 rounded-md bg-[#F68743] px-2 py-1 text-[11px] font-semibold text-white">
            {discountPercent}%
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-1 px-4 pt-3 pb-4 flex flex-col">
        {/* Marca */}
        <p className="text-[11px] text-slate-500 font-medium">{brand}</p>

        {/* Nombre producto */}
        <h3 className="mt-1 text-xs text-[#011C40] font-semibold line-clamp-3">
          {name}
        </h3>

        {/* Rating + reseñas */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <HiStar
                key={idx}
                className={
                  idx < fullStars
                    ? "h-4 w-4 text-[#FBBF24]"
                    : "h-4 w-4 text-slate-300"
                }
              />
            ))}
          </div>
          <span className="ml-1 text-[11px] text-slate-500">({reviewCount})</span>
        </div>

        {/* Precio */}
        <div className="mt-3">
          {typeof oldPrice === "number" && oldPrice > 0 ? (
            <div className="flex flex-col">
              <span className="text-[11px] text-slate-400 line-through">
                ${oldPrice.toLocaleString("es-MX")}
              </span>
              <span className="text-sm font-semibold text-[#F68743]">
                ${price.toLocaleString("es-MX")}
              </span>
            </div>
          ) : (
            <span className="text-sm font-semibold text-[#F68743]">
              ${price.toLocaleString("es-MX")}
            </span>
          )}
        </div>

        {/* Botón Añadir */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-md bg-[#F68743] px-4 py-2 text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-2 hover:bg-[#f46f1f] transition"
        >
          🛒
          <span>Añadir</span>
        </button>
      </div>
    </article>
  );
};
