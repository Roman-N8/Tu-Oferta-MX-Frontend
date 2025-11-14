import React from "react";
import { RegisterForm } from "./registerForm";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onGoToLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onClose,
  onGoToLogin,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
          onClick={onClose}
        >
          ✕
        </button>

        <RegisterForm onSuccess={onClose} onSwitchToLogin={onGoToLogin} />
      </div>
    </div>
  );
};
