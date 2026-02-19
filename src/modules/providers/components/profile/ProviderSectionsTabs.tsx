import type { ProviderSection } from "../../domain/types";

export default function ProviderSectionsTabs({
  sections,
  activeId,
  onChange,
}: {
  sections: ProviderSection[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onChange(s.id)}
          className={[
            "shrink-0 rounded-full px-4 py-2 text-xs font-semibold border transition",
            activeId === s.id
              ? "bg-[#011C40] text-white border-[#011C40]"
              : "bg-white text-[#011C40] border-slate-200 hover:bg-slate-50",
          ].join(" ")}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
