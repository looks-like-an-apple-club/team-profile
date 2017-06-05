var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var session= require('express-session');
var flash    = require('connect-flash');

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
        badRequestMessage : 'Missing username or password.',
        failureFlash : true // allow flash messages
       })
);


router.post('/signUp',passport.authenticate('signup', {
        successRedirect:'/users/userProfile',   //
        failureRedirect:'/', // 실패하면 login으로 다시 간다.
        badRequestMessage : 'Missing username or password.',
        failureFlash : true // allow flash messages
    })
);

router.get('/userProfile',isLoggedIn, function(req, res, next) {
    var name = req.user.name;
    req.session.user_id= req.user.username;
    req.session.name = req.user.name;
    //console.log(loginstate);
    res.render('index', { 'welcome': name + "님 환영합니다 ", "session": req.session.user_id,
        inmessage: "",
        upmessage: ""
    });
});

router.get('/userinfo', function(req,res){
    res.render('userProfile', {
        'userid':req.session.user_id, "username": req.session.name
    });
})
router.get('/logout', logout);

function logout(req,res){
    req.session.destroy(function (err) {
        res.render('index',{welcome:"", session:"",
            inmessage: "",
            upmessage: ""
        }); //Inside a callback… bulletproof!
    });

}
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else {
        console.log("test");
    }
}

module.exports = router;
