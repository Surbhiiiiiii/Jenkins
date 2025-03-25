# Step 1: Build React App
FROM node:18-alpine AS builder
WORKDIR /app

# Use cached dependencies for faster builds
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm install --only=production

# Copy the rest of the code
COPY . .  
RUN npm run build  

# Step 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
