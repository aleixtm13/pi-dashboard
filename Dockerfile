# Build Stage (Use arm64 base image for Raspberry Pi)
FROM --platform=linux/arm64 node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
# Production Stage
FROM --platform=linux/arm64 node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-p", "3000", "dist"]