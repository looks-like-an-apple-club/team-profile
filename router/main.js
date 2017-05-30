module.exports = function(app)
{
     app.get('/',function(req,res){
        res.render('index.html')
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
}
