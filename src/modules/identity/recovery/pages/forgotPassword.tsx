import React, { useState } from "react";
import { AuthLayout } from "../../registration/authLayout";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateEmail = (value: string) => {
        if (!value) return "El correo es obligatorio.";
        if (!emailRegex.test(value)) return "Ingresa un correo electrónico válido.";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const ErroMail = validateEmail(email)
        setEmailError(ErroMail);

        if(ErroMail) return;

        try {
            setLoading(true);
            setError(null);
            navigate("/auth/password-reset");
        } catch (err: any) {
            setError(err.message || "Correo ya registrado");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <button
                    type="button"
                    className="flex items-center gap-1 text-xs text-[#111827]/80 hover:text-[#111827]"
                    onClick={() => navigate(-1)}
                >
                    <HiOutlineArrowLeft className="h-4 w-4" />
                    <span>Volver</span>
                </button>

                <div className="flex flex-col items-center space-y-2">

                    <h2 className="text-base sm:text-lg font-semibold text-[#111827]">
                        ¿Olvidaste tu contraseña?
                    </h2>
                    <p className="text-[11px] sm:text-xs text-center text-[#6B7280]/70">
                        Ingresa el correo asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
                    </p>
                </div>

                <div className="space-y-3">
                    <label className="flex flex-col gap-1 text-[11px] sm:text-xs text-[#011C40]">
                        Correo Electrónico
                        <input
                            type="text"
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
                <div className="flex flex-col items-center space-y-2">
                    <p className="text-[11px] sm:text-xs text-center text-[#6B7280]/70">
                        Si aun no has podido recuperar tu contraseña, por favor contactanos al siguiente correo soporte@ene8.com.mx
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};

