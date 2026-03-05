import { type OrderStatus } from "../domain/order.types";

type Props = {
  status: OrderStatus;
};

const steps: OrderStatus[] = [
  "paid",
  "processing",
  "shipped",
  "delivered",
];

const labels: Record<OrderStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  paid: "Pago confirmado",
  processing: "Preparando pedido",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export const OrderTimeline = ({ status }: Props) => {
  if (status === "cancelled") {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="font-semibold text-red-600">
          Pedido cancelado
        </p>
      </div>
    );
  }

  const currentStepIndex = steps.indexOf(status);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">

        {/* Línea base */}
        <div className="absolute top-4 left-0 right-0 h-1 bg-slate-200 z-0" />

        {/* Línea progreso */}
        <div
          className="absolute top-4 left-0 h-1 bg-[#011C40] z-0 transition-all duration-500"
          style={{
            width:
              currentStepIndex >= 0
                ? `${(currentStepIndex / (steps.length - 1)) * 100}%`
                : "0%",
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;

          return (
            <div
              key={step}
              className="relative z-10 flex flex-col items-center text-center w-full"
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  ${
                    isCompleted
                      ? "bg-[#011C40] text-white"
                      : "bg-slate-200 text-slate-500"
                  }
                `}
              >
                {index + 1}
              </div>

              <span
                className={`
                  mt-2 text-xs
                  ${isCompleted ? "text-black" : "text-slate-400"}
                `}
              >
                {labels[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};