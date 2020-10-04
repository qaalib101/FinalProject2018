var express = require('express');
var router = express.Router();
var Profile = require('../models/credentials');
var Project = require('../models/project');



// is logged in checks for the user logged in
var isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.username = req.user.username
        next()
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
                res.render('profile/account', {user: doc})});
});
// link to edit profile page
router.get('/editProfile/:_id', function(req, res, next){
    console.log(req.params._id);
    Profile.findById(req.params._id)
        .then((doc)=> {
            console.log(doc);
            res.render('profile/editProfile', {user: doc});
        })
});
// editing profile and saving on mongodb
router.post('/editProfile', function(req, res, next){

    Profile.findOneAndUpdate(
        {username: req.user.username},
        {$set: {status: req.body.status},
            $addToSet: {languages: {$each: [req.body.languages]},
                skills: {$each: [req.body.skills]}}})
        .then((doc) => {
                console.log(doc);
                res.render('profile/account', {user: doc})
            }
        );
});
// link to other user account
router.get('/account/:_id', function(req, res, next){

    console.log(req.params._id); // for error checking
    Profile.findById(req.params._id)
        .then((doc) => {
            console.log(doc);
            if(doc.username.localeCompare(req.user.username) == 0){
                res.redirect('/');
            }
            else{
                res.render('profile/otherUser', {user: doc})
            }
        })
        .catch(
            (err) => {
                console.log(err); next(err);
            })
});
// listing all the projects
router.get('/listProjects', function(req, res, next){
    Project.find()
        .then((doc) => {
            res.render('base/results', {results:doc})
        })
});
// get project page using link
router.get('/project'+ '/:_id', function(req, res, next){
    Project.findById(req.params._id)
            .then((doc) => {
                Profile.findById(doc.creator)
                    .then((profile)=>{
                        doc.creator = profile;
                        console.log(doc);
                        if(doc.creator._id.equals(req.user._id)){
                            res.render('projects/project', {project: doc})
                        }else{
                            res.render('projects/otherProject', {project: doc})
                        }
                    });


            })
});
// deleting a project
router.post('/deleteProject', function (req, res, next) {
    Project.findByIdAndRemove(req.body._id)
        .then((project)=>{
            Profile.findById(req.user._id)
                .then((doc)=>{
                    res.render('account', {user: doc})
                })
        });
});
// creating a new project
router.get('/createProject', function (req, res, next) {
    res.render('projects/newProject');
});

router.post('/createProject', function (req, res, next) {
  // create new project object and save it in the mongodb
    var newProject = Project({name: req.body.name,
        description: req.body.description,
        creator: req.user,
    githubLink: req.body.githubLink}); //.name, req.user.username, req.body.description);

    newProject.save()
        .then( (proj) =>{

      console.log(proj);
// push project to user project array
      req.user.projects.push(proj);

      req.user.save()
          .then((doc)=> {
              res.render('projects/project', {project: proj});
          }).catch(
          (err) => {
              console.log(err); next(err);
          })
    })

});
// get edit project page using a link
router.get('/editProject'+ '/:_id', function(req, res, next){
    console.log(req.params._id);
    Project.findById(req.params._id)
        .then((doc) =>{
            Profile.findById(doc.creator)
                .then((profile)=>{
                    console.log(doc);
                    doc.creator = profile;
                    res.render('projects/editProject', {project: doc});
                })
    })
        .catch(
            (err) => {
                console.log(err);
                next(err);
            })
});

//posting and saving project edits
router.post('/editProject', function (req, res, next) {
    console.log(req.body._id);
    Project.findOneAndUpdate({_id: req.body._id},
        {$set: {status: req.body.status}})
        .then((doc)=> {
            Profile.findById(doc.creator)
                .then((profile)=> {
                    doc.creator = profile;
                    console.log(doc);
                    res.render('projects/project', {project: doc})
                });

        })
        .catch(
        (err) => {
            console.log(err); next(err);
        })
});



module.exports = router;
