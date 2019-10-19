
const mongoose = require('mongoose');
require('dotenv').config();

//Create a query string to connect to MongoDB server
const DB_URI = process.env.DB_URI;

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true });

// Add basic event listeners on the mongoose.connection object
mongoose.connection.once('open', () =>
  console.log('Connected to a MongoDB instance')
);
mongoose.connection.on('error', error => console.error(error));

// Export mongoose.
module.exports = mongoose;
