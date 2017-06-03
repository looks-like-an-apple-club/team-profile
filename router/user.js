var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var ejs = require('ejs');

/* GET main page. */
router.get('/', function(req, res, next) {
    res.render('index.ejs',{welome:""});
});

router.get('/', function(req, res, next) {
    User.find({}, function (err, docs) {
        return res.status(200).send(docs);
    });
});

router.post('/signIn',passport.authenticate('signin', {
        successRedirect:'/users/userProfile',   //
        failureRedirect:'/', // 실패하면 login으로 다시 간다.
        failureFlash : true // allow flash messages
       })
);


router.post('/signUp',passport.authenticate('signup', {
        successRedirect:'/users/userProfile',   //
        failureRedirect:'/', // 실패하면 login으로 다시 간다.
    })
);

router.get('/userProfile',isLoggedIn, function(req, res, next) {
    var name = req.user.name;
    res.render('index', { 'welcome': name + "님 환영합니다 "});
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else {
        console.log("test");
    }
}

module.exports = router;
