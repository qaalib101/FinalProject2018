var express = require('express');
var router = express.Router();
var Profile = require('../models/credentials');
var Project = require('../models/projects');



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(res.locals.username);
        res.locals.username = req.user.username;
        next();
    } else {
        res.redirect('/auth')
    }
}
function isCurrentUser(){

}
router.use(isLoggedIn);

/* GET home page. */
router.get('/', function(req, res, next) {
    Profile.find({username: req.user.username})
            .then((doc) => {
                res.render('account', {user: doc})});
});

router.post('/searchProjects', function (req, res, next) {
    Project.find({tags: req.body.query})
        .then((doc) => {
            res.render('results', {results: doc})
        })
});
router.get('/listProjects', function(req, res, next){
    Profile.find()
        .then((doc) => {
            res.render('results', {results:doc})
        })
});
router.get('/project'+ ':_id', function(req, res, next){
    Project.findById(req.params._id)
        .then((doc) => {
            res.render('projectDescription', {project: doc})
        })
});
router.get('/createProject', function (req, res, next) {
    res.render('createProject');
});




module.exports = router;
