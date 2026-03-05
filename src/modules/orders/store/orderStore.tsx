import { createContext, useContext, useEffect, useState } from "react";
import { type Order } from "../domain/order.types";

type Ctx = {
  orders: Order[];
  createOrder: (order: Omit<Order, "id">) => string;
  getOrderById: (id: string) => Order | undefined;
  getOrderByNumber: (number: string) => Order | undefined;
};

const OrderContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "marketplace_orders";

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  // persistir
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const createOrder = (orderData: Omit<Order, "id">) => {
    const newOrder: Order = {
      ...orderData,
      id: crypto.randomUUID(),
    };

    setOrders((prev) => [...prev, newOrder]);
    return newOrder.id;
  };

  const getOrderById = (id: string) =>
    orders.find((o) => o.id === id);

  const getOrderByNumber = (number: string) =>
    orders.find((o) => o.number === number);

  return (
    <OrderContext.Provider
      value={{ orders, createOrder, getOrderById, getOrderByNumber }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderStore = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    throw new Error("useOrderStore must be used inside OrderProvider");
  }
  return ctx;
};