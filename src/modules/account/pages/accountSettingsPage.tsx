import React, { useState, useEffect } from "react";
import {
  HiOutlineCog,
  HiOutlineCreditCard,
  HiOutlineBell,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
  HiOutlineCheck,
  HiOutlineX,
} from "react-icons/hi";

/* ================================================================
   TIPOS
   ================================================================ */

type SettingsSectionKey = "profile" | "payments" | "notifications";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface PaymentMethod {
  id: number;
  brand: string;
  cardHolder: string;
  last4: string;
  primary: boolean;
}

/* ================================================================
   HELPERS LOCALSTORAGE
   ================================================================ */

const PROFILE_KEY = "demo_user_profile";
const PAYMENTS_KEY = "demo_payment_methods";

function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return {
    fullName: "Nombre del Usuario",
    email: "usuario@correo.com",
    phone: "+52 443 123 4567",
    address: "",
  };
}

function saveProfile(p: UserProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

function loadPayments(): PaymentMethod[] {
  try {
    const raw = localStorage.getItem(PAYMENTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return [
    { id: 1, brand: "Visa", cardHolder: "Usuario", last4: "1234", primary: true },
    { id: 2, brand: "Mastercard", cardHolder: "Usuario", last4: "5678", primary: false },
  ];
}

function savePayments(p: PaymentMethod[]) {
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(p));
}

/* ================================================================
   SIDEBAR NAV
   ================================================================ */

const sections: { key: SettingsSectionKey; label: string; icon: React.ReactNode }[] = [
  { key: "profile", label: "Datos de la cuenta", icon: <HiOutlineCog className="h-4 w-4" /> },
  { key: "payments", label: "Métodos de pago", icon: <HiOutlineCreditCard className="h-4 w-4" /> },
  { key: "notifications", label: "Notificaciones", icon: <HiOutlineBell className="h-4 w-4" /> },
];

/* ================================================================
   PAGE
   ================================================================ */

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
        </main>
      </div>
    </div>
  );
};

/* ================================================================
   SECCIÓN: DATOS DE LA CUENTA
   ================================================================ */

const ProfileSection: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  function startEdit(field: string, initial: Partial<UserProfile>) {
    setEditingField(field);
    setDraft(initial);
  }

  function cancelEdit() {
    setEditingField(null);
    setDraft({});
  }

  function confirmEdit() {
    setProfile((prev) => ({ ...prev, ...draft }));
    setEditingField(null);
    setDraft({});
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center text-sm font-semibold text-slate-500 uppercase">
            {profile.fullName
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#011C40]">{profile.fullName}</p>
            <p className="text-xs text-slate-500">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Nombre completo */}
      <EditableRow
        label="Nombre completo"
        description="Este nombre se mostrará a los proveedores al realizar pedidos."
        isEditing={editingField === "fullName"}
        onEdit={() => startEdit("fullName", { fullName: profile.fullName })}
        onCancel={cancelEdit}
        onConfirm={confirmEdit}
        display={<p>{profile.fullName}</p>}
        editor={
          <input
            type="text"
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
            value={draft.fullName ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))}
            autoFocus
          />
        }
      />

      {/* Contacto */}
      <EditableRow
        label="Contacto"
        description="Usaremos estos datos para notificaciones importantes de tu cuenta."
        isEditing={editingField === "contact"}
        onEdit={() => startEdit("contact", { phone: profile.phone, email: profile.email })}
        onCancel={cancelEdit}
        onConfirm={confirmEdit}
        display={
          <>
            <p>Teléfono: {profile.phone}</p>
            <p>Correo: {profile.email}</p>
          </>
        }
        editor={
          <div className="space-y-2">
            <label className="flex flex-col gap-1 text-[11px] text-slate-500">
              Teléfono
              <input
                type="tel"
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
                value={draft.phone ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                autoFocus
              />
            </label>
            <label className="flex flex-col gap-1 text-[11px] text-slate-500">
              Correo electrónico
              <input
                type="email"
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
                value={draft.email ?? ""}
                onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
              />
            </label>
          </div>
        }
      />

      {/* Dirección */}
      <EditableRow
        label="Dirección"
        description="Agrega tu dirección para agilizar tus pedidos."
        isEditing={editingField === "address"}
        onEdit={() => startEdit("address", { address: profile.address })}
        onCancel={cancelEdit}
        onConfirm={confirmEdit}
        display={
          <p>{profile.address || "Aún no has agregado una dirección principal."}</p>
        }
        editor={
          <input
            type="text"
            placeholder="Calle, número, colonia, ciudad, estado, CP"
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
            value={draft.address ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
            autoFocus
          />
        }
      />
    </div>
  );
};

