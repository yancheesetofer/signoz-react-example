# Use Node.js as the base image
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
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

# Copy the tracing.js and instrumentation.js files
COPY --from=build /app/src/tracing.js /app/src/tracing.js
COPY --from=build /app/instrumentation.js /app/instrumentation.js

# Expose port 3000
EXPOSE 3000

# Use node to run the app with instrumentation
CMD ["node", "-r", "./instrumentation.js", "/app/node_modules/.bin/serve", "-s", "/app", "-l", "3000"]