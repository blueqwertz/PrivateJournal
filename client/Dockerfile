# Base image
FROM node:latest AS build

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app files to the app directory
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve app with Nginx
FROM nginx:latest

# Copy build output to Nginx's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