/* ================================================================
   COMPONENTE: FILA EDITABLE
   ================================================================ */

interface EditableRowProps {
  label: string;
  description?: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  display: React.ReactNode;
  editor: React.ReactNode;
}

const EditableRow: React.FC<EditableRowProps> = ({
  label,
  description,
  isEditing,
  onEdit,
  onCancel,
  onConfirm,
  display,
  editor,
}) => (
  <section className="border border-slate-200 rounded-xl px-4 py-3 flex flex-col gap-3">
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs font-semibold text-[#011C40]">{label}</p>

      {!isEditing ? (
        <button
          type="button"
          onClick={onEdit}
          className="self-start inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs text-[#011C40] hover:bg-slate-50"
        >
          <HiOutlinePencil className="h-3.5 w-3.5" />
          Editar
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-1 rounded-md bg-[#F68743] px-3 py-1.5 text-xs text-white hover:bg-[#f46f1f]"
          >
            <HiOutlineCheck className="h-3.5 w-3.5" />
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            <HiOutlineX className="h-3.5 w-3.5" />
            Cancelar
          </button>
        </div>
      )}
    </div>

    {isEditing ? (
      <div>{editor}</div>
    ) : (
      <div className="text-xs text-slate-700">{display}</div>
    )}

    {description && (
      <p className="text-[11px] text-slate-400">{description}</p>
    )}
  </section>
);

/* ================================================================
   SECCIÓN: MÉTODOS DE PAGO
   ================================================================ */

const PaymentsSection: React.FC = () => {
  const [cards, setCards] = useState<PaymentMethod[]>(loadPayments);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Drafts para crear / editar
  const [draftBrand, setDraftBrand] = useState("Visa");
  const [draftHolder, setDraftHolder] = useState("");
  const [draftNumber, setDraftNumber] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    savePayments(cards);
  }, [cards]);

  function resetForm() {
    setDraftBrand("Visa");
    setDraftHolder("");
    setDraftNumber("");
    setFormError(null);
    setShowForm(false);
    setEditingId(null);
  }

  function openNew() {
    resetForm();
    setShowForm(true);
  }

  function openEdit(card: PaymentMethod) {
    setEditingId(card.id);
    setDraftBrand(card.brand);
    setDraftHolder(card.cardHolder);
    setDraftNumber(""); // no mostramos el número completo
    setFormError(null);
    setShowForm(true);
  }

  function validate(): boolean {
    if (!draftHolder.trim()) {
      setFormError("El nombre del titular es obligatorio.");
      return false;
    }
    if (editingId === null && draftNumber.replace(/\s/g, "").length < 12) {
      setFormError("Ingresa un número de tarjeta válido (mínimo 12 dígitos).");
      return false;
    }
    setFormError(null);
    return true;
  }

  function saveCard() {
    if (!validate()) return;

    if (editingId !== null) {
      // Editar existente
      setCards((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? {
                ...c,
                brand: draftBrand,
                cardHolder: draftHolder.trim(),
                ...(draftNumber.replace(/\s/g, "").length >= 12
                  ? { last4: draftNumber.replace(/\s/g, "").slice(-4) }
                  : {}),
              }
            : c
        )
      );
    } else {
      // Crear nuevo
      const last4 = draftNumber.replace(/\s/g, "").slice(-4);
      const isFirst = cards.length === 0;
      const newCard: PaymentMethod = {
        id: Date.now(),
        brand: draftBrand,
        cardHolder: draftHolder.trim(),
        last4,
        primary: isFirst,
      };
      setCards((prev) => [...prev, newCard]);
    }

    resetForm();
  }

  function deleteCard(id: number) {
    setCards((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      // Si eliminamos la principal, la primera pasa a ser principal
      if (filtered.length > 0 && !filtered.some((c) => c.primary)) {
        filtered[0].primary = true;
      }
      return filtered;
    });
    if (editingId === id) resetForm();
  }

  function setPrimary(id: number) {
    setCards((prev) =>
      prev.map((c) => ({ ...c, primary: c.id === id }))
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm sm:text-base font-semibold text-[#011C40]">Métodos de pago</h2>
      <p className="text-xs text-slate-500">
        Administra las tarjetas y métodos de pago que usas para tus compras.
      </p>

      {/* Lista de tarjetas */}
      <div className="space-y-3">
        {cards.length === 0 && (
          <p className="text-xs text-slate-400 py-4 text-center">
            No tienes métodos de pago registrados.
          </p>
        )}

        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-xs"
          >
            <div>
              <p className="font-semibold text-[#011C40]">
                {card.brand} •••• {card.last4}
              </p>
              <p className="text-[11px] text-slate-500">{card.cardHolder}</p>
              {card.primary && (
                <p className="text-[11px] text-[#F68743] font-medium">Método principal</p>
              )}
            </div>

            <div className="flex gap-2">
              {!card.primary && (
                <button
                  type="button"
                  onClick={() => setPrimary(card.id)}
                  className="rounded-md border border-slate-200 px-3 py-1.5 text-[11px] text-[#011C40] hover:bg-slate-50"
                >
                  Hacer principal
                </button>
              )}
              <button
                type="button"
                onClick={() => openEdit(card)}
                className="rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] text-[#011C40] hover:bg-slate-50"
              >
                <HiOutlinePencil className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => deleteCard(card.id)}
                className="rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] text-red-600 hover:bg-red-50"
              >
                <HiOutlineTrash className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulario crear / editar */}
      {showForm ? (
        <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-slate-50/50">
          <h3 className="text-xs font-semibold text-[#011C40]">
            {editingId !== null ? "Editar método de pago" : "Nuevo método de pago"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-[11px] text-slate-500">
              Tipo de tarjeta
              <select
                value={draftBrand}
                onChange={(e) => setDraftBrand(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
              >
                <option>Visa</option>
                <option>Mastercard</option>
                <option>American Express</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 text-[11px] text-slate-500">
              Titular de la tarjeta
              <input
                type="text"
                value={draftHolder}
                onChange={(e) => setDraftHolder(e.target.value)}
                placeholder="Nombre como aparece en la tarjeta"
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-[11px] text-slate-500">
            Número de tarjeta
            {editingId !== null && (
              <span className="text-[10px] text-slate-400">
                Deja vacío para conservar el número actual
              </span>
            )}
            <input
              type="text"
              inputMode="numeric"
              maxLength={19}
              value={draftNumber}
              onChange={(e) => {
                // Solo dígitos y espacios
                const v = e.target.value.replace(/[^\d\s]/g, "");
                setDraftNumber(v);
              }}
              placeholder="1234 5678 9012 3456"
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-[#011C40] outline-none focus:border-[#F68743] focus:ring-1 focus:ring-[#F68743]"
            />
          </label>

          {formError && (
            <p className="text-[11px] text-red-600">{formError}</p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={saveCard}
              className="inline-flex items-center gap-1 rounded-md bg-[#F68743] px-4 py-2 text-xs font-semibold text-white hover:bg-[#f46f1f]"
            >
              <HiOutlineCheck className="h-3.5 w-3.5" />
              {editingId !== null ? "Guardar cambios" : "Añadir tarjeta"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50"
            >
              <HiOutlineX className="h-3.5 w-3.5" />
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openNew}
          className="mt-2 inline-flex items-center gap-1 rounded-md border border-dashed border-slate-300 px-4 py-2 text-xs text-[#011C40] hover:bg-slate-50"
        >
          <HiOutlinePlus className="h-3.5 w-3.5" />
          Añadir método de pago
        </button>
      )}
    </div>
  );
};

/* ================================================================
   SECCIÓN: NOTIFICACIONES
   ================================================================ */

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
