import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { state, subtotal, totalItems, setQty, removeItem, clear } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900">Carrito</h1>
        {state.items.length > 0 && (
          <button onClick={clear} className="text-sm text-red-600 hover:underline">
            Vaciar carrito
          </button>
        )}
      </div>

      {state.items.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-8 mt-5 text-center">
          <div className="text-slate-900 font-semibold">Tu carrito está vacío</div>
          <Link to="/catalog" className="inline-block mt-3 text-sm underline text-slate-600">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mt-5">
          <div className="bg-white border border-slate-100 rounded-2xl p-4">
            <div className="space-y-4">
              {state.items.map((i) => (
                <div key={String(i.productId)} className="flex gap-4 border-b border-slate-100 pb-4">
                  <img src={i.imageUrl} alt={i.title} className="h-20 w-20 object-contain bg-slate-50 rounded-xl" />

                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-slate-900 truncate">{i.title}</div>
                    <div className="text-xs text-slate-500">{i.brand}</div>
                    <div className="mt-2 text-sm font-bold text-[#F68743]">
                      ${i.price.toLocaleString("es-MX")}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={i.quantity}
                        onChange={(e) => setQty(i.productId, Number(e.target.value))}
                        className="w-20 border border-slate-200 rounded-xl px-3 py-2 text-sm"
                      />
                      <button
                        onClick={() => removeItem(i.productId)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>

                  <div className="text-sm font-extrabold text-slate-900">
                    ${(i.price * i.quantity).toLocaleString("es-MX")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-white border border-slate-100 rounded-2xl p-5 h-fit lg:sticky lg:top-6">
            <div className="text-sm text-slate-600">Artículos: {totalItems}</div>
            <div className="mt-2 text-lg font-extrabold text-slate-900">
              Subtotal: ${subtotal.toLocaleString("es-MX")}
            </div>

            <button
              className="mt-4 w-full rounded-xl bg-[#F68743] px-4 py-3 text-sm font-semibold text-white hover:bg-[#f46f1f] transition"
              onClick={() => console.log("checkout")}
            >
              Continuar a pago
            </button>

            <Link to="/catalog" className="block text-center mt-3 text-sm text-slate-600 hover:underline">
              Seguir comprando
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
