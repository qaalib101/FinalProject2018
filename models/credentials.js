/**
 * Created by si8822fb on 4/24/2018.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    status: String,
    languages: [],
    skills: []
});

userSchema.methods.generateHash = function(password) {
    //Create salted hash of password by hashing plaintext password
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validPassword = function(password) {
    //Hash entered password, compare with stored hash
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);


module.exports = User;