# Step 1: Use a lightweight Node.js base image
FROM node:18-alpine as builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy rest of the code
COPY . .

# Step 5: Build the app (transpile TypeScript to JavaScript)
RUN npm run build

# -------------------
# Production image
# -------------------
FROM node:18-alpine

WORKDIR /app

# Copy only the built files and node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose the port your NestJS app runs on
EXPOSE 3000

# Run the application
CMD ["node", "dist/main"]
