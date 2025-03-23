# Use a lightweight Node.js image
FROM node:18-alpine 

# Set working directory
WORKDIR /app 

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy all project files
COPY . . 

# Expose port 3000 (default for React dev server)
EXPOSE 3000 

# Start the React app
CMD ["npm", "start"]
