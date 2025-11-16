# syntax=docker/dockerfile:1.7

FROM oven/bun:1.3 as deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM deps as build
COPY tsconfig.json ./
COPY src ./src
COPY public ./public
COPY config ./config
RUN bun run build

FROM oven/bun:1.3
WORKDIR /app

ENV NODE_ENV=production

# Copy dependencies and built files
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY config ./config

# Expose port (default 8181)
EXPOSE 8181

CMD ["bun", "dist/index.js"]
