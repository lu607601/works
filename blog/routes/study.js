var express=require('express');
var router = express.Router();
var multiparty=require('multiparty');
var util=require('util');
var fs=require('fs');
var jade=require('jade');
var Study=require('../model/study.js');  

/* GET users listing. */
router.get('/d/:id', function(req, res, next) {
   if(req.session.user){
      var id=req.params.id;
      if(id){
        Study.find({_id:id},function(err,studyFiles){
          var path=studyFiles[0]["path"].replace(/../,'public');
          fs.unlink(path,function(err){
            Study.remove({_id:id},function(err){
                if(err){
                   console.log(path,"作品删除失败！")
                 }else{
                   console.log(path,"作品已删除！")
                   res.redirect('../');
                 }//if-else
            });//Study.remove
          }) //fs.unlink;
        });//study.find
      }//if
   }else{ 
      res.writeHeader(200,{"Content-Type":"text/html"});
      res.end("only admin can do it!");   
   }
});
router.get('/', function(req, res, next) {
   //Study.remove({},function(err){if(err){console.log("删完")}}); 
   Study.find({},function(err,studyFiles){
/*      var html1=jade.renderFile('views/includes/aside.jade');
      console.log(html1,'\n\n');
      var html2=jade.compileFile('views/includes/aside.jade');
      console.log(html2);*/
      res.render('study',{studyFiles:studyFiles});
   }); 
});
//上传
router.post('/file/uploading',function(req,res,next){
     if(req.session.user){
          //生成multiparty对象，并配置上传目标路径
          var form=new multiparty.Form({uploadDir:'./public/studyFiles'});
          //上传完成后处理
          form.parse(req,function(err,fields,files){
              var filesTmp=JSON.stringify(files,null,2);
              if(err){
                 console.log('作品上传处理失败:'+err);
              }else{              
                    var inputFile=files.studyIptFile[0];
                    var uploadedPath=inputFile.path;
                    var dstPath='./public/studyFiles/'+inputFile.originalFilename;
                    var studyPath='../studyFiles/'+inputFile.originalFilename;
                    var filename=inputFile.originalFilename.split('.')[0];
                    //保存在数据库
                    var studyFile=new Study({name:filename,path:studyPath});
                    studyFile.save(function(err){
                         if(err){
                            console.log("studyFile保存失败！");
                         }else{
                            console.log("studyFile保存成功！");
                         }
                    });//studyFile.save 
                   //重命名
                    fs.rename(uploadedPath,dstPath,function(err){
                         if(err){
                             console.log("studyFile重命名失败");
                         }else{
                           res.redirect('..');
                         }//if-else
                    });//fs.rename
              }//if-else
          });//parse   
     }else{
      res.writeHeader(200,{"Content-Type":"text/html"});
      res.end("only admin can do it!");   
   }
});

module.exports=router;
