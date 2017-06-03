var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session= require('express-session');
var flash    = require('connect-flash');
var ejs = require('ejs');
var bodyParser = require('body-parser');

require('dotenv').config();
var index = require('./router/index');
var user = require('./router/user');
var board = require('./router/board');


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(session({
    key:'sid',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
    }

}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지
app.use(flash()); // use connect-flash for flash messages stored in session
require('./router/config/passport')(passport);

var options = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS
};
mongoose.connect('mongodb://ds155411.mlab.com:55411/lookslikeapple', options, function(err) {
      console.log('mongodb connected');
      if (err) {
        console.error('mongodb connection error', err);
      }
    });

// 여기서 상위 경로 routing을 하므로 각 router controller에서는 하위 경로부터 지정하시면 됩니다.
app.use('/', index);
app.use('/users', user);
app.use('/boards', board);


var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

app.use(express.static('public'));
