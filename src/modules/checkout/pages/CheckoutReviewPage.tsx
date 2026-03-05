import { useNavigate, Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import OrderSummaryCard from "../components/OrderSummaryCard";
import { useCheckout } from "../hooks/useCheckout";
import { useCart } from "../../cart/hooks/useCart";
import { useOrders } from "../../orders/hooks/useOrders";

export default function CheckoutReviewPage() {
  const navigate = useNavigate();
  const { state } = useCheckout();
  const { state: cart, clear } = useCart();
  const { createOrder } = useOrders();

  if (!state.shipping) {
    navigate("/checkout/shipping");
    return null;
  }
  if (!state.payment) {
    navigate("/checkout/payment");
    return null;
  }

  function payMock() {
    clear();
    const id = createOrder({
      number: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      total: cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      status: "paid",
      customerEmail: "romanch422@gmail.com",
      trackingCode: "TRK-" + Date.now(),
      items: cart.items.map((item) => ({
        ...item,
        productId: String(item.productId),
      })),
      shippingAddress:{
        fullName: "Roman",
        addressLine: "Calle Falsa 123",
        city: "Ciudad de México",
        postalCode: "12345",
        country: "México"
      },
      paymentInfo:{
        method: "Card",
        last4: "2341"
      }
    });
    navigate(`/orders/${id}`);

  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-lg font-semibold text-slate-900">Checkout</h1>
        <CheckoutSteps step={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mt-5">
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#011C40]">Envío</h2>
              <Link to="/checkout/shipping" className="text-sm text-slate-600 hover:underline">
                Editar
              </Link>
            </div>
            <div className="mt-3 text-sm text-slate-700">
              <div className="font-semibold">{state.shipping.fullName}</div>
              <div>{state.shipping.street}</div>
              <div>
                {state.shipping.city}, {state.shipping.state} · {state.shipping.zip}
              </div>
              <div className="text-slate-500">{state.shipping.phone}</div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#011C40]">Pago</h2>
              <Link to="/checkout/payment" className="text-sm text-slate-600 hover:underline">
                Editar
              </Link>
            </div>
            <div className="mt-3 text-sm text-slate-700">
              {state.payment.type === "card" ? (
                <div>
                  <div className="font-semibold">Tarjeta</div>
                  <div className="text-slate-500">
                    {state.payment.cardHolder} · **** {state.payment.cardLast4}
                  </div>
                </div>
              ) : (
                <div className="font-semibold">
                  {state.payment.type === "cash" ? "Efectivo" : "Transferencia"}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5">
            <h2 className="text-base font-semibold text-[#011C40]">Productos</h2>
            <div className="mt-3 space-y-3">
              {cart.items.map((i) => (
                <div key={String(i.productId)} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-slate-900 truncate">{i.title}</div>
                    <div className="text-xs text-slate-500">
                      {i.brand} · Cantidad: {i.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">
                    ${(i.price * i.quantity).toLocaleString("es-MX")}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={payMock}
              className="mt-5 w-full rounded-xl bg-[#F68743] px-4 py-3 text-sm font-semibold text-white hover:bg-[#f46f1f] transition"
            >
              Pagar
            </button>
          </div>
        </div>

        <OrderSummaryCard />
      </div>
    </div>
  );
}
