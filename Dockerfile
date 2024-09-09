# Use Node.js as the base image
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

# Use Node.js to serve the static files
FROM node:16-alpine

# Install serve globally
RUN npm install -g serve

# Copy the build folder from the previous stage
COPY --from=build /app/build /app

# Expose port 3000
EXPOSE 3000

# Use serve to serve the static files
CMD ["serve", "-s", "/app", "-l", "3000"]
