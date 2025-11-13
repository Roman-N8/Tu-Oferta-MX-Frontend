import { useState } from "react";
import { loginRequest, type LoginPayload, type LoginResponse } from "../services/authService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginPayload): Promise<LoginResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginRequest(data);

      // más adelante, mover esto a un AuthContext
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      return response;
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
