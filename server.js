var express = require('express');
var app = express();
var router = require('./router/main')(app);
var mongoose = require('mongoose');
require('dotenv').config();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
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
app.use(express.static('public'));
