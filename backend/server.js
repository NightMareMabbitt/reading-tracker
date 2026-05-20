const dotenv = require('dotenv');
dotenv.config(); // Load environment variables
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
// const { connect } = require('mongoose');
const connectDB = require('./config/db'); // MongoDB Connection
const userRoutes = require('./routes/userRoutes'); // User Routes
const progressRoutes = require('./routes/progressRoutes'); // Progress Routes
const bookRoutes = require('./routes/bookRoutes'); // Book Routes
const shelfRoutes = require('./routes/shelfRoutes'); // Shelf Routes

// dotenv.config(); // Load environment variables
connectDB(); // Connect to mongoDB

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing


//Routes
app.use('/api/v1/users', userRoutes); // User Routes
app.use('/api/v1/progress', progressRoutes); // Progress Routes
app.use('/api/v1/books', bookRoutes); // Book Routes
app.use('/api/v1/shelves', shelfRoutes); // Shelf Routes

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});