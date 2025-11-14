import React, { createContext, useContext, useState } from "react";

interface RegistrationContextValue {
  email: string | null;
  setEmail: (email: string) => void;
}

const RegistrationContext = createContext<RegistrationContextValue | undefined>(
  undefined
);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [email, setEmailState] = useState<string | null>(null);

  const setEmail = (value: string) => {
    setEmailState(value);
    // opcional: también en localStorage por si recarga página
    localStorage.setItem("pendingRegistrationEmail", value);
  };

  // al iniciar, intentar recuperar de localStorage
  React.useEffect(() => {
    const stored = localStorage.getItem("pendingRegistrationEmail");
    if (stored) setEmailState(stored);
  }, []);

  return (
    <RegistrationContext.Provider value={{ email, setEmail }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const ctx = useContext(RegistrationContext);
  if (!ctx) {
    throw new Error("useRegistration must be used within RegistrationProvider");
  }
  return ctx;
};
