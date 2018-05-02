var express = require('express');
var router = express.Router();
var Profile = require('../models/credentials');
var Project = require('../models/project');




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
    Profile.findById(req.user._id)
        .populate('projects')
            .then((doc) => {
                console.log(doc);
                console.log(doc.projects);

                res.render('account', {user: doc})});
});

router.post('/editProfile', function(req, res, next){

    Profile.findOneAndUpdate(
        {username: req.body.username},
        {$set: {status: req.body.status},
            $addToSet: {languages: {$each: [req.body.languages]},
                skills: {$each: [req.body.skills]}}})
        .then((doc) => {
                console.log(doc);
                res.render('account', {user: doc})
            }
        );
});
router.get('/editProfile', function(req, res, next){
    Profile.findOne({username: req.body.username})
        .then((doc)=> {
            console.log(doc);
            res.render('editProfile', {user: doc});
        })
});
router.get('/viewProfile', function(req, res, next){
    Profile.find({username: req.body.username})
        .then((doc) => {
            res.render('otherUser', {user: doc})
        })
});
router.post('/searchProjects', function (req, res, next) {
    Profile.find({})
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
            res.render('project', {project: doc})
        })
});
router.get('/createProject', function (req, res, next) {
    res.render('newProject');
});

router.post('/createProject', function (req, res, next) {
  console.log(req.body)
    var newProject = Project(req.body) //.name, req.user.username, req.body.description);

    newProject.save().then( (proj) =>{

      console.log(req.user)

      req.user.projects.push(proj)


      req.user.save()

      // // var project = Project({name : req.body.name, description: req.body.description,
      // // githubLink: req.body.githubLink, creator: req.user.username});
      // Profile.update({username: req.user.username},
      //     {$addToSet: {projects: {$each: [req.body.name]}}})
      // project.save()
          .then((doc)=> {
              res.redirect('/');
          }).catch(err => {console.log(err); next(err);} )


    })

});




module.exports = router;
