import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { useCheckout } from "../hooks/useCheckout";

export default function CheckoutPaymentPage() {
  const navigate = useNavigate();
  const { state, setPayment } = useCheckout();

  const [type, setType] = useState<"card" | "cash" | "transfer">(state.payment?.type ?? "card");
  const [cardHolder, setCardHolder] = useState(state.payment?.cardHolder ?? "");
  const [cardNumber, setCardNumber] = useState("");

  function onContinue() {
    if (type === "card") {
      if (!cardHolder || cardNumber.replace(/\s/g, "").length < 12) return;
      const last4 = cardNumber.replace(/\D/g, "").slice(-4);

      setPayment({ type: "card", cardHolder, cardLast4: last4 });
    } else {
      setPayment({ type });
    }

    navigate("/checkout/review");
  }

  if (!state.shipping) {
    // Si entran directo
    navigate("/checkout/shipping");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-slate-900">Checkout</h1>
        <CheckoutSteps step={2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mt-5">
        <div className="bg-white border border-slate-100 rounded-2xl p-5">
          <h2 className="text-base font-semibold text-[#011C40]">Método de pago</h2>

          <div className="mt-4 flex gap-2">
            {(["card"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={[
                  "px-4 py-2 rounded-full border text-sm font-semibold",
                  type === t ? "bg-[#011C40] text-white border-[#011C40]" : "bg-white border-slate-200 text-slate-700",
                ].join(" ")}
              >
                {t === "card" ? "Tarjeta" : ""}
              </button>
            ))}
          </div>

            <div className="mt-4 grid gap-3">
              <input
                className="border rounded-xl px-3 py-3 text-sm"
                placeholder="Titular*"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
              <input
                className="border rounded-xl px-3 py-3 text-sm"
                placeholder="Número de tarjeta* (mock)"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              className="px-4 py-3 rounded-xl border bg-white text-sm font-semibold"
              onClick={() => navigate("/checkout/shipping")}
            >
              Volver
            </button>
            <button
              type="button"
              className="px-4 py-3 rounded-xl bg-[#F68743] text-white text-sm font-semibold hover:bg-[#f46f1f] transition"
              onClick={onContinue}
            >
              Continuar
            </button>
          </div>
        </div>

        <OrderSummaryCard />
      </div>
    </div>
  );
}
