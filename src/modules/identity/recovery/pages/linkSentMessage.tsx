import React from "react";
import { AuthLayout } from "../../registration/authLayout";
import { HiOutlineMail } from "react-icons/hi";


export const LinkSentMessage: React.FC = () => {

    return (
        <AuthLayout>
            <div className="flex flex-col items-center space-y-4">
                <HiOutlineMail className="h-12 w-12 text-[#F68743]" />
                <h2 className="text-base sm:text-lg font-semibold text-[#111827] text-center">
                    Revisa tu correo
                </h2>
                <p className="text-[11px] sm:text-xs text-center text-[#6B7280]/70">
                    Hemos enviado un enlace para restablecer tu contraseña al correo proporcionado. Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
                </p>
            </div>
        </AuthLayout>
    );
};

