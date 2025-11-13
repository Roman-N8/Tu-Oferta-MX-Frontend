import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface LoginFormProps {
  onSuccess?: () => void;
}

// Regex de validación
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 8-16 caracteres, 1 minúscula, 1 mayúscula, 1 número, 1 caracter especial
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,16}$/;

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login, loading, error: authError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    if (!value) return "El correo es obligatorio.";
    if (!emailRegex.test(value)) return "Ingresa un correo electrónico válido.";
    return null;
  };

  const validatePassword = (value: string) => {
    if (!value) return "La contraseña es obligatoria.";
    if (!passwordRegex.test(value)) {
      return "La contraseña debe tener 8-16 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    const result = await login({ email, password });

    if (result && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form
      className="w-full max-w-md space-y-5 sm:space-y-6"
      onSubmit={handleSubmit}
    >
      {/* Título */}
      <div className="text-center space-y-1">
        <h2 className="text-lg sm:text-xl font-semibold text-[#011C40]">
          Inicia Sesión
        </h2>
        <p className="text-[11px] sm:text-xs text-[#011C40]/70">
          Bienvenido nuevamente, ingresa tus datos para acceder
        </p>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        {/* Correo */}
        <label className="flex flex-col gap-1 text-[11px] sm:text-xs text-[#011C40]">
          Correo Electrónico
          <input
            type="email"
            className={`rounded-md border px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none bg-slate-50
            ${emailError ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-slate-200 focus:border-[#F68743] focus:ring-[#F68743]"} focus:ring-1`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
            onBlur={() => setEmailError(validateEmail(email))}
            required
          />
          {emailError && (
            <span className="text-[10px] sm:text-[11px] text-red-600">
              {emailError}
            </span>
          )}
        </label>

        {/* Contraseña */}
        <label className="flex flex-col gap-1 text-[11px] sm:text-xs text-[#011C40]">
          Contraseña
          <div
            className={`relative flex items-center rounded-md border bg-slate-50
            ${passwordError ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500" : "border-slate-200 focus-within:border-[#F68743] focus-within:ring-[#F68743]"} focus-within:ring-1`}
          >
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(null);
              }}
              onBlur={() => setPasswordError(validatePassword(password))}
              required
            />

            <button
              type="button"
              className="absolute right-2 flex h-8 w-8 items-center justify-center text-[#011C40]/60 hover:text-[#011C40]"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <HiOutlineEyeOff className="h-4 w-4" />
              ) : (
                <HiOutlineEye className="h-4 w-4" />
              )}
            </button>
          </div>
          {passwordError && (
            <span className="text-[10px] sm:text-[11px] text-red-600">
              {passwordError}
            </span>
          )}
        </label>
      </div>

      {/* Error del backend */}
      {authError && !emailError && !passwordError && (
        <p className="text-[11px] sm:text-xs text-red-600 text-center">
          {authError}
        </p>
      )}

      {/* Recuperar contraseña */}
      <div className="flex justify-end">
        <button
          type="button"
          className="text-[11px] sm:text-xs text-[#011C40] hover:underline"
        >
          Recuperar contraseña
        </button>
      </div>

      {/* Botón principal */}
      <button
        type="submit"
        className="w-full rounded-md bg-[#011C40] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#011C40]/90 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#F68743] transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Iniciando..." : "Inicia Sesión"}
      </button>

      {/* Separador */}
      <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        <span>o</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Google */}
      <div className="space-y-3">
        <p className="text-center text-[11px] sm:text-xs text-[#011C40]/70">
          Continúa con
        </p>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-[11px] sm:text-xs hover:bg-slate-50"
        >
          <span className="text-base sm:text-lg">G</span>
          <span>Google</span>
        </button>
      </div>

      {/* Registro */}
      <p className="pt-2 text-center text-[11px] sm:text-xs text-[#011C40]/70">
        ¿Aún no tienes una cuenta?{" "}
        <button
          type="button"
          className="font-semibold text-[#F68743] hover:underline"
        >
          Regístrate aquí
        </button>
      </p>
    </form>
  );
};
