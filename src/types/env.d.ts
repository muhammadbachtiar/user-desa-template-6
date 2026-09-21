/**
 * Deklarasi tipe global untuk window.__ENV
 * Digunakan oleh env-config.js yang di-generate pada runtime container
 * untuk menyuntikkan variabel environment ke browser secara dinamis.
 */
export {};

declare global {
  interface Window {
    __ENV?: Record<string, string>;
  }
}
