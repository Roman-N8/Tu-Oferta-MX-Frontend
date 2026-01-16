import React, { useRef, useState } from "react";
import { AuthLayout } from "../authLayout";
import { useRegistration } from "../registrationContext";
import { resendVerificationCode, verifyEmailCode } from "../../services/authService";
import { HiOutlineArrowLeft, HiOutlineLockClosed } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const VerifyEmailPage: React.FC = () => {
  const { email } = useRegistration();
  const navigate = useNavigate();

  const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; 
    const newDigits = [...codeDigits];
    newDigits[index] = value;
    setCodeDigits(newDigits);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("No se encontró el correo de registro. Intenta registrarte de nuevo.");
      return;
    }

    const code = codeDigits.join("");
    if (code.length !== 4) {
      setError("Ingresa el código completo.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await verifyEmailCode({ email, code });
      navigate("/auth/complete-account");
    } catch (err: any) {
      setError(err.message || "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      setResendLoading(true);
      setError(null);
      await resendVerificationCode(email);
    } catch (err: any) {
      setError(err.message || "No se pudo reenviar el código");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <button
          type="button"
          className="flex items-center gap-1 text-xs text-[#011C40]/80 hover:text-[#011C40]"
          onClick={() => navigate(-1)}
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </button>

        <div className="flex flex-col items-center space-y-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#011C40]/5">
            <HiOutlineLockClosed className="h-4 w-4 text-[#011C40]" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-[#011C40]">
            Revisa tu correo
          </h2>
          <p className="text-[11px] sm:text-xs text-center text-[#011C40]/70">
            Hemos enviado un código de verificación a tu correo
          </p>
        </div>

        <div className="flex justify-center gap-3">
          {codeDigits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {inputsRef.current[idx] = el}}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="h-10 w-10 rounded-md border border-slate-200 text-center text-lg text-[#011C40] focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743] outline-none"
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
            />
          ))}
        </div>

        {error && (
          <p className="text-[11px] sm:text-xs text-red-600 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-[#224D73] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#224D73]/90 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#F68743] transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Verificando..." : "Continuar"}
        </button>

        <div className="pt-1 text-center text-[11px] sm:text-xs text-[#011C40]/70">
          ¿No has recibido el código?{" "}
          <button
            type="button"
            className="font-semibold text-[#F68743] hover:underline disabled:opacity-60"
            onClick={handleResend}
            disabled={resendLoading}
          >
            {resendLoading ? "Reenviando..." : "Reenviar código"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};
