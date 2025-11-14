import React, { useState } from "react";
import { AuthLayout } from "../authLayout";
import { useRegistration } from "../registrationContext";
import { completeRegistration } from "../../services/authService";
import { HiOutlineArrowLeft, HiOutlineCog } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { parsePhoneNumberWithError } from "libphonenumber-js";

export const CompleteAccountPage: React.FC = () => {
    const { email } = useRegistration();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneValue, setPhoneValue] = useState<string | undefined>(undefined);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("No se encontró el correo de registro.");
            return;
        }
        if (!phoneValue) {
            setError("Ingresa un número de teléfono válido.");
            return;
        }

        if (!phoneValue) {
            setError("Ingresa un número de teléfono válido.");
            return;
        }

        let prefixPhoneNumber = "";
        let phoneNumber = "";

        try {
            const parsed = parsePhoneNumberWithError(phoneValue); // puede lanzar error

            if (!parsed.isValid()) {
                setError("Ingresa un número de teléfono válido.");
                return;
            }

            prefixPhoneNumber = `+${parsed.countryCallingCode}`; // ej: +52
            phoneNumber = parsed.nationalNumber;                 // ej: 4431234567
        } catch {
            setError("Ingresa un número de teléfono válido.");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const tokens = await completeRegistration({
                email,
                name,
                lastName,
                prefixPhoneNumber,
                phoneNumber,
            });

            // guardar tokens como en login
            localStorage.setItem("accessToken", tokens.accessToken);
            localStorage.setItem("refreshToken", tokens.refreshToken);

            // limpiar email pendiente
            localStorage.removeItem("pendingRegistrationEmail");

            // redirigir a home (o dashboard)
            navigate("/");
        } catch (err: any) {
            setError(err.message || "No se pudo completar el registro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Back */}
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
                        <HiOutlineCog className="h-4 w-4 text-[#011C40]" />
                    </div>
                    <h2 className="text-base sm:text-lg font-semibold text-[#011C40]">
                        Configura tu cuenta
                    </h2>
                    <p className="text-[11px] sm:text-xs text-center text-[#011C40]/70">
                        Ingresa tus datos
                    </p>
                </div>

                <div className="space-y-3">
                    <label className="flex flex-col gap-1 text-[11px] sm:text-xs text-[#011C40]">
                        Nombre(s)
                        <input
                            type="text"
                            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-[11px] sm:text-xs text-[#011C40]">
                        Apellidos
                        <input
                            type="text"
                            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-[11px] sm:text-xs text-[#011C40]">
                        Teléfono
                        <PhoneInput
                            international
                            defaultCountry="MX"
                            value={phoneValue}
                            onChange={setPhoneValue}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs sm:text-sm text-[#011C40] focus-within:border-[#F68743] focus-within:ring-1 focus-within:ring-[#F68743]"
                        />
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
                    {loading ? "Guardando..." : "Continuar"}
                </button>
            </form>
        </AuthLayout>
    );
};
