/**
 * Isomorphic Runtime Environment Variable Helper
 * 
 * Membaca variabel lingkungan secara dinamis dengan hirarki prioritas:
 * 1. window.__ENV[key] — dari env-config.js (browser, injeksi Pod/runtime)
 * 2. process.env[key]  — dari Node.js SSR / build-time
 * 3. defaultValue       — fallback aman untuk mencegah crash
 * 
 * Aman dipanggil di Client Component maupun Server Component (SSR).
 */
export function getEnv(key: string, defaultValue: string = ''): string {
  // Browser: baca dari window.__ENV yang diisi oleh env-config.js
  if (typeof window !== 'undefined' && window.__ENV && window.__ENV[key] !== undefined) {
    return window.__ENV[key];
  }

  // Server (SSR) / Build-time: baca dari process.env
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }

  return defaultValue;
}
