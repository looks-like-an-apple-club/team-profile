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

// app.post('/signIn', passport.authenticate('signin', {
//     failureRedirect: '/profile'
// }), function (req, res) {
//     res.redirect('/');
// });

// router.get('/', function(req, res, next) {
router.post('/signIn', passport.authenticate('signin', {
        successRedirect:'/',   //
        failureRedirect:'/profile', // 실패하면 login으로 다시 간다.
    })
);

// app.post('/signUp',passport.authenticate('signup', {
//         successRedirect:'/',   //
//         failureRedirect:'/profile', // 실패하면 login으로 다시 간다.
//     })
// );
//
// app.get('/profile', isLoggedIn, function(req, res, next) {
//     res.render('index', { title: 'You are logged in.' });
// });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else {
        console.log("test");
    }
}

module.exports = router;
