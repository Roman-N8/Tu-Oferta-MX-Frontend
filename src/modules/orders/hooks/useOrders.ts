import { useOrderStore } from "../store/orderStore";

export const useOrders = () => {
  return useOrderStore();
};