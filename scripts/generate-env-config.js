/**
 * Script untuk generate public/env-config.js di lingkungan pengembangan lokal.
 * Dijalankan otomatis via "predev" dan "prebuild" scripts di package.json.
 * 
 * Membaca variabel dari file .env dan/atau process.env,
 * lalu menuliskan hanya variabel berawalan NEXT_PUBLIC_* ke public/env-config.js.
 */
const fs = require('fs');
const path = require('path');

// 1. Baca file .env jika ada
const envFilePath = path.resolve(__dirname, '..', '.env');
const envVars = {};

if (fs.existsSync(envFilePath)) {
  console.log('[generate-env-config] Found .env file, reading...');
  const content = fs.readFileSync(envFilePath, 'utf-8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    // Abaikan baris kosong dan komentar
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) return;
    const key = trimmed.substring(0, eqIndex).trim();
    let value = trimmed.substring(eqIndex + 1).trim();
    // Hapus kutip di awal/akhir value
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    envVars[key] = value;
  });
} else {
  console.log('[generate-env-config] No .env file found, using process.env only.');
}

// 2. Gabungkan dengan process.env (process.env menimpa .env file)
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    envVars[key] = process.env[key];
  }
});

// 3. Filter hanya NEXT_PUBLIC_* dan tulis ke public/env-config.js
const publicVars = {};
Object.keys(envVars)
  .filter((key) => key.startsWith('NEXT_PUBLIC_'))
  .sort()
  .forEach((key) => {
    publicVars[key] = envVars[key];
  });

const outputDir = path.resolve(__dirname, '..', 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const entries = Object.entries(publicVars)
  .map(([key, value]) => {
    // Escape single quotes dalam value
    const escaped = String(value).replace(/'/g, "\\'");
    return `  "${key}": '${escaped}'`;
  })
  .join(',\n');

const output = `window.__ENV = {\n${entries}\n};\n`;

const outputPath = path.join(outputDir, 'env-config.js');
fs.writeFileSync(outputPath, output, 'utf-8');
console.log(`[generate-env-config] ✅ Generated ${outputPath}`);
