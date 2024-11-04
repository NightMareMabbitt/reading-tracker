const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// User Registration Route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Protected Route

router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'Access granted to profile page',
    user: req.user
  });
});


module.exports = router;
