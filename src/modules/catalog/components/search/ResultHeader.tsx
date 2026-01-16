import type { SortKey, ViewMode } from "../../domain/types";

export default function ResultsHeader({
  title,
  total,
  sort,
  view,
  onChangeSort,
  onChangeView,
}: {
  title: string;
  total: number;
  sort: SortKey;
  view: ViewMode;
  onChangeSort: (s: SortKey) => void;
  onChangeView: (v: ViewMode) => void;
}) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">{total} productos</p>
      </div>

      <div className="flex items-center gap-2">
        <select
          value={sort}
          onChange={(e) => onChangeSort(e.target.value as SortKey)}
          className="border border-slate-200 rounded-xl px-3 py-2 text-sm bg-white"
        >
          <option value="relevance">Relevancia</option>
          <option value="newest">Más nuevos</option>
          <option value="rating_desc">Mejor calificados</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
        </select>

        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => onChangeView("grid")}
            className={`px-3 py-2 text-sm ${view === "grid" ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`}
          >
            ⬛⬛
          </button>
          <button
            onClick={() => onChangeView("list")}
            className={`px-3 py-2 text-sm ${view === "list" ? "bg-slate-900 text-white" : "bg-white text-slate-700"}`}
          >
            ≡
          </button>
        </div>
      </div>
    </div>
  );
}
