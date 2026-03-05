import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";

export const TrackOrderPage = () => {
  const { getOrderByNumber } = useOrders();
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    const order = getOrderByNumber(number);

    if (!order) {
      setError("No se encontró el pedido");
      return;
    }

    if (order.customerEmail !== email) {
      setError("El email no coincide con el pedido");
      return;
    }

    setError("");
    navigate(`/orders/${order.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-2xl font-bold">
        Rastrear pedido
      </h1>

      <div className="space-y-4">
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Número de pedido"
          className="w-full border px-4 py-2 rounded"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email utilizado en la compra"
          className="w-full border px-4 py-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-[#011C40] text-white px-6 py-2 rounded"
        >
          Buscar pedido
        </button>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};