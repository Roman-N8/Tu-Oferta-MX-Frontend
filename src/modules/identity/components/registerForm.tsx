import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../registration/registrationContext";

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

// mismos regex que en login
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,16}$/;

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const { register, loading, error: registerError } = useRegister();

  const navigate = useNavigate();
  const { setEmail } = useRegistration();

  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setPasswordConfirm] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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

  const validatePasswordConfirm = (value: string) => {
    if (!value) return "Confirma tu contraseña.";
    if (value !== password) return "Las contraseñas no coinciden.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    const pcErr = validatePasswordConfirm(confirm_password);
    const tErr = !acceptTerms
      ? "Debes aceptar los términos y condiciones."
      : null;

    setEmailError(eErr);
    setPasswordError(pErr);
    setPasswordConfirmError(pcErr);
    setTermsError(tErr);

    if (eErr || pErr || pcErr || tErr) return;

    const result = await register({
      email,
      password,
      confirm_password,
    });

    if (result) {
      setEmail(email);               
      if (onSuccess) onSuccess();   
      navigate("/auth/verify-email"); 
    }
  };

  return (
    <form
      className="w-full max-w-md space-y-5 sm:space-y-6"
      onSubmit={handleSubmit}
    >
      {/* Título */}
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-semibold text-[#011C40]">
          Crea tu cuenta para enterarte de las ofertas
          <br className="hidden sm:block" />
          <span className="block">directas de proveedor</span>
        </h2>
      </div>

      {/* Correo */}
      <label className="flex flex-col gap-1 text-[11px] sm:text-xs text-[#011C40]">
        Correo Electrónico
        <input
          type="email"
          className={`rounded-md border px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none bg-slate-50
          ${emailError ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-slate-200 focus:border-[#F68743] focus:ring-[#F68743]"} focus:ring-1`}
          value={email}
          onChange={(e) => {
            SetEmail(e.target.value);
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

      {/* Confirmar contraseña */}
      <label className="flex flex-col gap-1 text-[11px] sm:text-xs text-[#011C40]">
        Confirma la contraseña
        <div
          className={`relative flex items-center rounded-md border bg-slate-50
          ${passwordConfirmError ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500" : "border-slate-200 focus-within:border-[#F68743] focus-within:ring-[#F68743]"} focus-within:ring-1`}
        >
          <input
            type={showPasswordConfirm ? "text" : "password"}
            className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none"
            value={confirm_password}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              if (passwordConfirmError) setPasswordConfirmError(null);
            }}
            onBlur={() =>
              setPasswordConfirmError(
                validatePasswordConfirm(confirm_password)
              )
            }
            required
          />

          <button
            type="button"
            className="absolute right-2 flex h-8 w-8 items-center justify-center text-[#011C40]/60 hover:text-[#011C40]"
            onClick={() => setShowPasswordConfirm((prev) => !prev)}
            aria-label={
              showPasswordConfirm
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
          >
            {showPasswordConfirm ? (
              <HiOutlineEyeOff className="h-4 w-4" />
            ) : (
              <HiOutlineEye className="h-4 w-4" />
            )}
          </button>
        </div>
        {passwordConfirmError && (
          <span className="text-[10px] sm:text-[11px] text-red-600">
            {passwordConfirmError}
          </span>
        )}
      </label>

      {/* Términos */}
      <div className="flex items-start gap-2 text-[11px] sm:text-xs text-[#011C40]">
        <input
          type="checkbox"
          className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-[#011C40] focus:ring-[#F68743]"
          checked={acceptTerms}
          onChange={(e) => {
            setAcceptTerms(e.target.checked);
            if (termsError) setTermsError(null);
          }}
        />
        <span>
          Acepto los{" "}
          <button
            type="button"
            className="text-[#F68743] underline underline-offset-2"
          >
            términos y condiciones
          </button>
        </span>
      </div>
      {termsError && (
        <span className="text-[10px] sm:text-[11px] text-red-600">
          {termsError}
        </span>
      )}

      {/* Error backend */}
      {registerError && !emailError && !passwordError && !passwordConfirmError && !termsError && (
        <p className="text-[11px] sm:text-xs text-red-600 text-center">
          {registerError}
        </p>
      )}

      {/* Botón principal */}
      <button
        type="submit"
        className="mt-2 w-full rounded-md bg-[#224D73] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#224D73]/90 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#F68743] transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Creando cuenta..." : "Continuar"}
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

      {/* Ya tienes cuenta */}
      <p className="pt-2 text-center text-[11px] sm:text-xs text-[#011C40]/70">
        ¿Ya tienes una cuenta?{" "}
        <button
          type="button"
          className="font-semibold text-[#F68743] hover:underline"
          onClick={onSwitchToLogin}
        >
          Inicia sesión aquí
        </button>
      </p>
    </form>
  );
};
