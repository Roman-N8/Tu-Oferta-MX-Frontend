export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const API_URL = import.meta.env.VITE_API_URL ?? "https://back.ia-edgecloudsystem.com/";

export async function loginRequest(
  payload: LoginPayload
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}api/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  return res.json();
}
