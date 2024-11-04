const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create New User
    const newUser = await User.create({
      username, 
      email, 
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully'});
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
    if(!user) {
      return res.status(404).json({message: 'User not found'});
    }
    // Compare the entered password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch) {
      return res.status(400).json({ message: 'Invaild credentials'});
    }

    //Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email }, //Payload
      process.env.JWT_SECRET, // Secret key from the environment
      { expiresIn: process.env.JWT_EXPIRES_IN || '30d'} //Token expiration time
     );

     res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

module.exports = { registerUser, loginUser };