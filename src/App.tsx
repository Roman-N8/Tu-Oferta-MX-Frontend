import { useState } from "react";
import "./App.css";

import { Header } from "./global/components/header";
import { HomePage } from "./modules/landing/pages/homePage";
import { LoginModal } from "./modules/identity/components/loginModal";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header onLoginClick={() => setIsLoginOpen(true)} />

      <main className="flex-1">
        <HomePage />
      </main>

      <LoginModal
        open={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}

export default App;
