import React from "react";
import heroBg from "../../../assets/Background blur.png";
import { HiOutlineChevronDown } from "react-icons/hi";

export const HomePage: React.FC = () => {
  return (
    <section
      className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10 bg-[#F5F7FA]"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay suave naranja, no bloquea clicks */}
      <div className="pointer-events-none absolute inset-0 bg-[#F68743]/20 blur-3xl" />

      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#011C40] leading-tight">
          Conecta directamente con <br />
          <span className="text-[#F68743] font-extrabold">
            los mejores proveedores
          </span>
        </h1>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-[#011C40]/80 font-medium">
          Explora las distintas ofertas directas con los proveedores mayoristas
          con un precio inmejorable
        </p>

        <button
          type="button"
          className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F68743] text-[#011C40] shadow-md hover:bg-[#F68743]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F68743] transition"
        >
          <HiOutlineChevronDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};
