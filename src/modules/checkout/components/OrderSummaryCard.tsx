import { useCart } from "../../cart/hooks/useCart";

export default function OrderSummaryCard() {
  const { subtotal, totalItems } = useCart();
  const shipping = subtotal > 3000 ? 0 : 149; // mock

  const total = subtotal + shipping;

  return (
    <aside className="bg-white border border-slate-100 rounded-2xl p-5 h-fit lg:sticky lg:top-6">
      <div className="text-sm text-slate-600">Artículos: {totalItems}</div>
      <div className="mt-2 flex items-center justify-between text-sm text-slate-700">
        <span>Subtotal</span>
        <span className="font-semibold">${subtotal.toLocaleString("es-MX")}</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm text-slate-700">
        <span>Envío</span>
        <span className="font-semibold">
          {shipping === 0 ? "Gratis" : `$${shipping.toLocaleString("es-MX")}`}
        </span>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900">Total</span>
        <span className="text-lg font-extrabold text-[#F68743]">
          ${total.toLocaleString("es-MX")}
        </span>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        * Costos simulados (mock). Se ajustarán al integrar envío/pago real.
      </div>
    </aside>
  );
}
