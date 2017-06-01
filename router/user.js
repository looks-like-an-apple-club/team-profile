var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

/* GET main page. */
router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/', function(req, res, next) {
    User.find({}, function (err, docs) {
        return res.status(200).send(docs);
    });
});

router.post('/signIn', passport.authenticate('local-signin', {
        successRedirect:'/',   //
        failureRedirect:'/profile', // 실패하면 login으로 다시 간다.
        failureFlash : true // allow flash messages
       })
);

// router.post('/signin', function(req, res, next) {
//     console.log(req.body);
//     passport.authenticate('local-signin', function(authErr, user, info) {
//         console.log(authErr, user, info);
//         if (authErr) return next(authErr);
//         if (!user) {
//             return res.status(401).json({ message: info.message });
//         }
//         // Passport exposes a login() function on req (also aliased as
//         // logIn()) that can be used to establish a login session
//         return req.logIn(user, function(loginErr){
//                 if(loginErr){
//                     console.log("loginErr : ",loginErr);
//                 }
//                 if (loginErr) return res.status(401).json({ message: loginErr });
//         return res.status(200).json({
//             message: 'You have been successfully logged in.',
//             user
//         });
//     });
//     })(req, res, next);
// });


router.post('/signUp',passport.authenticate('signup', {
        successRedirect:'/',   //
        failureRedirect:'/profile', // 실패하면 login으로 다시 간다.
    })
);

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('index', { title: 'You are logged in.' });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else {
        console.log("test");
    }
}

module.exports = router;
