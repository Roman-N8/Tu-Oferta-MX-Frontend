import React from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function AppShell({
  children,
  isAuthenticated,
  onLogin,
  onLogout,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}) {
  return (
    <>
      <Header
        onLoginClick={onLogin}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
