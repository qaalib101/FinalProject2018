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
                res.render('account', {user: doc})});
});

router.get('/editProfile/:_id', function(req, res, next){
    console.log(req.params._id);
    Profile.findById(req.params._id)
        .then((doc)=> {
            console.log(doc);
            res.render('editProfile', {user: doc});
        })
});

router.post('/editProfile', function(req, res, next){

    Profile.findOneAndUpdate(
        {username: req.user.username},
        {$set: {status: req.body.status},
            $addToSet: {languages: {$each: [req.body.languages]},
                skills: {$each: [req.body.skills]}}})
        .then((doc) => {
                console.log(doc);
                res.render('account', {user: doc})
            }
        );
});

router.get('/account/:_id', function(req, res, next){
    console.log(req.params._id);
    Profile.findById(req.params._id)
        .then((doc) => {
            console.log(doc);
            if(doc.username.localeCompare(req.user.username) == 0){
                res.redirect('/');
            }
            else{
                res.render('otherUser', {user: doc})
            }
        })
        .catch(
            (err) => {
                console.log(err); next(err);
            })
});

router.get('/listProjects', function(req, res, next){
    Project.find()
        .then((doc) => {
            res.render('results', {results:doc})
        })
});
router.get('/project'+ '/:_id', function(req, res, next){
    Project.findById(req.params._id)
            .then((doc) => {
                Profile.findById(doc.creator)
                    .then((profile)=>{
                        doc.creator = profile;
                        console.log(doc);
                        if(doc.creator._id.equals(req.user._id)){
                            res.render('project', {project: doc})
                        }else{
                            res.render('otherProject', {project: doc})
                        }
                    });


            })
});
router.post('/deleteProject', function (req, res, next) {
    Project.findByIdAndRemove(req.body._id)
        .then((project)=>{
            Profile.findById(req.user._id)
                .then((doc)=>{
                    res.render('account', {user: doc})
                })
        });
});
router.get('/createProject', function (req, res, next) {
    res.render('newProject');
});

router.post('/createProject', function (req, res, next) {
  console.log(req.user.username);
    var newProject = Project({name: req.body.name,
        description: req.body.description,
        creator: req.user,
    githubLink: req.body.githubLink}); //.name, req.user.username, req.body.description);

    newProject.save()
        .then( (proj) =>{

      console.log(proj);

      req.user.projects.push(proj);

      req.user.save()
          .then((doc)=> {
              res.render('project', {project: proj});
          }).catch(
          (err) => {
              console.log(err); next(err);
          })
    })

});
router.get('/editProject'+ '/:_id', function(req, res, next){
    console.log(req.params._id);
    Project.findById(req.params._id)
        .then((doc) =>{
            Profile.findById(doc.creator)
                .then((profile)=>{
                    console.log(doc);
                    doc.creator = profile;
                    res.render('editProject', {project: doc});
                })
    })
        .catch(
            (err) => {
                console.log(err);
                next(err);
            })
});
router.post('/editProject', function (req, res, next) {
    console.log(req.body._id);
    Project.findOneAndUpdate({_id: req.body._id},
        {$set: {status: req.body.status}})
        .then((doc)=> {
            Profile.findById(doc.creator)
                .then((profile)=> {
                    doc.creator = profile;
                    console.log(doc);
                    res.render('project', {project: doc})
                });

        })
        .catch(
        (err) => {
            console.log(err); next(err);
        })
});



module.exports = router;
