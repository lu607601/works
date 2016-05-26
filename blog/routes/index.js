var express = require('express');
var router = express.Router();
var Article=require('../model/article.js');

var pageLimit=5;
  
//写文章
router.get("/article/w",function(req,res,next){
    if(req.session.user){
       res.render('writeArticle',{admin:req.session.user}); 
    }else{
       res.writeHeader(200,{"Content-Type":"text/html"});
       res.end("only admin can edit it!");
    }
});
router.get('/article/e/:id',function(req,res,next){
     res.end("sorry,no code");
});
router.get('/article/d/:id',function(req,res,next){
  if(req.session.user){
      var id=req.params.id;
      if(id){
            Article.remove({_id:id},function(err){
                if(err){
                  console.log("文章删除失败");
                }
                res.redirect('../../');
           });//article.remove
      }
  }else{
       res.writeHeader(200,{"Content-Type":"text/html"});
       res.end("only admin can edit it!");
     }//if-else
});
router.get('/', function(req, res, next) {
	//Article.remove({},function(err){if(err){console.log("文章删除失败")}});
	 //文章分页查找
    var pageNum=req.query.page||1;
    var skipNum=(pageNum-1)*pageLimit;
    var query=Article.find().sort({date:1}).skip(skipNum).limit(pageLimit);
    query.exec(function(error,articlesResults){
      if(error){
          res.end("exec分页查询失败");
      }else{
          if(!req.query.page) {
            res.render('index',{articles:articlesResults,admin:req.session.user});
            }
          else {
            res.end(JSON.stringify({articles:articlesResults}));
          }
      }//if-else
    });//query.exec
});

router.post('/login', function(req, res, next) {
    var user={
      username:req.body.username,   
      psw:req.body.psw
    };
    if(user.username=="584628303@qq.com"&&user.psw=="lym-first-blog"){
        req.session.user=user;
        res.end(JSON.stringify({redirect:'/',admin:req.session.user}));
    }else{
        res.end();
    }
});
router.post('/loginOut', function(req, res, next) {
    req.session.user=null;
    res.end(JSON.stringify({redirect:'/'}));
});
router.post('/',function(req,res){
    var title=req.body["title"];
    var content=req.body["content"];
    var date=new Date();
    var dateS=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+"  "+date.getHours()+":"+date.getMinutes();
    if(!req.body){
    	console.log('req.body',为空);
    }
    var article=new Article({title:title,content:content,date:dateS});
    article.save(function(err){
        if(err){
        	console.log("article保存失败");
        }else{
        	console.log("article保存成功"); 
        }//if-else
    });//article.save
    Article.remove({title:/"简约至上"/g},function(err){
        if(err){
            console.log("删除失败！！",err);
        }else {
            console.log("删除成功！！");
        }
    });  
    //获取文章多少页
    Article.find({},function(err,docs){
          var totalPage=Math.ceil(docs.length/pageLimit);
          res.end(JSON.stringify({redirect:'../../',totalPage:totalPage}));
    });     
});
module.exports = router;
