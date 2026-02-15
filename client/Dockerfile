# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and lockfile first (better cache layer)
COPY package*.json ./

# Install dependencies with a clean lockfile
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the production build with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
