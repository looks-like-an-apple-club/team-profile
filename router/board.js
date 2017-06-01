var BoardContent = require('../models/boardSchema');

var express = require('express');
var router = express.Router();


// path : /boards/
// 변경 추천 : '/boards:id' - 하나의 요소만 GET 할 때는 url parameter를 쓰는 형태로 사용합니다.
router.get('/', function(req, res, next) {
    BoardContent.find({}, function (err, docs) {
        // return res.status(200).send(docs);
        if(err) {
            console.log('get board list failed')
        };
        res.render('boardList.html', {contents: docs});
    });
    // res.render('boardList.html');
});

// path : /boards/write
router.get('/write', function(req, res, next) {
    res.render('boardWrite.html');
});

// path : /boards/list
// 변경 추천 : '/boards' - 기본적으로 해당 요소의 GET은 이미 전체 listing을 한다는 의미이므로 list 같은 중복 표현은 쓰지 않는 게 좋습니다.
router.get('/list', function(req, res, next) {
    BoardContent.find({}, function (err, docs) {
        return res.status(200).send(docs);
    });
});

// path : '/boards/save'
// 변경 추천 : '/boards' POST - POST가 저장의 의미를 이미 가지고 있으므로 save 같은 표현은 쓰지 않는 게 좋습니다.
router.get('/save', function(req, res, next) {
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

module.exports = router;
