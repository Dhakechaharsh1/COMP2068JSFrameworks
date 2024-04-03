// Importing required modules
const express = require('express');
const Task = require('../models/task');

// Creating router instance
const router = express.Router();

// Route to list all tasks
router.get('/', async (req, res) => {
    try {
        // Fetching all tasks from the database
        const tasks = await Task.find();
        // Rendering the tasks index page with the retrieved tasks
        res.render('tasks/index', { tasks });
    } catch (err) {
        // Logging any errors that occur
        console.error(err);
        // Sending response with 500 status and error message in case of server error
        res.status(500).send('Server Error');
    }
});

// Route to add a new task
router.post('/', async (req, res) => {
    // Extracting task details from request body
    const { title, description, dueDate, priority } = req.body;
    try {
        // Creating a new task in the database
        await Task.create({ title, description, dueDate, priority });
        // Redirecting to the tasks index page after successful creation
        res.redirect('/tasks');
    } catch (err) {
        // Logging any errors that occur
        console.error(err);
        // Sending response with 500 status and error message in case of server error
        res.status(500).send('Server Error');
    }
});

// Route to delete a task
router.delete('/:id', async (req, res) => {
    // Extracting task id from request parameters
    const { id } = req.params;
    try {
        // Deleting the task from the database based on the provided id
        await Task.findByIdAndDelete(id);
        // Redirecting to the tasks index page after successful deletion
        res.redirect('/tasks');
    } catch (err) {
        // Logging any errors that occur
        console.error(err);
        // Sending response with 500 status and error message in case of server error
        res.status(500).send('Server Error');
    }
});

// Exporting router instance
module.exports = router;
