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

import { LuHeart } from "react-icons/lu";

import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useCart } from "../../modules/cart/hooks/useCart";

import { useWishlist } from "../../modules/wishlist/hooks/useWishlist"

interface HeaderProps {
  onLoginClick: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  isAuthenticated,
  onLogout,
}) => {
  const navItemBase =
    "flex items-center gap-2 px-2 pb-1 text-xs sm:text-sm border-b-2 border-transparent text-[#011C40] hover:border-[#F68743] transition-colors";

  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  // search navigation
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const qFromUrl = searchParams.get("q") ?? "";
  const [query, setQuery] = React.useState("");

  const { totalItems } = useCart();

  const { count } = useWishlist();

  React.useEffect(() => {
    if (location.pathname === "/search") {
      setQuery(qFromUrl);
    }
  }, [location.pathname, qFromUrl]);

  function goSearch() {
    const trimmed = query.trim();

    if (!trimmed) {
      navigate("/catalog");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <header className="bg-white border-b border-slate-200">
      {/* BARRA SUPERIOR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3">
        {/* IZQUIERDA: logo + buscador */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 w-full sm:w-auto">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <Link to="/" className="inline-flex items-center" aria-label="Ir a inicio">
              <img src={logo} alt="Tu Oferta MX" className="h-7" />
            </Link>
          </div>

          {/* Buscador */}
          <div className="flex items-center w-full sm:w-[340px] rounded-full bg-[#011C40]/10 px-3 sm:px-4 py-2">
            <button
              type="button"
              onClick={goSearch}
              className="mr-2 h-6 w-6 flex items-center justify-center shrink-0"
              aria-label="Buscar"
            >
              <HiOutlineSearch className="h-4 w-4 text-[#011C40]/60" />
            </button>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") goSearch();
              }}
              placeholder="¿Qué producto quieres buscar?"
              className="w-full bg-transparent text-xs sm:text-sm text-[#011C40]/80 placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* DERECHA: menú superior */}
        <nav className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-3 sm:gap-6">
          {/* Ordenes */}
          <button className={navItemBase} type="button">
            <HiOutlineClipboardList className="h-5 w-5 text-[#011C40]" />
            <span className="hidden xs:inline">Ordenes</span>
          </button>

          {/* Carrito */}
          <button type="button" className={navItemBase} onClick={() => navigate("/cart")}>
            <HiOutlineShoppingCart className="h-5 w-5 text-[#011C40]" />
            <span className="hidden xs:inline">Carrito</span>
            {totalItems > 0 && (
              <span className="ml-1 text-[11px] bg-[#F68743] text-white rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </button>

          {/* Login */}
          {!isAuthenticated ? (
            <button
              type="button"
              className={`${navItemBase} font-semibold`}
              onClick={onLoginClick}
            >
              <HiOutlineUser className="h-5 w-5 text-[#011C40]" />
              <span className="hidden sm:inline font-normal text-[#011C40]/80">
                Bienvenido,
              </span>
              <span>inicia sesión</span>
            </button>
          ) : (
            <div className="relative">
              <button
                type="button"
                className={`${navItemBase} font-semibold`}
                onClick={() => setUserMenuOpen((open) => !open)}
              >
                <HiOutlineUser className="h-5 w-5 text-[#011C40]" />
                <span className="hidden sm:inline font-normal text-[#011C40]/80">
                  Mi cuenta
                </span>
                <HiOutlineChevronDown className="h-4 w-4 text-[#011C40]" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg py-2 text-xs sm:text-sm z-50">
                  <Link
                    to="/account/settings"
                    className="block px-4 py-2 hover:bg-slate-50 text-[#011C40]"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Configuración de perfil
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block w-full text-left px-4 py-2 hover:bg-slate-50 text-[#011C40]"
                  >
                    <LuHeart className="inline mr-2" />
                    {count > 0 && (
                      <span className="absolute -top-1 -right-2 bg-[#F68743] text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                        {count}
                      </span>
                    )}
                    Wishlist
                  </Link>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-2 hover:bg-slate-50 text-red-600"
                    onClick={() => {
                      onLogout();
                      setUserMenuOpen(false);
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>

      {/* BARRA DE CATEGORÍAS */}
      <div className="border-t border-slate-200 px-4 sm:px-6 py-2">
        <button
          type="button"
          onClick={() => navigate("/catalog")}
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
