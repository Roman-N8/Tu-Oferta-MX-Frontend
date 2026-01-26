import { Link } from "react-router-dom";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center">
        <div className="text-2xl font-extrabold text-[#011C40]">¡Pago realizado!</div>
        <p className="mt-2 text-sm text-slate-600">
          Tu pedido fue generado correctamente (mock).
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            to="/catalog"
            className="px-4 py-3 rounded-xl bg-[#F68743] text-white text-sm font-semibold hover:bg-[#f46f1f] transition"
          >
            Seguir comprando
          </Link>
          <Link
            to="/"
            className="px-4 py-3 rounded-xl border bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
          >
            Ir a inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
