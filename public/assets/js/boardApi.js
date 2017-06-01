// 게시판 페이지에서 필요한 자바스크립트 함수들 모아 놓음
// Jin keonsu


testFunction = function(){
    alert("this.testModel.data");
};

getBoardList = function() {
    var jsonData = {};
    $.ajax({
        url:'./boards/list',
        type:'get',
        success:function(data){
          jsonData = data;
          console.log(data);
        }
    })
    return jsonData;
};

getCommentList = function() {
    var jsonData = {};
    $.ajax({
        url:'./boards/vcomment',
        type:'get',
        success:function(data){
          jsonData = data;
          console.log(data);
        }
    })
    return jsonData;
};
