const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const { connect } = require('mongoose');
const connectDB = require('./config/db'); // MongoDB Connection
const userRoutes = require('./routes/userRoutes'); //User Routes
const progressRoutes = require('./routes/progressRoutes'); // Progress Routes

dotenv.config(); // Load environment variables
connectDB(); // Connect to mongoDB

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing


//Routes
app.use('/api/v1/users', userRoutes); // User Routes
app.use('/api/v1/progress', progressRoutes); // Progress Routes

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});