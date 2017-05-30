// 게시판 페이지에서 필요한 자바스크립트 함수들 모아 놓음
// Jin keonsu
//

// var boardApi = {
  // var mongoose = require('mongoose');
  // mongoose.connect('mongodb://ds155411.mlab.com:55411');
  //
  // var db = mongoose.connection;
  // db.on('error', console.error.bind(console, 'connection error:'));
  // db.once('open', function() {
  // // we're connected!
  //   console.log("db connected");
  // });
  //
  // var testSchema = mongoose.Schema({
  //   count: {type:Number, default: 0},
  //   data: [{type:Number, default: 0}, {content: String}]
  // });
  // var testModel = mongoose.model('jksTest', testSchema);
// };

testFunction = function(){
    alert("this.testModel.data");
};

getBoardList = function() {
    var jsonData = {};
    $.ajax({
        url:'./boardList',
        type:'get',
        success:function(data){
          jsonData = data;
          console.log(data);
        }
    })
    return jsonData;
};
