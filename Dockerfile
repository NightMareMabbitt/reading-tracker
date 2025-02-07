# Use Node.js for building the frontend
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Use Node.js for the backend
FROM node:18 AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend ./

# Move the built frontend files into backend's public folder
RUN mkdir -p /app/backend/public
RUN cp -r /app/frontend/build/* /app/backend/public/

# Final image
FROM node:18
WORKDIR /app
COPY --from=backend /app/backend ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
