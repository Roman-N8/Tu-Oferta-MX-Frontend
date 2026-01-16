import React from "react";
import { HiStar, HiLocationMarker } from "react-icons/hi";

export interface ProviderCardProps {
  name: string;
  rating: number;
  description: string;
  location: string;
  coverImage: string;   // imagen de portada
  avatarImage?: string; // imagen de perfil (opcional)
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  name,
  rating,
  description,
  location,
  coverImage,
  avatarImage,
}) => {
  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Portada + avatar */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={coverImage}
          alt={`Portada de ${name}`}
          className="h-full w-full object-cover"
        />

        {avatarImage && (
          <div className="absolute -bottom-6 left-4 h-12 w-12 rounded-md bg-slate-100 overflow-hidden shadow-md border border-white">
            <img
              src={avatarImage}
              alt={`Logo de ${name}`}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex-1 px-4 pt-8 pb-4 flex flex-col">
        {/* Nombre + rating */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#011C40] truncate">
            {name}
          </h3>

          <div className="inline-flex items-center gap-1 rounded-full bg-[#F68743]/10 px-2 py-1">
            <HiStar className="h-4 w-4 text-[#FBBF24]" />
            <span className="text-xs font-semibold text-[#011C40]">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Descripción */}
        <p className="mt-3 text-xs text-slate-600 leading-relaxed">
          {description}
        </p>

        {/* Ubicación */}
        <div className="mt-4 flex items-center justify-end gap-1 text-[11px] text-slate-500">
          <HiLocationMarker className="h-4 w-4 text-slate-400" />
          <span>{location}</span>
        </div>
      </div>
    </article>
  );
};
