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

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/";

export async function loginRequest(
  payload: LoginPayload
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}api/identity/auth/login/`, {
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

// Registro de usuario
// --------------------------------------------------
// Paso 1: Iniciar registro
// --------------------------------------------------
export interface RegisterPayload {
  email: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
    message: string;
}

export async function registerRequest(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const res = await fetch(`${API_URL}api/identity/auth/initiate-registration/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const message =
      (data && (data.detail || data.error)) ||
      "No se pudo completar el registro";
    throw new Error(message);
  }

  return res.json();
}

// --------------------------------------------------
// Paso 2: Verificacion de correo
// Paso 2.1: Reenvio de código
// --------------------------------------------------
export interface VerifyEmailPayload {
  email: string;
  code: string;
}

export async function verifyEmailCode(
  payload: VerifyEmailPayload
): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}api/identity/auth/verify-code/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.error || "Código inválido");
  }

  return res.json();
}

export async function resendVerificationCode(email: string): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}api/identity/auth/resend-verification-code/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.error || "No se pudo reenviar el código");
  }

  return res.json();
}

// --------------------------------------------------
// Paso 3: Configuración de cuenta
// --------------------------------------------------
export interface CompleteRegistrationPayload {
  email: string;
  name: string;
  lastName: string;
  prefixPhoneNumber: string;
  phoneNumber: string;
}

export interface TokensResponse {
  accessToken: string;
  refreshToken: string;
}

export async function completeRegistration(
  payload: CompleteRegistrationPayload
): Promise<TokensResponse> {
  const res = await fetch(`${API_URL}api/identity/auth/complete-registration/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log(payload);

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      data.detail || data.error || "No se pudo completar el registro"
    );
  }

  return res.json();
}


// Recuperación de contraseña
// --------------------------------------------------
// Paso 1: Solicitar restablecimiento
// --------------------------------------------------

export interface PasswordResetRequestPayload {
  email: string;
}

export async function PasswordResetRequest(
  payload: PasswordResetRequestPayload
): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}auth/password-reset-request/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || data.error || "Código inválido");
  }

  return res.json();
}