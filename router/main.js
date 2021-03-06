var passport = require('passport');
var session= require('express-session');
var flash    = require('connect-flash');

module.exports = function(app)
{
    var User = require('../models/user');
    var BoardContent = require('../models/boardSchema');

    app.get('/',function(req,res){
        res.render('index.ejs',{welcome:""})
     });
    //  app.get('/about',function(req,res){
    //     res.render('about.html');
    // });

    //jinkeonsu add begin ----
    //게시판 페이지
    app.get('/board',function(req,res){
      BoardContent.find({}, function (err, docs) {
        // return res.status(200).send(docs);
        if(err) {
          console.log('get board list failed')
        };
        res.render('boardList.html', {contents: docs});
      });
      // res.render('boardList.html');
    });

    app.get('/writeBoard',function(req,res){
      res.render('boardWrite.html');
    });


    app.get('/boardList',function(req,res){
      BoardContent.find({}, function (err, docs) {
        return res.status(200).send(docs);
      });
    });

    app.get('/saveBoard',function(req,res){
      var aNewBoard = BoardContent({
        writer: 'keonsu',
        password: '',
        title: 'First Report',
        contents: 'this is content, this is content, this is content',
        date: Date(),
        deleted: false
      });
      aNewBoard.save(function(err){
        if (err) {
            return res.status(500).send(err);
        }
        console.log('a new board created!');
      });
    });
    //jinkeonsu add end -----

// 여기서부터 샘플입니다. 테스트 용도로만 사용하세요.
    app.get('/createuser',function(req,res){
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

    app.get('/users',function(req,res){
      User.find({}, function (err, docs) {
        return res.status(200).send(docs);
      });
    });




};
