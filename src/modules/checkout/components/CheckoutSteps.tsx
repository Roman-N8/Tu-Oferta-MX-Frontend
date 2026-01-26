import React from "react";

export default function CheckoutSteps({ step }: { step: 1 | 2 | 3 }) {
  const items = [
    { n: 1, label: "Envío" },
    { n: 2, label: "Pago" },
    { n: 3, label: "Revisión" },
  ] as const;

  return (
    <div className="flex items-center gap-2 text-xs sm:text-sm">
      {items.map((it, idx) => (
        <React.Fragment key={it.n}>
          <div
            className={[
              "px-3 py-2 rounded-full border font-semibold",
              it.n === step
                ? "bg-[#011C40] text-white border-[#011C40]"
                : "bg-white text-slate-600 border-slate-200",
            ].join(" ")}
          >
            {it.n}. {it.label}
          </div>
          {idx < items.length - 1 && <div className="h-px w-6 bg-slate-200" />}
        </React.Fragment>
      ))}
    </div>
  );
}
