// Importing mongoose module
const mongoose = require('mongoose');

// Defining user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // User's username field
  email: { type: String, required: true, unique: true }, // User's email field, unique constraint
  password: { type: String, required: true } // User's password field
});

// Creating User model based on user schema
const User = mongoose.model('User', userSchema);

// Exporting User model
module.exports = User;
