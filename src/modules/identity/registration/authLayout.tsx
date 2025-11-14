import React from "react";
import logo from "../../../assets/A_wordmark.png";

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center">
      {/* Header simple con logo */}
      <header className="w-full flex justify-center py-6">
        <img src={logo} alt="Tu Oferta MX" className="h-8" />
      </header>

      {/* Contenido centrado */}
      <main className="flex-1 flex items-start justify-center w-full px-4 pb-10">
        <div className="mt-6 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
          {children}
        </div>
      </main>
    </div>
  );
};
