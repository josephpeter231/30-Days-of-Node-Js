const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email format'
    }
  }
});

const User = mongoose.model('User', userSchema);

async function addUserWithValidation(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}

const user1 = { username: 'john_doe', email: 'invalid-email' };
addUserWithValidation(user1);
