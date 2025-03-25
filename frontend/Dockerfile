# # Use a lightweight Node.js image
# FROM node:18-alpine 

# # Set working directory
# WORKDIR /app 

# # Copy package.json and package-lock.json separately to leverage Docker caching
# COPY package.json package-lock.json ./ 

# # Install dependencies
# RUN npm ci --only=production

# # Copy all project files
# COPY . . 

# # Expose port 3000 (default for React dev server)
# EXPOSE 3000 

# # Build the React app for production
# RUN npm run build 

# # Use a lightweight web server to serve the build files
# CMD ["npx", "serve", "-s", "build", "-l", "3000"]
# Build React App
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json  ./
RUN npm ci
COPY . .  
RUN npm run build  

# Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

