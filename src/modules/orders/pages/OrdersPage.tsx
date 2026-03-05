import { useOrders } from "../hooks/useOrders";
import { Link } from "react-router-dom";

export const OrdersPage = () => {
  const { orders } = useOrders();

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Mis pedidos</h1>

      {orders.map((order) => (
        <Link
          key={order.id}
          to={"/orders/" + order.id}
          className="block p-6 border rounded-xl hover:shadow"
        >
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">{order.number}</p>
              <p className="text-sm text-slate-500">{order.date}</p>
            </div>
            <p className="font-bold">${order.total}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};