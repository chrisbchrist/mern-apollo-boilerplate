// #1 Import the constructor Schema and the model() method
// Note the use of ES6 desctructuring
const { Schema, model } = require('mongoose');

// #2 Instantiate a schema using mongoose Schema
const projectSchema = new Schema({
    title: String,
    imgUrl: String,
    desc: String

});

// #3 Create a model with mongoose model() method
const Project = model('project', projectSchema);

module.exports = Project;
