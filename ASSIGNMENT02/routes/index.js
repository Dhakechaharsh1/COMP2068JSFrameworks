// Importing necessary modules
const express = require('express');
const router = express.Router();
const Task = require('../models/task'); // Import the Task model

// GET home page
router.get('/', function(req, res, next) {
  // Render the index page with title 'Express'
  res.render('index', { title: 'Express' });
});

// Define route for deleting a task
router.delete('/tasks/:id', async (req, res) => {
  // Extracting task ID from request parameters
  const taskId = req.params.id;
  try {
    // Deleting task by ID
    await Task.findByIdAndDelete(taskId);
    // Redirecting to the tasks page after deletion
    res.redirect('/tasks');
  } catch (err) {
    // Handling errors and sending a 500 status in case of server error
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Exporting the router instance
module.exports = router;
