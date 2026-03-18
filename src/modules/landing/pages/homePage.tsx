import React from "react";
import heroBg from "../../../assets/Background blur.png";
import { HiOutlineChevronDown } from "react-icons/hi";
import { ProviderCard } from "../../providers/components/providerCard";
import { PROVIDERS_MOCK } from "../../providers/domain/mock/providers.mock";
import { ProductCarouselSection } from "../../catalog/components/productCarouselSection";
import { type ProductCardProps } from "../../catalog/components/productCard";

import { PRODUCTS } from "../../catalog/domain/mock/products.mock";
import { CATEGORIES } from "../../catalog/domain/mock/categories.mock";

import { useCart } from "../../cart/hooks/useCart";
import { useWishlist } from "../../wishlist/hooks/useWishlist"

import { useNavigate } from "react-router-dom";

// Mapear datos del mock de proveedores al formato de ProviderCard
const providersForCards = PROVIDERS_MOCK.slice(0, 3).map((p) => ({
  providerId: String(p.id),
  name: p.name,
  rating: p.rating,
  description: p.description,
  location: p.location ?? "",
  coverImage: p.coverImageUrl,
  avatarImage: p.avatarImageUrl,
}));

// Mapear PRODUCTS del mock al formato de ProductCardProps con categoría
const productsForCarousel: (ProductCardProps & { category: string })[] =
  PRODUCTS.map((p) => {
    const cat = CATEGORIES.find((c) => c.id === p.categoryId);
    const discountPercent =
      p.oldPrice && p.oldPrice > p.price
        ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
        : undefined;

    return {
      id: p.id,
      brand: p.brand,
      name: p.title,
      imageUrl: p.imageUrl,
      rating: p.rating,
      reviewCount: p.reviewsCount,
      price: p.price,
      oldPrice: p.oldPrice,
      discountPercent,
      category: cat?.name ?? "Todo",
    };
  });

const categoryNames = CATEGORIES.map((c) => c.name);

export const HomePage: React.FC = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { toggle, has } = useWishlist();
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
            {providersForCards.map((provider) => (
              <ProviderCard key={provider.providerId} {...provider} />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN: Lo más vendido (con categorías) */}
      <ProductCarouselSection
        title="Lo más vendido"
        products={productsForCarousel}
        categories={categoryNames}
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

        isWishlisted={(p) => has(p.id)}
        onToggleWishlist={(p) =>
          toggle({
            productId: p.id,
            title: p.name,
            brand: p.brand,
            imageUrl: p.imageUrl,
            price: p.price,
          })
        }
      />

      {/* SECCIÓN: Lo más relevante de Redes (sin tabs) */}
      <ProductCarouselSection
        title="Lo más relevante de Redes"
        products={productsForCarousel.filter((p) => p.category === "Redes")}
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

        isWishlisted={(p) => has(p.id)}
        onToggleWishlist={(p) =>
          toggle({
            productId: p.id,
            title: p.name,
            brand: p.brand,
            imageUrl: p.imageUrl,
            price: p.price,
          })
        }
      />


      {/* SECCIÓN: Lo más relevante de Computo (sin tabs) */}
      <ProductCarouselSection
        title="Lo más relevante en Computo"
        products={productsForCarousel.filter((p) => p.category === "Computo")}
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

        isWishlisted={(p) => has(p.id)}
        onToggleWishlist={(p) =>
          toggle({
            productId: p.id,
            title: p.name,
            brand: p.brand,
            imageUrl: p.imageUrl,
            price: p.price,
          })
        }
      />

    </>
  );
};
