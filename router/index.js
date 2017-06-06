var express = require('express');
var router = express.Router();
var User = require('../models/user');
var ejs = require('ejs');

/* GET main page. */
router.get('/', function(req, res, next) {

    var name = '';
    var session = '';
    if(req.user){
        name = req.user.name + "님 환영합니다 ";
        session = req.user.username;
    }

    res.render('index.ejs', {'welcome': name, "session": session,
        inmessage: req.flash('loginMessage')[0],
        upmessage: req.flash('signupMessage')[0]
    });

});

// 여기서부터 샘플입니다. 테스트 용도로만 사용하세요.
router.get('/createuser-test',function(req,res, next){
    var newUser = User({
        name: 'Peter2 Quill',
        username: 'starlord55afdf',
        password: 'password'
    });

    // save the user
    newUser.save(function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        console.log('User created!');
    });
});

router.get('/users-test',function(req,res, next){
    User.find({}, function (err, docs) {
      if (err) {
        console.log(err);
      }
        return res.status(200).send(docs);
    });
});

module.exports = router;
