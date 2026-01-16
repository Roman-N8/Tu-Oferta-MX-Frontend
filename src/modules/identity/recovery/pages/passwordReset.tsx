import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../../registration/authLayout";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,16}$/;

export const PasswordResetPage: React.FC = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirm_password, setPasswordConfirm] = useState("");

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordConfirmError, setPasswordConfirmError] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

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

        const pErr = validatePassword(password);
        const pcErr = validatePasswordConfirm(confirm_password);

        setPasswordError(pErr);
        setPasswordConfirmError(pcErr);

        if (pErr || pcErr) return;
        try {
            setLoading(true);
            navigate("/");
        } catch (err: any) {
            // Handle error if needed
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <form className="w-full max-w-md space-y-5 sm:space-y-6"  onSubmit={handleSubmit}>
                <div className="flex flex-col items-center space-y-2">

                    <h2 className="text-base sm:text-lg font-semibold text-[#111827]">
                        Crea una contraseña nueva
                    </h2>
                    <p className="text-[11px] sm:text-xs text-center text-[#6B7280]/70">
                        Ingresa una nueva contraseña.
                        Tu nueva contraseña debe contener 8 a 16 caracteres, mayusculas, minusculas, numeros y caracteres especiales 
                    </p>
                </div>

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

                <button
                    type="submit"
                    className="mt-2 w-full rounded-md bg-[#224D73] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#224D73]/90 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#F68743] transition disabled:opacity-60"
                    disabled={loading}
                >
                    {loading ? "Cambiando contraseña..." : "Continuar"}
                </button>
            </form>
        </AuthLayout>
    );
};
