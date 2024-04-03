// Importing necessary modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Define route for user login
router.post('/login', async (req, res) => {
    // Extracting email and password from request body
    const { email, password } = req.body;
    // Logging the received email
    console.log('Received login request:', { email });
    try {
        // Finding user by email in the database
        const user = await User.findOne({ email });
        // Logging the retrieved user object
        console.log('User found in the database:', { user });
        // Checking if user exists
        if (!user) {
            // Logging that user is not found
            console.log('User not found');
            // Sending response with 404 status and message
            res.status(404).send('User not found');
            return;
        }
        // Checking if password matches
        if (await bcrypt.compare(password, user.password)) {
            // Logging that password matched
            console.log('Password matched');
            // Setting user session and redirecting to home page
            req.session.user = user;
            res.redirect('/');
        } else {
            // Logging that password is incorrect
            console.log('Incorrect password');
            // Sending response with 401 status and message
            res.status(401).send('Incorrect password');
        }
    } catch (err) {
        // Logging any errors that occur during login
        console.error('Error during login:', err);
        // Sending response with 500 status and message in case of server error
        res.status(500).send('Server Error');
    }
});

// Exporting the router instance
module.exports = router;
