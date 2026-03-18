import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { AppShell } from "./global/layouts/AppShell";

/* ===== LANDING ===== */
import { HomePage } from "./modules/landing/pages/homePage";

/* ===== IDENTITY ===== */
import { LoginModal } from "./modules/identity/components/loginModal";
import { RegisterModal } from "./modules/identity/components/registerModal";
import { VerifyEmailPage } from "./modules/identity/registration/pages/verifyEmailPage";
import { CompleteAccountPage } from "./modules/identity/registration/pages/completeAccountPage";
import { ForgotPasswordPage } from "./modules/identity/recovery/pages/forgotPassword";
import { LinkSentMessage } from "./modules/identity/recovery/pages/linkSentMessage";
import { PasswordResetPage } from "./modules/identity/recovery/pages/passwordReset";

/* ===== ACCOUNT ===== */
import { AccountSettingsPage } from "./modules/account/pages/accountSettingsPage";

/* ===== CATALOG ===== */
import SearchResultsPage from "./modules/catalog/pages/SearchResultsPage";
import ProductDetailPage from "./modules/catalog/pages/ProductDetailPage";

/* ===== CATALOG ===== */
import { CartProvider } from "./modules/cart/domain/cartStore"
import CartPage from "./modules/cart/pages/CartPage";

/* ===== CHECKOUT ===== */
import CheckoutShippingPage from "./modules/checkout/pages/CheckoutShippingPage";
import CheckoutPaymentPage from "./modules/checkout/pages/CheckoutPaymentPage";
import CheckoutReviewPage from "./modules/checkout/pages/CheckoutReviewPage";
import CheckoutSuccessPage from "./modules/checkout/pages/CheckoutSuccessPage";

/* ===== PROVIDERS ===== */
import ProviderProfilePage from "./modules/providers/pages/ProviderProfilePage";
import { RegistrationProvider } from "./modules/identity/registration/registrationContext";
import { CheckoutProvider } from "./modules/checkout/domain/checkoutStore";
import { WishlistProvider } from "./modules/wishlist/domain/wishlistStore";

/* ===== WISHLIST ===== */
import WishlistPage from "./modules/wishlist/pages/WishlistPage"

/* ===== ORDERS ===== */
import { OrdersPage } from "./modules/orders/pages/OrdersPage";
import { OrderDetailPage } from "./modules/orders/pages/OrderDetailPage";
import { OrderProvider } from "./modules/orders/store/orderStore";


type AuthMode = "login" | "register" | null;

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <OrderProvider>
      <BrowserRouter>
        <RegistrationProvider>
          <CartProvider>
            <CheckoutProvider>
              <WishlistProvider>
                <div className="min-h-screen bg-slate-50 flex flex-col">
                  <Routes>
                    {/* ================= HOME ================= */}
                    <Route
                      path="/"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <HomePage />
                        </AppShell>
                      }
                    />

                    {/* ================= CATALOG / SEARCH ================= */}
                    <Route
                      path="/catalog"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <SearchResultsPage />
                        </AppShell>
                      }
                    />

                    <Route
                      path="/search"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <SearchResultsPage />
                        </AppShell>
                      }
                    />

                    <Route
                      path="/category/:categoryId"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <SearchResultsPage />
                        </AppShell>
                      }
                    />

                    {/* ================= CART ================= */}
                    <Route
                      path="/cart"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <CartPage isAuthenticated={isAuthenticated} onLoginClick={() => setAuthMode("login")} />
                        </AppShell>
                      }
                    />

                    {/* ================= CHECKOUT ================= */}
                    <Route
                      path="/checkout/shipping"
                      element={
                        <AppShell isAuthenticated={isAuthenticated} onLogin={() => setAuthMode("login")} onLogout={handleLogout}>
                          <CheckoutShippingPage />
                        </AppShell>
                      }
                    />

                    <Route
                      path="/checkout/payment"
                      element={
                        <AppShell isAuthenticated={isAuthenticated} onLogin={() => setAuthMode("login")} onLogout={handleLogout}>
                          <CheckoutPaymentPage />
                        </AppShell>
                      }
                    />

                    <Route
                      path="/checkout/review"
                      element={
                        <AppShell isAuthenticated={isAuthenticated} onLogin={() => setAuthMode("login")} onLogout={handleLogout}>
                          <CheckoutReviewPage />
                        </AppShell>
                      }
                    />

                    <Route
                      path="/checkout/success"
                      element={
                        <AppShell isAuthenticated={isAuthenticated} onLogin={() => setAuthMode("login")} onLogout={handleLogout}>
                          <CheckoutSuccessPage />
                        </AppShell>
                      }
                    />

                    {/* ================= ORDERS ================= */}
                    <Route
                      path="/orders"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <OrdersPage />
                        </AppShell>
                      }
                    />

                    <Route
                      path="/orders/:id"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <OrderDetailPage />
                        </AppShell>
                      }
                    />

                    {/* ================= PRODUCT DETAIL ================= */}
                    <Route
                      path="/product/:productId"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <ProductDetailPage />
                        </AppShell>
                      }
                    />

                    {/* ================= WISHLIST ================= */}
                    <Route
                      path="/wishlist"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <WishlistPage />
                        </AppShell>
                      }
                    />

                    {/* ================= IDENTITY ================= */}
                    <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
                    <Route path="/auth/complete-account" element={<CompleteAccountPage />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/auth/link-sent" element={<LinkSentMessage />} />
                    <Route path="/auth/password-reset" element={<PasswordResetPage />} />

                    {/* ================= ACCOUNT ================= */}
                    <Route
                      path="/account/settings"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <AccountSettingsPage />
                        </AppShell>
                      }
                    />
                  </Routes>

                  {/* ================= MODALS ================= */}
                  <LoginModal
                    open={authMode === "login"}
                    onClose={() => setAuthMode(null)}
                    onGoToRegister={() => setAuthMode("register")}
                    onLoggedIn={() => setIsAuthenticated(true)}
                  />

                  <RegisterModal
                    open={authMode === "register"}
                    onClose={() => setAuthMode(null)}
                    onGoToLogin={() => setAuthMode("login")}
                  />

                  {/* ================= PROVIDERS ================= */}
                  <Routes>
                    <Route
                      path="/provider/:providerId"
                      element={
                        <AppShell
                          isAuthenticated={isAuthenticated}
                          onLogin={() => setAuthMode("login")}
                          onLogout={handleLogout}
                        >
                          <ProviderProfilePage />
                        </AppShell>
                      }
                    />
                  </Routes>
                </div>
              </WishlistProvider>
            </CheckoutProvider>
          </CartProvider>
        </RegistrationProvider>
      </BrowserRouter>
    </OrderProvider>
  );
}

export default App;
