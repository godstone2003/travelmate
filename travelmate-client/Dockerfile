# Stage 1: Build React App
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY travelmate-client/package*.json ./travelmate-client/

# Copy source code
COPY travelmate-client ./travelmate-client

# Set working directory inside the client folder
WORKDIR /app/travelmate-client

# Install and build
RUN npm install
RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:stable-alpine AS production

# Copy build output from builder stage
COPY --from=builder /app/travelmate-client/build /usr/share/nginx/html

# Optional: Replace default Nginx config for React routing support (optional but recommended)
COPY travelmate-client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
