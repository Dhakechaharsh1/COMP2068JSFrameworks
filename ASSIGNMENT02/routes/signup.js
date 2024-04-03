// Importing necessary modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Define route for user signup
router.post('/', async (req, res) => {
    try {
        // Extracting username, email, and password from request body
        const { username, email, password } = req.body;
        // Checking if user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Sending response with 400 status and message if user already exists
            return res.status(400).send('User with this email already exists');
        }
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Creating a new user instance
        const newUser = new User({ username, email, password: hashedPassword });
        // Saving the new user to the database
        await newUser.save();
        // Optionally logging in the user immediately after signup
        req.session.user = newUser;
        // Sending response with 201 status and success message
        res.status(201).send('User created successfully');
        // Optionally redirecting to another page after successful signup
        // res.redirect('/login');
    } catch (err) {
        // Logging any errors that occur during signup
        console.error(err);
        // Sending response with 500 status and error message in case of server error
        res.status(500).send('Server Error');
    }
});

// Exporting the router instance
module.exports = router;
