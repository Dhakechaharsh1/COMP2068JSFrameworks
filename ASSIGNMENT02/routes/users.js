// Importing required module
const express = require('express');

// Creating router instance
const router = express.Router();

// Route to handle GET request for listing users
router.get('/', function(req, res, next) {
  // Sending response with a simple message
  res.send('respond with a resource');
});

// Exporting router instance
module.exports = router;
