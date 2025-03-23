# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Build React app
RUN npm run build

# Use Nginx to serve frontend
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose frontend port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
