
#Backend
# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm config set registry http://registry.npmjs.org/ && npm install

RUN npm install

# Copy application files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
