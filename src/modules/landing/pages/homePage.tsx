import React from "react";
import heroBg from "../../../assets/Background blur.png";
import { HiOutlineChevronDown } from "react-icons/hi";
import { ProviderCard, type ProviderCardProps } from "../../providers/components/providerCard";
import { ProductCarouselSection } from "../../catalog/components/productCarouselSection";
import { type ProductCardProps } from "../../catalog/components/productCard";

import { useCart } from "../../cart/hooks/useCart";
import { useNavigate } from "react-router-dom";

import p1 from "../../../assets/products/p1.png";
import p2 from "../../../assets/products/p2.png";
// import p3 from "../../../assets/products/p3.png";
// import p4 from "../../../assets/products/p4.png";
// import p5 from "../../../assets/products/p5.png";
import p6 from "../../../assets/products/p6.png";
import p7 from "../../../assets/products/p7.png";
import p8 from "../../../assets/products/p8.png";

// Mock temporal
const providersMock: ProviderCardProps[] = [
  {
    providerId: "p1",
    name: "TechSolution MX",
    rating: 4.5,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Zapopan, Jalisco",
    coverImage:
      "https://images.pexels.com/photos/3747481/pexels-photo-3747481.jpeg?auto=compress&cs=tinysrgb&w=800",
    avatarImage:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    providerId: "p2",
    name: "Stereo Lab",
    rating: 4.7,
    description:
      "Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    location: "Guadalajara, Jalisco",
    coverImage:
      "https://images.pexels.com/photos/3945662/pexels-photo-3945662.jpeg?auto=compress&cs=tinysrgb&w=800",
    avatarImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    providerId: "p3",
    name: "TechSolution MX",
    rating: 4.8,
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    location: "Zapopan, Jalisco",
    coverImage:
      "https://images.pexels.com/photos/3747481/pexels-photo-3747481.jpeg?auto=compress&cs=tinysrgb&w=800",
    avatarImage:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

const bestSellersMock: (ProductCardProps & { category: string })[] = [
  {
    id: 1,
    brand: "Asus",
    name: "Asus Motherboard AMD B550, Prime B550M-A AC, AM4 mATX...",
    imageUrl: p6,
    rating: 0,
    reviewCount: 0,
    price: 4500,
    category: "Todo",
  },
  {
    id: 2,
    brand: "Logitech",
    name: "Logitech Mouse inalámbrico M185, diseño ergonómico...",
    imageUrl: p7,
    rating: 4.7,
    reviewCount: 6,
    price: 1500,
    oldPrice: 2680,
    discountPercent: 56,
    category: "Categoría 1",
  },
  {
    id: 3,
    brand: "QIN",
    name: "Bobina De Cable Utp Cat6, Para Interior, 100 Metros...",
    imageUrl: p8,
    rating: 4.3,
    reviewCount: 2,
    price: 450,
    category: "Categoría 2",
  },
  {
    id: 4,
    brand: "TP-Link",
    name: "TP-Link Tapo C520WS, Cámara de Seguridad Wi-Fi...",
    imageUrl: p2,
    rating: 4.8,
    reviewCount: 10,
    price: 4500,
    category: "Categoría 3",
  },
  {
    id: 5,
    brand: "TP-Link",
    name: "TP-Link Tapo C520WS, Cámara de Seguridad Wi-Fi...",
    imageUrl: p2,
    rating: 4.8,
    reviewCount: 10,
    price: 4500,
    category: "Categoría 1",
  },
  {
    id: 6,
    brand: "TP-Link",
    name: "TP-Link Tapo C520WS, Cámara de Seguridad Wi-Fi...",
    imageUrl: p8,
    rating: 4.8,
    reviewCount: 10,
    price: 4500,
    category: "Categoría 2",
  },
  {
    id: 7,
    brand: "TP-Link",
    name: "TP-Link Tapo C520WS, Cámara de Seguridad Wi-Fi...",
    imageUrl: p1,
    rating: 4.8,
    reviewCount: 10,
    price: 4500,
    category: "Categoría 3",
  },
  {
    id: 8,
    brand: "TP-Link",
    name: "TP-Link Tapo C520WS, Cámara de Seguridad Wi-Fi...",
    imageUrl: p2,
    rating: 4.8,
    reviewCount: 10,
    price: 4500,
    category: "Categoría 4",
  },
];

export const HomePage: React.FC = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  return (
    <>
      {/* HERO */}
      <section
        className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10 bg-[#F5F7FA]"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[#F68743]/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#011C40] leading-tight">
            Conecta directamente con <br />
            <span className="text-[#F68743] font-extrabold">
              los mejores proveedores
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-[#011C40]/80 font-medium">
            Explora las distintas ofertas directas con los proveedores mayoristas
            con un precio inmejorable
          </p>

          <button
            type="button"
            className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#F68743] text-[#011C40] shadow-md hover:bg-[#F68743]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F68743] transition"
          >
            <HiOutlineChevronDown className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* SECCIÓN PROVEEDORES */}
      <section className="bg-[#F5F7FA] px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-[#011C40]">
            Conoce a los proveedores
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {providersMock.map((provider, idx) => (
              <ProviderCard key={idx} {...provider} />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN: Lo más vendido (con categorías) */}
      <ProductCarouselSection
        title="Lo más vendido"
        products={bestSellersMock}
        categories={["Categoría 1", "Categoría 2", "Categoría 3", "Categoría 4"]}
        showAllTab={true}
        getProductCategory={(p) => (p as any).category}
        onOpenProduct={(p) => navigate(`/product/${p.id}`)}
        onAddToCart={(p) =>
          addItem(
            {
              productId: p.id,
              title: p.name,       
              brand: p.brand,
              imageUrl: p.imageUrl,
              price: p.price,
            },
            1
          )
        }
      />

      {/* SECCIÓN: Lo más relevante de Seguridad (sin tabs) */}
      <ProductCarouselSection
        title="Lo más relevante de Seguridad"
        products={bestSellersMock}
        onOpenProduct={(p) => navigate(`/product/${p.id}`)}
        onAddToCart={(p) =>
          addItem(
            {
              productId: p.id,
              title: p.name,
              brand: p.brand,
              imageUrl: p.imageUrl,
              price: p.price,
            },
            1
          )
        }
      />


      {/* SECCIÓN: Lo más relevante de Hardware (sin tabs) */}
      <ProductCarouselSection
        title="Lo más relevante en hardware"
        products={bestSellersMock}
        onOpenProduct={(p) => navigate(`/product/${p.id}`)}
        onAddToCart={(p) =>
          addItem(
            {
              productId: p.id,
              title: p.name,
              brand: p.brand,
              imageUrl: p.imageUrl,
              price: p.price,
            },
            1
          )
        }
      />

    </>
  );
};
