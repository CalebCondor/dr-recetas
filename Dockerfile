# Stage 1: Base image (Bun + Node on Alpine)
FROM oven/bun:1-alpine AS base
RUN apk add --no-cache libc6-compat nodejs

# Stage 2: Install dependencies
FROM base AS deps
WORKDIR /app

# Copy only lockfile + manifest for maximum cache reuse
COPY package.json bun.lock ./

# Install with frozen lockfile — cached unless package.json/bun.lock change
RUN bun install --frozen-lockfile

# Stage 3: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Generate the production build
RUN bun run build

# Stage 4: Production runner (lean — no bun needed at runtime)
FROM node:20.11-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# server.js is created by next build from the standalone output
CMD ["node", "server.js"]
