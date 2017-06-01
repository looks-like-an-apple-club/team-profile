var BoardContent = require('../models/boardSchema');
var VisitorBook = require('../models/visitorBook');

var express = require('express');
var router = express.Router();


// path : /boards/
// 변경 추천 : '/boards:id' - 하나의 요소만 GET 할 때는 url parameter를 쓰는 형태로 사용합니다.
router.get('/', function(req, res, next) {
  VisitorBook.find({}, function (err, docs) {
      if(err) {
          console.log('get visitor comment list failed');
      }
      console.log(docs);
      res.render('boardList.html', {contents: docs});
  });
    // res.render('boardList.html');
});

// path : '/boards/vcomment'
// 방명록 데이터를 읽어옴
router.get('/vcomment', function(req, res, next) {
    VisitorBook.find({}, function (err, docs) {
        if(err) {
            console.log('get /vcomment failed');
        }
        return res.status(200).send({contents: docs});
    });
});

// path : '/boards/saveComment'
// 방명록 데이터를 저장함
router.post('/saveComment', function(req, res){
    // var curDateTime = new Date();
    // var strDateTime = curDateTime.toLocaleDateString() + " " + curDateTime.toLocaleTimeString();
    var aNewComment = VisitorBook({
          writer: req.body.writer,
          comment: req.body.comment,
          date: Date()
    });
    aNewComment.save(function(err){
        if(err) {
            return res.status(500).send(err);
        }
        console.log('a new comment saved!');
        return res.status(200).send();
    });
});


//--------------------------------------------------------------//
// test block begin
// path : /boards/write
router.get('/write', function(req, res, next) {
    res.render('boardWrite.html');
});


// path : '/boards/save'
// 변경 추천 : '/boards' POST - POST가 저장의 의미를 이미 가지고 있으므로 save 같은 표현은 쓰지 않는 게 좋습니다.
router.get('/save', function(req, res, next) {
    var aNewBoard = BoardContent({
        writer: 'keonsuadf',
        password: '',
        title: 'First Report',
        contents: 'this is fakljdfkjalkjreo[iqwuroiuvnlajfcontent, this is content, this is content',
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
//--------------------------------------------------------------//
// test block end


module.exports = router;
