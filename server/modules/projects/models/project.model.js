const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: String,
    imgUrl: String,
    desc: String,
    tags: [{ type: String }],
    demoUrl: String,
    srcUrl: String,

});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
