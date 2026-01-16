import React from "react";
import { LoginForm } from "./loginForm";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onGoToRegister: () => void;
  onLoggedIn: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onGoToRegister,
  onLoggedIn
}) => {
  const navigate = useNavigate();

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

        <LoginForm onSuccess={onClose} onSwitchToRegister={onGoToRegister} onGoToForgotPassword={() => {
          onClose();
          navigate("/auth/forgot-password");
        }}
          onLoggedIn={onLoggedIn}/>
      </div>
    </div>
  );
};
