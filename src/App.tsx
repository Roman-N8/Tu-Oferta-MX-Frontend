import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { AppShell } from "./global/layouts/AppShell";

/* ===== LANDING ===== */
import { HomePage } from "./modules/landing/pages/homePage";

/* ===== IDENTITY ===== */
import { LoginModal } from "./modules/identity/components/loginModal";
import { RegisterModal } from "./modules/identity/components/registerModal";
import { VerifyEmailPage } from "./modules/identity/registration/pages/verifyEmailPage";
import { CompleteAccountPage } from "./modules/identity/registration/pages/completeAccountPage";
import { RegistrationProvider } from "./modules/identity/registration/registrationContext";
import { ForgotPasswordPage } from "./modules/identity/recovery/pages/forgotPassword";
import { LinkSentMessage } from "./modules/identity/recovery/pages/linkSentMessage";
import { PasswordResetPage } from "./modules/identity/recovery/pages/passwordReset";

/* ===== ACCOUNT ===== */
import { AccountSettingsPage } from "./modules/account/pages/accountSettingsPage";

/* ===== CATALOG ===== */
import SearchResultsPage from "./modules/catalog/pages/SearchResultsPage";
import ProductDetailPage from "./modules/catalog/pages/ProductDetailPage";

type AuthMode = "login" | "register" | null;

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <RegistrationProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Routes>
            {/* ================= HOME ================= */}
            <Route
              path="/"
              element={
                <AppShell
                  isAuthenticated={isAuthenticated}
                  onLogin={() => setAuthMode("login")}
                  onLogout={handleLogout}
                >
                  <HomePage />
                </AppShell>
              }
            />

            {/* ================= CATALOG / SEARCH ================= */}
            <Route
              path="/catalog"
              element={
                <AppShell
                  isAuthenticated={isAuthenticated}
                  onLogin={() => setAuthMode("login")}
                  onLogout={handleLogout}
                >
                  <SearchResultsPage />
                </AppShell>
              }
            />

            <Route
              path="/search"
              element={
                <AppShell
                  isAuthenticated={isAuthenticated}
                  onLogin={() => setAuthMode("login")}
                  onLogout={handleLogout}
                >
                  <SearchResultsPage />
                </AppShell>
              }
            />

            <Route
              path="/category/:categoryId"
              element={
                <AppShell
                  isAuthenticated={isAuthenticated}
                  onLogin={() => setAuthMode("login")}
                  onLogout={handleLogout}
                >
                  <SearchResultsPage />
                </AppShell>
              }
            />

            {/* ================= PRODUCT DETAIL ================= */}
            <Route
              path="/product/:productId"
              element={
                <AppShell
                  isAuthenticated={isAuthenticated}
                  onLogin={() => setAuthMode("login")}
                  onLogout={handleLogout}
                >
                  <ProductDetailPage />
                </AppShell>
              }
            />

            {/* ================= IDENTITY ================= */}
            <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
            <Route path="/auth/complete-account" element={<CompleteAccountPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/link-sent" element={<LinkSentMessage />} />
            <Route path="/auth/password-reset" element={<PasswordResetPage />} />

            {/* ================= ACCOUNT ================= */}
            <Route
              path="/account/settings"
              element={
                <AppShell
                  isAuthenticated={isAuthenticated}
                  onLogin={() => setAuthMode("login")}
                  onLogout={handleLogout}
                >
                  <AccountSettingsPage />
                </AppShell>
              }
            />
          </Routes>

          {/* ================= MODALS ================= */}
          <LoginModal
            open={authMode === "login"}
            onClose={() => setAuthMode(null)}
            onGoToRegister={() => setAuthMode("register")}
            onLoggedIn={() => setIsAuthenticated(true)}
          />

          <RegisterModal
            open={authMode === "register"}
            onClose={() => setAuthMode(null)}
            onGoToLogin={() => setAuthMode("login")}
          />
        </div>
      </RegistrationProvider>
    </BrowserRouter>
  );
}

export default App;
