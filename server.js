var express = require('express');
var app = express();
var router = require('./router/main')(app);
var mongoose = require('mongoose');
var passport = require('passport');


var session= require('express-session');
var pass = require('./config/passport')(passport);


require('dotenv').config();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


// mongoose.connect('mongodb://developer:appleclub@ds155411.mlab.com:55411/lookslikeapple');

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
var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지

app.use(express.static('public'));
