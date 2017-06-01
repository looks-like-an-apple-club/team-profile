// 게시판 페이지에서 필요한 자바스크립트 함수들 모아 놓음
// Jin keonsu

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
          console.log('getCommentList success');
          jsonData = data;
        }
    })
    return jsonData;
};

saveOneComment = function(writer, comment) {
    var jsonData = {'writer':writer, 'comment':comment};
    $.ajax({
        url:'./boards/saveComment',
        type:'get',
        data: jsonData,
        success:function(data){
          console.log("save one comment success");
        }
    })
};
