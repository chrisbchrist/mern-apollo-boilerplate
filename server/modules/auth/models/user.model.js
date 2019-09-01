const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  ],
  info: {
    name: String,
    title: String,
    profilePhoto: String,
    location: String,
    about: String,
    email: String,
    phone: String,
    github: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
