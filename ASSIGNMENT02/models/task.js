// Importing mongoose module
const mongoose = require('mongoose');

// Defining task schema
const taskSchema = new mongoose.Schema({
  title: String, // Task title field
  description: String, // Task description field
  dueDate: Date, // Task due date field
  priority: String, // Task priority field
  completed: { type: Boolean, default: false } // Task completion status field with default value
});

// Exporting task model
module.exports = mongoose.model('Task', taskSchema);
