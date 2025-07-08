const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register user
const registerUser = async (req, res) => {
  const { username , email, password } = req.body;

  try {
    //Check if user already exists
    const userExists = await User.findOne({email});
    if (userExists) {
      return res.status(400).json({message: 'User already exists'});
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create New User
    const user = await User.create({
      username, 
      email, 
      password: hashedPassword
    });

    if (user) { 
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id), // Generate JWT token
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

//User Login
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    //Find the user by email 
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user.id), // Generate JWT token
      });
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };