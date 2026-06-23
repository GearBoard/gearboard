# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace manifests first for layer caching
COPY package.json yarn.lock ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install all dependencies (includes devDeps needed for build)
RUN yarn install --frozen-lockfile

# Copy backend source and prisma schema
COPY backend/ ./backend/

# Generate Prisma Client
RUN yarn workspace gearboard-backend run db.generate

# Build TypeScript
RUN yarn workspace gearboard-backend run build

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy workspace manifests
COPY package.json yarn.lock ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install production dependencies only
RUN yarn install --frozen-lockfile --production

# Copy built assets from builder
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/prisma ./backend/prisma

# Generate Prisma Client for production
RUN yarn workspace gearboard-backend run db.generate

EXPOSE 3000

CMD ["yarn", "workspace", "gearboard-backend", "start"]
