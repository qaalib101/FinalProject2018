/**
 * Created by si8822fb on 4/24/2018.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Project = require('./project');
var ObjectId = mongoose.Schema.Types.ObjectId;
// imported project schema to create one to many relationship between user and projects
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    status: String,
    languages:{
        type: [String],
        default: undefined
    },
    skills:{
        type: [String],
        default: undefined
    } ,
    projects: [ { type : ObjectId, ref : 'Project' } ]
});

userSchema.methods.generateHash = function(password) {
    //Create salted hash of password by hashing plaintext password
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function(password) {
    //Hash entered password, compare with stored hash
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema, 'user');


module.exports = User;
