import { PROVIDERS_MOCK } from "../domain/mock/providers.mock";

export const providersRepository = {
  async getById(providerId: string | number) {
    await new Promise((r) => setTimeout(r, 150));
    const p = PROVIDERS_MOCK.find((x) => String(x.id) === String(providerId));
    if (!p) throw new Error("Proveedor no encontrado");
    return p;
  },
};
