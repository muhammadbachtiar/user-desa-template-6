# ======================
# 1. Build Stage
# ======================
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependencies file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the Next.js app
RUN npm run build

# ============================
# 2. Production Stage
# ============================
FROM node:22-alpine AS runner

WORKDIR /app

# Set environment variable
ENV NODE_ENV=production

# Copy only the necessary files from builder
COPY --from=builder /app/package*.json /app/.env* ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

# Copy docker-entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh

# Set permissions: entrypoint executable, public & tmp writable (untuk K8s non-root/read-only FS)
RUN chmod +x /app/docker-entrypoint.sh && chmod -R 777 /app/public /tmp

# Expose port
EXPOSE 3000

# Gunakan entrypoint untuk generate env-config.js saat container boot
ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Start the app (diteruskan sebagai $@ oleh entrypoint)
CMD ["npm", "start"]
