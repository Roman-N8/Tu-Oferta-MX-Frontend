import { HiStar } from "react-icons/hi";
import type { ProviderProfile } from "../../domain/types";

export default function ProviderHero({ provider }: { provider: ProviderProfile }) {
  const fullStars = Math.round(provider.rating);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="relative h-52 sm:h-64 bg-slate-100">
        <img
          src={provider.coverImageUrl}
          alt={`${provider.name} cover`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
      </div>

      <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="-mt-16 sm:-mt-20 shrink-0">
          <img
            src={provider.avatarImageUrl}
            alt={provider.name}
            className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border-4 border-white shadow-sm"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#011C40] truncate">
            {provider.name}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <HiStar
                  key={idx}
                  className={idx < fullStars ? "h-4 w-4 text-[#FBBF24]" : "h-4 w-4 text-slate-300"}
                />
              ))}
            </div>
            <span className="text-xs text-slate-600">({provider.rating.toFixed(1)})</span>
            {provider.location && (
              <span className="text-xs text-slate-500">· {provider.location}</span>
            )}
          </div>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {provider.description}
          </p>
        </div>
      </div>
    </div>
  );
}
