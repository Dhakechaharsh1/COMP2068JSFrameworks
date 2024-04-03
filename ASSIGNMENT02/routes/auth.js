// Importing necessary modules
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

// Creating a router instance
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  // Extracting username, email, and password from request body
  const { username, email, password } = req.body;
  try {
    // Checking if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user already exists, return a 400 status with a message
      return res.status(400).send('User already exists');
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user with hashed password
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Redirecting to login page upon successful signup
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    // Sending a 500 status in case of server error
    res.status(500).send('Server Error');
  }
});

// Login Route
router.post('/login', passport.authenticate('local', {
  successRedirect: '/tasks', // Redirecting to tasks page upon successful login
  failureRedirect: '/login', // Redirecting to login page upon failed login
  failureFlash: true // Enabling flash messages for failed login attempts
}));

// Logout Route
router.get('/logout', (req, res) => {
  // Logging out the user and redirecting to homepage
  req.logout();
  res.redirect('/');
});

// Exporting the router instance
module.exports = router;
