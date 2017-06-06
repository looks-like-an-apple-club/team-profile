// 게시판 페이지에서 필요한 자바스크립트 함수들 모아 놓음
// Jin keonsu

// ajax functions...
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
          console.log('getCommentList success', data);
          jsonData = data;
          // 이 부분에서 수신한 데이터를 가지고 DOM 조작 코드를 넣으시면 됩니다.
          // DOM 조작은 정답은 없지만 이런 식으로 하시면 됩니다. 잘 하고 계시네요.
          // 여러 형태의 샘플을 찾아서 참고하시는 게 도움이 됩니다.
          var theTableBody = document.getElementById('commentbody');
          while (theTableBody.firstChild) {
            theTableBody.removeChild(theTableBody.firstChild);
          }

          var comments = data.contents;

          if(comments.length>0) {
            for(var i in comments) {
              var theTr = document.createElement('tr');
              var theTd1 = document.createElement('td');
              var theTd2 = document.createElement('td');
              var theTd3 = document.createElement('td');
              var theTd4 = document.createElement('td');
              var theText1 = document.createTextNode(i.toString());
              var theText2 = document.createTextNode(comments[i].comment);
              var theText3 = document.createTextNode(comments[i].writer);
              var theText4 = document.createTextNode(comments[i].date);

              theTd1.appendChild(theText1);
              theTd2.appendChild(theText2);
              theTd3.appendChild(theText3);
              theTd4.appendChild(theText4);

              theTr.appendChild(theTd1);
              theTr.appendChild(theTd2);
              theTr.appendChild(theTd3);
              theTr.appendChild(theTd4);
              theTableBody.appendChild(theTr);
            }
          } else {
            var theTr = document.createElement('tr');
            var theTd = document.createElement('td');
            var theText = document.createTextNode('No data');

            theTd.appendChild(theText);
            theTr.appendChild(theTd);
            theTableBody.appendChild(theTr);
          }
        }
    });
    // return jsonData;  // 말씀드렸듯이, 이걸 return해도 HTML에서 직접 받아서 처리할 수는 없습니다.
    return null;
};

saveOneComment = function(comment) {
    var jsonData = {'comment':comment};
    $.ajax({
        url:'./boards/saveComment',
        type:'post',
        data: jsonData,
        success:function(data){
          console.log("save one comment success");
          getCommentList();
          // 생성한 데이터까지 포함해서 리스트에 표현하고 싶으면 여기서 reload를 한번 해주면 되겠죠?
          // getCommentList() 대신 기존에 있던 아이템을 지우고 다시 올리는 형태가 되던지, 아니면 추가된 것만 골라서 add해주던지 해야 겠네요. 직접 부딪치면서 고민해보시지요.
        }
    })
};
// ajax function end ....


// general functions...
commentSubmit = function (){
    // var writer = $.trim($("#writer").val());
    var comment = $.trim($("#comment").val());

    // console.log('===================================writer: ' + writer + ', comment:' +comment );
    saveOneComment(comment);

    // $("#writer").val('');
    $("#comment").val('');
};

// 페이지 처음 진입할 때 최초 로딩 한번 걸어줍니다.
$( document ).ready(function() {
  getCommentList();
});
