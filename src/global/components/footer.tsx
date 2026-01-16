import React from "react";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Grid principal */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-sm">
          {/* Acerca de nosotros */}
          <div>
            <h3 className="text-[#011C40] font-semibold mb-3">
              Acerca de nosotros
            </h3>
            <ul className="space-y-1 text-slate-600 text-sm">
              <li>
                <button className="hover:underline">Acerca de Tu Oferta MX</button>
              </li>
              <li>
                <button className="hover:underline">Formas de pago</button>
              </li>
              <li>
                <button className="hover:underline">Formas de envío</button>
              </li>
              <li>
                <button className="hover:underline">Acerca de los proveedores</button>
              </li>
            </ul>
          </div>

          {/* Accesos rápidos */}
          <div>
            <h3 className="text-[#011C40] font-semibold mb-3">
              Accesos rápidos
            </h3>
            <ul className="space-y-1 text-slate-600 text-sm">
              <li>
                <button className="hover:underline">Regístrate</button>
              </li>
              <li>
                <button className="hover:underline">Inicia sesión</button>
              </li>
              <li>
                <button className="hover:underline">Ordenes</button>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-[#011C40] font-semibold mb-3">Soporte</h3>
            <ul className="space-y-1 text-slate-600 text-sm">
              <li>
                <button className="hover:underline">Devoluciones</button>
              </li>
              <li>
                <button className="hover:underline">Envíos</button>
              </li>
              <li>
                <button className="hover:underline">Preguntas frecuentes</button>
              </li>
              <li>
                <button className="hover:underline">Otros problemas</button>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-[#011C40] font-semibold mb-3">Contacto</h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li className="flex items-center gap-2">
                <HiOutlinePhone className="h-4 w-4 text-[#011C40]" />
                <span>+52 851 463 4852</span>
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineMail className="h-4 w-4 text-[#011C40]" />
                <span>soporte@tuofertamx.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[11px] sm:text-xs text-[#011C40]/70">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Tu Oferta MX</span>. Todos los derechos
          reservados
        </div>
      </div>
    </footer>
  );
};
