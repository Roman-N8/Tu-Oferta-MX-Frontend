import React from "react";
import logo from "../../../assets/A_wordmark.png";
import { Link } from "react-router-dom";

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center">
      <header className="w-full  bg-white flex justify-center py-6">
        <Link to="/" className="inline-flex items-center" aria-label="Ir a inicio">
          <img src={logo} alt="Tu Oferta MX" className="h-14" />
        </Link>
      </header>

      <main className="flex-1 flex items-start justify-center w-full px-4 pb-10">
        <div className="mt-6 w-full max-w-md rounded-2xl bg-[#F5F7FA] p-6 shadow-lg">
          {children}
        </div>
      </main>
    </div>
  );
};
