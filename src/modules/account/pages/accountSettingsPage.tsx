import React, { useState } from "react";
import { HiOutlineCog, HiOutlineCreditCard, HiOutlineBell, HiOutlineBriefcase } from "react-icons/hi";

type SettingsSectionKey = "profile" | "payments" | "notifications" | "provider";

const sections: { key: SettingsSectionKey; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Datos de la cuenta", icon: <HiOutlineCog className="h-4 w-4" /> },
  { key: "payments", label: "Métodos de pago", icon: <HiOutlineCreditCard className="h-4 w-4" /> },
  { key: "notifications", label: "Notificaciones", icon: <HiOutlineBell className="h-4 w-4" /> },
  { key: "provider", label: "Conviértete en proveedor", icon: <HiOutlineBriefcase className="h-4 w-4" /> },
];

export const AccountSettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSectionKey>("profile");

  return (
    <div className="bg-[#F5F7FA] min-h-[calc(100vh-64px)] px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row overflow-hidden">
        {/* SIDEBAR */}
        <aside className="border-b md:border-b-0 md:border-r border-slate-200 w-full md:w-64 bg-slate-50/40">
          <div className="px-4 py-4 border-b border-slate-200">
            <h1 className="text-lg font-semibold text-[#011C40]">Configuración</h1>
          </div>

          {/* En móvil, que se vea horizontal scroll de las tabs */}
          <nav className="flex md:flex-col gap-1 px-2 py-3 overflow-x-auto">
            {sections.map((section) => {
              const isActive = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setActiveSection(section.key)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs sm:text-sm shrink-0 md:shrink md:w-full
                    ${isActive ? "bg-white text-[#011C40] shadow-sm border border-slate-200" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <span className={isActive ? "text-[#F68743]" : "text-slate-400"}>
                    {section.icon}
                  </span>
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 px-4 sm:px-6 py-5">
          {activeSection === "profile" && <ProfileSection />}
          {activeSection === "payments" && <PaymentsSection />}
          {activeSection === "notifications" && <NotificationsSection />}
          {activeSection === "provider" && <ProviderSection />}
        </main>
      </div>
    </div>
  );
};

/* ================= SECCIÓN: DATOS DE LA CUENTA ================= */

const ProfileSection: React.FC = () => {
  // De momento datos mock; luego los conectas a tu API
  const mockUser = {
    fullName: "Nombre del Usuario",
    email: "usuario@correo.com",
    phone: "+52 443 123 4567",
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-sm text-slate-500">
            {/* Aquí luego irá la imagen de perfil */}
            <span>Foto</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#011C40]">{mockUser.fullName}</p>
            <p className="text-xs text-slate-500">{mockUser.email}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs text-red-600 hover:bg-red-100"
          >
            Eliminar cuenta
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs text-[#011C40] hover:bg-slate-50"
          >
            Subir foto
          </button>
        </div>
      </div>

      {/* Bloques de info */}
      <InfoRow
        label="Nombre completo"
        value={mockUser.fullName}
        description="Este nombre se mostrará a los proveedores al realizar pedidos."
      />
      <InfoRow
        label="Contacto"
        value={
          <>
            <p>Teléfono: {mockUser.phone}</p>
            <p>Correo: {mockUser.email}</p>
          </>
        }
        description="Usaremos estos datos para notificaciones importantes de tu cuenta."
      />
      <InfoRow
        label="Dirección"
        value={"Aún no has agregado una dirección principal."}
        description="Agrega tu dirección para agilizar tus pedidos."
      />
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  description?: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, description }) => (
  <section className="border border-slate-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
    <div className="space-y-1">
      <p className="text-xs font-semibold text-[#011C40]">{label}</p>
      <div className="text-xs text-slate-700">{value}</div>
      {description && (
        <p className="text-[11px] text-slate-400">
          {description}
        </p>
      )}
    </div>

    <button
      type="button"
      className="self-start rounded-md border border-slate-200 px-3 py-1.5 text-xs text-[#011C40] hover:bg-slate-50"
    >
      Editar
    </button>
  </section>
);

/* ================= SECCIÓN: MÉTODOS DE PAGO ================= */

const PaymentsSection: React.FC = () => {
  const mockCards = [
    { id: 1, brand: "Visa", last4: "1234", primary: true },
    { id: 2, brand: "Mastercard", last4: "5678", primary: false },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-sm sm:text-base font-semibold text-[#011C40]">Métodos de pago</h2>
      <p className="text-xs text-slate-500">
        Administra las tarjetas y métodos de pago que usas para tus compras.
      </p>

      <div className="space-y-3">
        {mockCards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-xs"
          >
            <div>
              <p className="font-semibold text-[#011C40]">
                {card.brand} •••• {card.last4}
              </p>
              {card.primary && (
                <p className="text-[11px] text-[#F68743] font-medium">
                  Método principal
                </p>
              )}
            </div>

            <div className="flex gap-2">
              {!card.primary && (
                <button
                  type="button"
                  className="rounded-md border border-slate-200 px-3 py-1.5 text-[11px] text-[#011C40] hover:bg-slate-50"
                >
                  Hacer principal
                </button>
              )}
              <button
                type="button"
                className="rounded-md border border-slate-200 px-3 py-1.5 text-[11px] text-red-600 hover:bg-red-50"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-2 inline-flex items-center rounded-md border border-dashed border-slate-300 px-4 py-2 text-xs text-[#011C40] hover:bg-slate-50"
      >
        + Añadir método de pago
      </button>
    </div>
  );
};

/* ================= SECCIÓN: NOTIFICACIONES ================= */

const NotificationsSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-sm sm:text-base font-semibold text-[#011C40]">
        Notificaciones
      </h2>
      <p className="text-xs text-slate-500">
        Elige qué tipo de notificaciones quieres recibir en tu correo.
      </p>

      <div className="space-y-3">
        <NotificationToggle
          title="Ofertas y promociones"
          description="Recibe correos con ofertas especiales y promociones de proveedores."
          defaultChecked
        />
        <NotificationToggle
          title="Actualizaciones de pedidos"
          description="Te notificaremos cuando el estado de tus pedidos cambie."
          defaultChecked
        />
        <NotificationToggle
          title="Novedades de la plataforma"
          description="Noticias, cambios importantes y nuevas funcionalidades de Tu Oferta MX."
        />
      </div>
    </div>
  );
};

interface NotificationToggleProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({
  title,
  description,
  defaultChecked,
}) => {
  const [checked, setChecked] = useState(!!defaultChecked);

  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3">
      <div>
        <p className="text-xs font-semibold text-[#011C40]">{title}</p>
        <p className="text-[11px] text-slate-500">{description}</p>
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
            checked ? "bg-[#F68743]" : "bg-slate-300"
          }`}
        >
          <span
            className={`h-4 w-4 rounded-full bg-white shadow transform transition ${
              checked ? "translate-x-4" : "translate-x-1"
            }`}
          />
        </span>
      </label>
    </div>
  );
};

/* ================= SECCIÓN: CONVIÉRTETE EN PROVEEDOR ================= */

const ProviderSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-sm sm:text-base font-semibold text-[#011C40]">
        Conviértete en proveedor
      </h2>
      <p className="text-xs text-slate-500">
        Completa la siguiente información para enviar tu solicitud y poder
        publicar tus productos como proveedor en Tu Oferta MX.
      </p>

      <form className="space-y-4 max-w-md">
        <div className="space-y-1 text-xs">
          <label className="text-[#011C40] font-medium">
            Nombre de la empresa
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
            placeholder="Ej. TechSolution MX"
          />
        </div>

        <div className="space-y-1 text-xs">
          <label className="text-[#011C40] font-medium">
            RFC (opcional)
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
            placeholder="RFC de la empresa"
          />
        </div>

        <div className="space-y-1 text-xs">
          <label className="text-[#011C40] font-medium">
            Sitio web o redes sociales (opcional)
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
            placeholder="https://"
          />
        </div>

        <div className="space-y-1 text-xs">
          <label className="text-[#011C40] font-medium">
            Descripción de tu empresa
          </label>
          <textarea
            className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743] min-h-[90px]"
            placeholder="Cuéntanos brevemente qué productos ofreces y a qué tipo de clientes te diriges."
          />
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center rounded-md bg-[#F68743] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#f46f1f] transition"
        >
          Enviar solicitud
        </button>
      </form>
    </div>
  );
};
