import React from "react";
import { HiStar } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import { HiHeart } from "react-icons/hi";

export interface ProductCardProps {
  id: string | number;
  brand: string;
  name: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  price: number;
  oldPrice?: number;
  discountPercent?: number;

  onAddToCart?: () => void;
  onOpen?: () => void;

  // Wishlist
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
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
  isWishlisted,
  onToggleWishlist,
}) => {
  const fullStars = Math.round(rating);

  const handleOpen = () => {
    onOpen?.();
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAddToCart?.();
  };

  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleWishlist?.();
  };

  return (
    <article
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
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
      {/* Imagen + badge + wishlist */}
      <div className="relative flex items-center justify-center bg-[#F5F7FA] h-40">
        <img src={imageUrl} alt={name} className="h-32 object-contain" />

        {/* Wishlist */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={handleToggleWishlist}
            className="absolute right-3 top-3 rounded-full bg-white/90 border border-slate-200 h-9 w-9 flex items-center justify-center hover:bg-white transition"
            aria-label={isWishlisted ? "Quitar de wishlist" : "Guardar en wishlist"}
          >
            {isWishlisted ? <HiHeart className="h-5 w-5 text-red-500 solid" /> : <LuHeart className="h-5 w-5 text-slate-400" />}
          </button>
        )}

        {/* Descuento */}
        {typeof discountPercent === "number" && discountPercent > 0 && (
          <div className="absolute left-3 top-3 rounded-md bg-[#F68743] px-2 py-1 text-[11px] font-semibold text-white">
            {discountPercent}%
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-1 px-4 pt-3 pb-4 flex flex-col">
        <p className="text-[11px] text-slate-500 font-medium">{brand}</p>

        <h3 className="mt-1 text-xs text-[#011C40] font-semibold line-clamp-3">
          {name}
        </h3>

        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, idx) => (
              <HiStar
                key={idx}
                className={
                  idx < fullStars ? "h-4 w-4 text-[#FBBF24]" : "h-4 w-4 text-slate-300"
                }
              />
            ))}
          </div>
          <span className="ml-1 text-[11px] text-slate-500">({reviewCount})</span>
        </div>

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