import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { useCheckout } from "../hooks/useCheckout";

export default function CheckoutShippingPage() {
  const navigate = useNavigate();
  const { state, setShipping } = useCheckout();

  const [form, setForm] = useState({
    fullName: state.shipping?.fullName ?? "",
    phone: state.shipping?.phone ?? "",
    email: state.shipping?.email ?? "",
    street: state.shipping?.street ?? "",
    city: state.shipping?.city ?? "",
    state: state.shipping?.state ?? "",
    zip: state.shipping?.zip ?? "",
    notes: state.shipping?.notes ?? "",
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.street || !form.city || !form.state || !form.zip) return;

    setShipping({
      fullName: form.fullName,
      phone: form.phone,
      email: form.email || undefined,
      street: form.street,
      city: form.city,
      state: form.state,
      zip: form.zip,
      notes: form.notes || undefined,
    });

    navigate("/checkout/payment");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-slate-900">Checkout</h1>
        <CheckoutSteps step={1} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mt-5">
        <form onSubmit={onSubmit} className="bg-white border border-slate-100 rounded-2xl p-5">
          <h2 className="text-base font-semibold text-[#011C40]">Dirección de envío</h2>

          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <input className="border rounded-xl px-3 py-3 text-sm" placeholder="Nombre completo*"
              value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            <input className="border rounded-xl px-3 py-3 text-sm" placeholder="Teléfono*"
              value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="border rounded-xl px-3 py-3 text-sm sm:col-span-2" placeholder="Calle y número*"
              value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
            <input className="border rounded-xl px-3 py-3 text-sm" placeholder="Ciudad*"
              value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <input className="border rounded-xl px-3 py-3 text-sm" placeholder="Estado*"
              value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            <input className="border rounded-xl px-3 py-3 text-sm" placeholder="Código postal*"
              value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
            <input className="border rounded-xl px-3 py-3 text-sm sm:col-span-2" placeholder="Email (opcional)"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea className="border rounded-xl px-3 py-3 text-sm sm:col-span-2" placeholder="Notas (opcional)"
              value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              className="px-4 py-3 rounded-xl border bg-white text-sm font-semibold"
              onClick={() => navigate("/cart")}
            >
              Volver al carrito
            </button>
            <button
              type="submit"
              className="px-4 py-3 rounded-xl bg-[#F68743] text-white text-sm font-semibold hover:bg-[#f46f1f] transition"
            >
              Continuar
            </button>
          </div>
        </form>

        <OrderSummaryCard />
      </div>
    </div>
  );
}
