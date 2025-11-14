import { useState } from "react";
import {
  registerRequest,
  type RegisterPayload,
  type RegisterResponse,
} from "../services/authService";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    data: RegisterPayload
  ): Promise<RegisterResponse | null> => {
    try {
      setLoading(true);
      setError(null);

      const response = await registerRequest(data);
      return response;
    } catch (err: any) {
      setError(err.message || "Error al registrarse");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
