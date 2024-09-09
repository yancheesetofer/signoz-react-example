# Use Node.js as the base image to build the app
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock or package-lock.json
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN yarn build

# Use Nginx to serve the build files
FROM nginx:alpine

# Copy build files from the previous step
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000 (changed from 80 to 3000)
EXPOSE 3000

# Update the Nginx config (to serve on port 3000 instead of 80)
RUN sed -i 's/80/3000/g' /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
