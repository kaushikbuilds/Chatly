# ============================================
# Stage 1 - Build Frontend
# ============================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .

# Vite reads this at BUILD time, so it must be here (before npm run build)
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

RUN npm run build


# ============================================
# Stage 2 - Build Backend
# ============================================
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend/ .
RUN npm run build


# ============================================
# Stage 3 - Production Runtime
# ============================================
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Backend production dependencies only
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Backend files (src copied to dist by the build script)
COPY --from=backend-builder /app/backend/dist ./dist

# Frontend built files
COPY --from=frontend-builder /app/frontend/dist ./public

EXPOSE 3000

CMD ["node", "dist/index.js"]