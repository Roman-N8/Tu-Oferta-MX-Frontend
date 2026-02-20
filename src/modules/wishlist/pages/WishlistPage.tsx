import { Link, useNavigate } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../../cart/hooks/useCart";
import { ProductCard } from "../../catalog/components/productCard";

export default function WishlistPage() {
  const navigate = useNavigate();
  const { state, clear } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">Wishlist</h1>

        {state.items.length > 0 && (
          <button onClick={clear} className="text-sm text-red-600 hover:underline">
            Vaciar wishlist
          </button>
        )}
      </div>

      {state.items.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-8 mt-5 text-center">
          <div className="text-slate-900 font-semibold">Tu wishlist está vacía</div>
          <Link to="/catalog" className="inline-block mt-3 text-sm underline text-slate-600">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {state.items.map((p) => (
            <ProductCard
              key={String(p.productId)}
              id={p.productId}
              brand={p.brand}
              name={p.title}
              imageUrl={p.imageUrl}
              rating={0}
              reviewCount={0}
              price={p.price}
              onOpen={() => navigate(`/product/${p.productId}`)}
              onAddToCart={() =>
                addItem(
                  {
                    productId: p.productId,
                    title: p.title,
                    brand: p.brand,
                    imageUrl: p.imageUrl,
                    price: p.price,
                  },
                  1
                )
              }
            />
          ))}
        </div>
      )}

      {state.items.length > 0 && (
        <div className="mt-6 text-sm text-slate-600">
          Tip: puedes mover productos al carrito usando “Añadir”.
        </div>
      )}
    </div>
  );
}