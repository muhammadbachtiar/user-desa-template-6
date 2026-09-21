#!/bin/sh
set -e

echo "==> Preparing runtime environment variables..."

# -------------------------------------------------------
# 1. Baca file .env fisik jika ada (TANPA menimpa OS ENV)
#    Kubernetes Pod OS ENV selalu memiliki prioritas lebih tinggi.
# -------------------------------------------------------
if [ -f .env ]; then
  echo "    Found physical .env file. Loading (without overriding OS env)..."
  while IFS='=' read -r key value || [ -n "$key" ]; do
    # Abaikan baris kosong dan komentar
    case "$key" in
      ''|'#'*) continue ;;
    esac
    # Hilangkan carriage return (Windows line endings)
    key=$(echo "$key" | tr -d '\r')
    value=$(echo "$value" | tr -d '\r')
    # Hilangkan kutip di awal/akhir value
    value=$(echo "$value" | sed -e "s/^['\"]//;s/['\"]$//")
    # Hanya set jika belum ada di OS ENV (prioritaskan Pod injection)
    eval "existing=\${$key:-}"
    if [ -z "$existing" ]; then
      export "$key=$value"
    fi
  done < .env
else
  echo "    No physical .env file found. Using only OS environment variables."
fi

# -------------------------------------------------------
# 2. Generate env-config.js (hanya variabel NEXT_PUBLIC_*)
#    File ini dibaca oleh browser melalui <script src="/env-config.js">
# -------------------------------------------------------
echo "==> Generating env-config.js for client-side..."

TMPFILE="/tmp/env-config.js"
{
  printf "window.__ENV = {\n"
  first=true
  env | grep '^NEXT_PUBLIC_' | sort | while IFS='=' read -r key value; do
    escaped_value=$(echo "$value" | sed "s/'/\\\\'/g")
    if [ "$first" = true ]; then
      first=false
      printf "  \"%s\": '%s'" "$key" "$escaped_value"
    else
      printf ",\n  \"%s\": '%s'" "$key" "$escaped_value"
    fi
  done
  printf "\n};\n"
} > "$TMPFILE"

echo "==> env-config.js generated at $TMPFILE"

# -------------------------------------------------------
# 3. Salin ke ./public/env-config.js (jika writable)
# -------------------------------------------------------
if cp "$TMPFILE" ./public/env-config.js 2>/dev/null; then
  echo "==> Copied env-config.js to ./public/env-config.js"
else
  echo "==> WARN: Could not copy to ./public/env-config.js (read-only?). Using /tmp fallback."
fi

echo "==> Starting application..."

# -------------------------------------------------------
# 4. Jalankan perintah utama (CMD dari Dockerfile)
# -------------------------------------------------------
exec "$@"
