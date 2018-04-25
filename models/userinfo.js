/**
 * Created by si8822fb on 4/24/2018.
 */
var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    name: String,
    status: String,
    languages: [],
    skills: []
});


var User = mongoose.model('User', userSchema);


module.exports = User;