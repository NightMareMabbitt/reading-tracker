# --- Stage 1: Build the Frontend ---
FROM node:18 AS frontend
WORKDIR /app/frontend

# Install dependencies and build
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# --- Stage 2: Build the Backend ---
FROM node:18 AS backend
WORKDIR /app/backend

# Install dependencies
COPY backend/package*.json ./
RUN npm install
COPY backend ./

# Copy frontend build output to backend's public folder
COPY --from=frontend /app/frontend/build /app/backend/public

# --- Final Stage: Assemble the Application ---
FROM node:18
WORKDIR /app

# Copy backend from the backend stage
COPY --from=backend /app/backend ./

# Set environment and expose port
ENV NODE_ENV=production
EXPOSE 3000

# Start the backend server
CMD ["node", "server.js"]
 
