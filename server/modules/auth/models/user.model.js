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
  rememberMe: {
    type: Boolean,
    default: false
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
    github: String,
    social: {
      facebook: String,
      linkedIn: String,
      stackOverflow: String,
      twitter: String,
      codepen: String,
    }
  },
  styles: {
    theme: String,
    color: String,
    font: String,
    fontSize: Number,
    bgPhoto: String,
    gradient: {
      colors: [{ type: String }],
      name: String,
      direction: String,
      opacity: Number
    },
    header: {
      colors: [{type: String}],
      size: Number,
      fonts: [{ type: String }],
      borderRadius: String,

    }
  }

});

const User = mongoose.model('User', userSchema);

module.exports = User;
