import type { Product } from "../types";

export const PRODUCTS: Product[] = Array.from({ length: 48 }).map((_, i) => {
  const categoryId = ["c1", "c2", "c3", "c4"][i % 4];
  const price = [1500, 4500, 999, 2300][i % 4];

  return {
    id: `p${i + 1}`,
    title: `Producto ${i + 1} - Ejemplo para Tu Oferta MX`,
    price,
    oldPrice: i % 5 === 0 ? price + 500 : undefined,
    rating: (i % 5) + 1,
    reviewsCount: 5 + (i % 40),
    imageUrl: "https://via.placeholder.com/400x400.png?text=Producto",
    categoryId,
    brand: ["Logitech", "TP-Link", "Asus", "AMD"][i % 4],
    stock: i % 7 === 0 ? 0 : 10 + (i % 20),
    images: [
      "https://via.placeholder.com/600x600.png?text=Foto+1",
      "https://via.placeholder.com/600x600.png?text=Foto+2",
      "https://via.placeholder.com/600x600.png?text=Foto+3",
    ],
    description: "Descripción de ejemplo del producto para pruebas del detalle.",
    specs: [
      { label: "Modelo", value: "MX-123" },
      { label: "Color", value: "Negro" },
      { label: "Conectividad", value: "Bluetooth" },
    ],
  };
});
