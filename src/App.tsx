import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Header } from "./global/components/header";
import { HomePage } from "./modules/landing/pages/homePage";
import { LoginModal } from "./modules/identity/components/loginModal";
import { RegisterModal } from "./modules/identity/components/registerModal";
import { VerifyEmailPage } from "./modules/identity/registration/pages/verifyEmailPage";
import { CompleteAccountPage } from "./modules/identity/registration/pages/completeAccountPage";
import { RegistrationProvider } from "./modules/identity/registration/registrationContext";

type AuthMode = "login" | "register" | null;

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>(null);

  return (
    <BrowserRouter>
      <RegistrationProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          {/* Header solo en la landing */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header onLoginClick={() => setAuthMode("login")} />
                  <main className="flex-1">
                    <HomePage />
                  </main>
                </>
              }
            />

            <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
            <Route path="/auth/complete-account" element={<CompleteAccountPage />} />
          </Routes>

          {/* Modales de auth solo si estamos en "/" */}
          <LoginModal
            open={authMode === "login"}
            onClose={() => setAuthMode(null)}
            onGoToRegister={() => setAuthMode("register")}
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
