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

    app.post('/signIn',function(req,res){
        console.log("test");

        }
    )
    app.post('/signUp',function(req,res){
        console.log("signup");
    })



};
