import type { ProviderContact } from "../../domain/types";

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm font-semibold text-slate-900 text-right break-all">{value}</div>
    </div>
  );
}

export default function ProviderContactCard({ contact }: { contact: ProviderContact }) {
  return (
    <aside className="bg-white border border-slate-100 rounded-2xl p-5 h-fit lg:sticky lg:top-6">
      <h2 className="text-base font-semibold text-[#011C40]">Contacto</h2>
      <div className="mt-4 space-y-3">
        <Row label="Teléfono" value={contact.phone} />
        <Row label="WhatsApp" value={contact.whatsapp} />
        <Row label="Email" value={contact.email} />
        <Row label="Sitio web" value={contact.website} />
        <Row label="Dirección" value={contact.address} />
      </div>

      {/* CTA mock */}
      <button
        type="button"
        className="mt-5 w-full rounded-xl bg-[#F68743] px-4 py-3 text-sm font-semibold text-white hover:bg-[#f46f1f] transition"
        onClick={() => console.log("contact-provider")}
      >
        Contactar proveedor
      </button>
    </aside>
  );
}
