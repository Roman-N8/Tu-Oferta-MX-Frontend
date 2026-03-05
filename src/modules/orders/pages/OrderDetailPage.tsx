import { useParams, Link } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import { OrderTimeline } from "../components/OrderTimeLine";
import { OrderStatusBadge } from "../components/OrderStatusBadge";

export const OrderDetailPage = () => {
  const { id } = useParams();
  const { getOrderById } = useOrders();

  const order = getOrderById(id!);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-lg font-semibold">Pedido no encontrado</p>
        <Link to="/orders" className="text-blue-600 underline">
          Volver a pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">
            Pedido {order.number}
          </h1>
          <p className="text-sm text-slate-500">
            Realizado el {new Date(order.date).toLocaleDateString()}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      {/* TIMELINE */}
      <OrderTimeline status={order.status} />

      {/* TRACKING */}
      {order.trackingCode && (
        <div className="bg-slate-50 border rounded-lg p-4">
          <p className="font-semibold text-sm">
            Código de seguimiento
          </p>
          <p className="text-sm text-slate-600">
            {order.trackingCode}
          </p>
        </div>
      )}

      {/* GRID INFO */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* DIRECCIÓN */}
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold mb-3">
            Dirección de envío
          </h2>
          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.addressLine}</p>
          <p>
            {order.shippingAddress.postalCode}{" "}
            {order.shippingAddress.city}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>

        {/* PAGO */}
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold mb-3">
            Método de pago
          </h2>
          <p>{order.paymentInfo.method}</p>
          {order.paymentInfo.last4 && (
            <p className="text-sm text-slate-500">
              **** {order.paymentInfo.last4}
            </p>
          )}
        </div>
      </div>

      {/* PRODUCTOS */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">
          Productos
        </h2>

        {order.items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 border p-4 rounded-xl"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <p className="font-medium">
                {item.title}
              </p>
              <p className="text-sm text-slate-500">
                {item.quantity} × ${item.price}
              </p>
            </div>

            <div className="font-semibold">
              ${(item.quantity * item.price).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* RESUMEN */}
      <div className="border rounded-xl p-6 space-y-3">
        <h2 className="font-semibold text-lg">
          Resumen del pedido
        </h2>

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${order.total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Envío</span>
          <span>$0.00</span>
        </div>

        <div className="border-t pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* ACCIONES */}
      <div className="flex justify-between">
        <Link
          to="/orders"
          className="text-sm underline"
        >
          ← Volver a pedidos
        </Link>

        {order.status === "paid" && (
          <button className="text-sm text-red-600 underline">
            Cancelar pedido
          </button>
        )}
      </div>
    </div>
  );
};