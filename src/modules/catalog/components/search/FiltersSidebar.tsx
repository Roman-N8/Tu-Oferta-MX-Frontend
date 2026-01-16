import { useEffect, useState } from "react";
import type { Category, SearchFilters } from "../../domain/types";
import { catalogRepository } from "../../data/catalogRepository";

export default function FiltersSidebar({
  value,
  onChange,
}: {
  value: SearchFilters;
  onChange: (v: SearchFilters) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const res = await (catalogRepository as any).search({});
      setCategories(res.categories ?? []);
    })();
  }, []);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4">
      <h3 className="text-base font-semibold text-slate-900 mb-4">Filtros</h3>

      <div className="mb-5">
        <div className="text-sm font-semibold text-slate-800 mb-2">Categorías</div>
        <select
          value={value.categoryId ?? ""}
          onChange={(e) => onChange({ ...value, categoryId: e.target.value || undefined })}
          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
        >
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <div className="text-sm font-semibold text-slate-800 mb-2">Calificación</div>
        <div className="space-y-2">
          {[5,4,3,2,1].map((n) => (
            <label key={n} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="radio"
                name="ratingMin"
                checked={(value.ratingMin ?? 0) === n}
                onChange={() => onChange({ ...value, ratingMin: n })}
              />
              <span>{"★".repeat(n)}{"☆".repeat(5-n)} y más</span>
            </label>
          ))}
          <button
            type="button"
            className="text-xs text-slate-500 underline"
            onClick={() => onChange({ ...value, ratingMin: undefined })}
          >
            Quitar filtro
          </button>
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold text-slate-800 mb-2">Precio</div>
        <div className="grid grid-cols-2 gap-2">
          <input
            value={value.priceMin ?? ""}
            onChange={(e) => onChange({ ...value, priceMin: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="Desde"
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm"
          />
          <input
            value={value.priceMax ?? ""}
            onChange={(e) => onChange({ ...value, priceMax: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="Hasta"
            className="border border-slate-200 rounded-xl px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
