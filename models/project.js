/**
 * Created by si8822fb on 4/24/2018.
 */
var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    name: String,
    githubLink: String,
    status: String
});

var Project = mongoose.model('Project', projectSchema);


module.exports = Project;
