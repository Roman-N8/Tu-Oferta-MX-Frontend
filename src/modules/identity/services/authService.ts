// ============================================================
// AUTH SERVICE — MODO DEMO (simulado, sin backend)
// Cuando el backend esté listo, reemplazar las implementaciones
// de cada función con los fetch reales.
// ============================================================

const DEMO_DELAY = 600; // ms de espera para simular latencia

function delay(ms = DEMO_DELAY) {
  return new Promise((r) => setTimeout(r, ms));
}

// ---------- tipos (sin cambios) ----------

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

export interface RegisterPayload {
  email: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface VerifyEmailPayload {
  email: string;
  code: string;
}

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

export interface PasswordResetRequestPayload {
  email: string;
}

// ---------- implementaciones demo ----------

/**
 * Login simulado.
 * Acepta cualquier email con formato válido y cualquier contraseña
 * que cumpla la regex del formulario.
 */
export async function loginRequest(
  payload: LoginPayload
): Promise<LoginResponse> {
  await delay();

  // Nombre de demo basado en el email
  const namePart = payload.email.split("@")[0];
  const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

  return {
    accessToken: "demo-access-token-" + Date.now(),
    refreshToken: "demo-refresh-token-" + Date.now(),
    user: {
      id: "demo-user-1",
      name: displayName,
      email: payload.email,
    },
  };
}

/**
 * Registro simulado (paso 1).
 * Siempre responde con éxito.
 */
export async function registerRequest(
  _payload: RegisterPayload
): Promise<RegisterResponse> {
  await delay();
  return { message: "Código de verificación enviado." };
}

/**
 * Verificación de email simulada (paso 2).
 * Acepta cualquier código de 4 dígitos.
 */
export async function verifyEmailCode(
  _payload: VerifyEmailPayload
): Promise<{ message: string }> {
  await delay();
  return { message: "Correo verificado correctamente." };
}

/**
 * Reenvío de código simulado.
 */
export async function resendVerificationCode(
  _email: string
): Promise<{ message: string }> {
  await delay();
  return { message: "Código reenviado." };
}

/**
 * Completar registro simulado (paso 3).
 * Devuelve tokens demo.
 */
export async function completeRegistration(
  _payload: CompleteRegistrationPayload
): Promise<TokensResponse> {
  await delay();
  return {
    accessToken: "demo-access-token-" + Date.now(),
    refreshToken: "demo-refresh-token-" + Date.now(),
  };
}

/**
 * Solicitud de restablecimiento de contraseña simulada.
 */
export async function PasswordResetRequest(
  _payload: PasswordResetRequestPayload
): Promise<{ message: string }> {
  await delay();
  return { message: "Enlace de recuperación enviado." };
}
