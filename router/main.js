var passport = require('passport');

module.exports = function(app)
{
    var User = require('../models/user');

     app.get('/',function(req,res){
        res.render('index.html');
     });
    //  app.get('/about',function(req,res){
    //     res.render('about.html');
    // });

    //jinkeonsu add begin ----
    //게시판 페이지
    app.get('/board',function(req,res){
      res.render('boardList.html');
    });

    //jinkeonsu add end -----

// 여기서부터 샘플입니다. 테스트 용도로만 사용하세요.
    app.get('/createuser',function(req,res){
      var newUser = User({
        name: 'Peter Quill',
        username: 'starlord55',
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

    app.get('/users',function(req,res){
      User.find({}, function (err, docs) {
        return res.status(200).send(docs);
      });
    });

    app.post('/signIn', passport.authenticate('signin', {
        failureRedirect: '/profile'
    }), function (req, res) {
        res.redirect('/');
    });

    app.post('/signUp',passport.authenticate('signup', {
        failureRedirect: '/profile',
    }), function (req, res) {
        res.redirect('/');
    })

    app.get('/profile', isLoggedIn, function(req, res, next) {
        res.render('index', { title: 'You are logged in.' });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        } else {
            console.log("test");
        }
    }
};
