const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    title: String,
    imgUrl: String,
    desc: String,
    tags: [{ type: String }]

});

const Project = model('project', projectSchema);

module.exports = Project;
