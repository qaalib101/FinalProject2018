var express = require('express');
var router = express.Router();
var Profile = require('../models/credentials');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.username = req.user.username;
        next();
    } else {
        res.redirect('/auth')
    }
}
router.use(isLoggedIn);

/* GET home page. */
router.get('/', function(req, res, next) {
    Profile.find({username: req.user.username})
            .then((doc) => {
                res.render('account', {user: doc})});
});






module.exports = router;
