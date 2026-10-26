# Multi-Stage Dockerfile for MissingLab
# Stage 1: Build Frontend Assets
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy project source code
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Serve with Production-Grade Nginx on Alpine
FROM nginx:alpine

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy built artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration with SPA fallback & gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for DigitalOcean App Platform / Droplet
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
