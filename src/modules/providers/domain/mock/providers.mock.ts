import type { ProviderProfile } from "../types";

export const PROVIDERS_MOCK: ProviderProfile[] = [
  {
    id: "p1",
    name: "TechSolution MX",
    rating: 4.8,
    description:
      "Proveedor mayorista de hardware y accesorios. Entregas rápidas y soporte post-venta.",
    coverImageUrl:
      "https://images.pexels.com/photos/3747481/pexels-photo-3747481.jpeg?auto=compress&cs=tinysrgb&w=1200",
    avatarImageUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    location: "Zapopan, Jalisco",
    contact: {
      phone: "+52 33 1234 5678",
      email: "ventas@techsolution.mx",
      whatsapp: "+52 33 1234 5678",
      website: "https://techsolution.mx",
      address: "Av. Ejemplo 123, Zapopan, Jal.",
    },
    sections: [
      { id: "s-products", label: "Productos", type: "products" },
      { id: "s-about", label: "Acerca", type: "about" },
      { id: "s-policies", label: "Políticas", type: "policies" },
      { id: "s-reviews", label: "Reseñas", type: "reviews" },
    ],
    productIds: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: "p2",
    name: "Stereo Lab",
    rating: 4.7,
    description:
      "Especialistas en audio profesional y equipos de sonido. Marcas reconocidas a precios competitivos.",
    coverImageUrl:
      "https://images.pexels.com/photos/3945662/pexels-photo-3945662.jpeg?auto=compress&cs=tinysrgb&w=1200",
    avatarImageUrl:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300",
    location: "Guadalajara, Jalisco",
    contact: {
      phone: "+52 33 9876 5432",
      email: "contacto@stereolab.mx",
      whatsapp: "+52 33 9876 5432",
      website: "https://stereolab.mx",
      address: "Calle López Cotilla 456, Guadalajara, Jal.",
    },
    sections: [
      { id: "s-products", label: "Productos", type: "products" },
      { id: "s-about", label: "Acerca", type: "about" },
      { id: "s-policies", label: "Políticas", type: "policies" },
      { id: "s-reviews", label: "Reseñas", type: "reviews" },
    ],
    productIds: [2, 4, 6, 8],
  },
  {
    id: "p3",
    name: "RedNet Distribuciones",
    rating: 4.5,
    description:
      "Distribuidora de redes, cableado estructurado y telecomunicaciones. Envíos a toda la república.",
    coverImageUrl:
      "https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=1200",
    avatarImageUrl:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
    location: "Monterrey, Nuevo León",
    contact: {
      phone: "+52 81 5555 1234",
      email: "ventas@rednet.mx",
      whatsapp: "+52 81 5555 1234",
      website: "https://rednet.mx",
      address: "Av. Constitución 789, Monterrey, N.L.",
    },
    sections: [
      { id: "s-products", label: "Productos", type: "products" },
      { id: "s-about", label: "Acerca", type: "about" },
      { id: "s-policies", label: "Políticas", type: "policies" },
      { id: "s-reviews", label: "Reseñas", type: "reviews" },
    ],
    productIds: [3, 5, 7],
  },
  {
    id: "p4",
    name: "SecureCam Pro",
    rating: 4.9,
    description:
      "Cámaras de seguridad, DVRs y sistemas CCTV. Instalación y asesoría incluida para mayoristas.",
    coverImageUrl:
      "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1200",
    avatarImageUrl:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
    location: "CDMX, Ciudad de México",
    contact: {
      phone: "+52 55 4321 8765",
      email: "info@securecampro.mx",
      whatsapp: "+52 55 4321 8765",
      website: "https://securecampro.mx",
      address: "Insurgentes Sur 1024, CDMX.",
    },
    sections: [
      { id: "s-products", label: "Productos", type: "products" },
      { id: "s-about", label: "Acerca", type: "about" },
      { id: "s-policies", label: "Políticas", type: "policies" },
      { id: "s-reviews", label: "Reseñas", type: "reviews" },
    ],
    productIds: [1, 3, 5, 7],
  },
  {
    id: "p5",
    name: "CompuMayoreo",
    rating: 4.3,
    description:
      "Venta mayorista de laptops, PCs armadas y componentes. Precios especiales para revendedores.",
    coverImageUrl:
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1200",
    avatarImageUrl:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300",
    location: "Puebla, Puebla",
    contact: {
      phone: "+52 222 111 2233",
      email: "mayoreo@compumayoreo.mx",
      whatsapp: "+52 222 111 2233",
      website: "https://compumayoreo.mx",
      address: "Blvd. 5 de Mayo 300, Puebla, Pue.",
    },
    sections: [
      { id: "s-products", label: "Productos", type: "products" },
      { id: "s-about", label: "Acerca", type: "about" },
      { id: "s-policies", label: "Políticas", type: "policies" },
      { id: "s-reviews", label: "Reseñas", type: "reviews" },
    ],
    productIds: [1, 2, 4, 6, 8],
  },
  {
    id: "p6",
    name: "ElectroFerr MX",
    rating: 4.6,
    description:
      "Ferretería electrónica y suministros eléctricos al mayoreo. Catálogo extenso y envíos express.",
    coverImageUrl:
      "https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=1200",
    avatarImageUrl:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
    location: "León, Guanajuato",
    contact: {
      phone: "+52 477 333 4455",
      email: "pedidos@electroferr.mx",
      whatsapp: "+52 477 333 4455",
      website: "https://electroferr.mx",
      address: "Av. Insurgentes 567, León, Gto.",
    },
    sections: [
      { id: "s-products", label: "Productos", type: "products" },
      { id: "s-about", label: "Acerca", type: "about" },
      { id: "s-policies", label: "Políticas", type: "policies" },
      { id: "s-reviews", label: "Reseñas", type: "reviews" },
    ],
    productIds: [2, 3, 5, 6, 7],
  },
];
