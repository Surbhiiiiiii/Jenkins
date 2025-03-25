# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately to leverage Docker cache
COPY package.json package-lock.json ./

# Set NPM registry and install dependencies
RUN npm config set registry http://registry.npmjs.org/ && npm ci

# Copy the rest of the application files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
