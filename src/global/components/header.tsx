import React from "react";
import logo from "../../assets/A_wordmark.png";
import {
  HiOutlineSearch,
  HiOutlineClipboardList,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineChevronDown,
} from "react-icons/hi";

interface HeaderProps {
  onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const navItemBase =
    "flex items-center gap-2 px-2 pb-1 text-xs sm:text-sm border-b-2 border-transparent text-[#011C40] hover:border-[#F68743] transition-colors";

  return (
    <header className="bg-white border-b border-slate-200">
      {/* BARRA SUPERIOR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3">
        {/* IZQUIERDA: logo + buscador */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 w-full sm:w-auto">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <img src={logo} alt="Tu Oferta MX" className="h-7" />
          </div>

          {/* Buscador: ocupa todo el ancho en mobile, tamaño fijo en desktop */}
          <div className="flex items-center w-full sm:w-[340px] rounded-full bg-[#011C40]/10 px-3 sm:px-4 py-2">
            <HiOutlineSearch className="mr-2 h-4 w-4 text-[#011C40]/60 shrink-0" />
            <input
              type="text"
              placeholder="¿Qué producto quieres buscar?"
              className="w-full bg-transparent text-xs sm:text-sm text-[#011C40]/80 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* DERECHA: menú superior */}
        <nav className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-3 sm:gap-6">
          {/* Ordenes */}
          <button className={navItemBase}>
            <HiOutlineClipboardList className="h-5 w-5 text-[#011C40]" />
            <span className="hidden xs:inline">Ordenes</span>
          </button>

          {/* Carrito */}
          <button className={navItemBase}>
            <HiOutlineShoppingCart className="h-5 w-5 text-[#011C40]" />
            <span className="hidden xs:inline">Tu carrito de compras</span>
          </button>

          {/* Login */}
          <button
            className={`${navItemBase} font-semibold`}
            onClick={onLoginClick}
          >
            <HiOutlineUser className="h-5 w-5 text-[#011C40]" />
            <span className="hidden sm:inline font-normal text-[#011C40]/80">
              Bienvenido,
            </span>
            <span>inicia sesión</span>
          </button>
        </nav>
      </div>

      {/* BARRA DE CATEGORÍAS (segunda fila) */}
      <div className="border-t border-slate-200 px-4 sm:px-6 py-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs sm:text-sm text-[#011C40] hover:bg-slate-50 transition-colors"
        >
          <HiOutlineMenu className="h-5 w-5 text-[#011C40]" />
          <span className="font-medium">Todas las categorías</span>
          <HiOutlineChevronDown className="h-4 w-4 text-[#011C40]" />
        </button>
      </div>
    </header>
  );
};
