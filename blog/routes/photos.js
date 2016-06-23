var express=require('express');
var router=express.Router();
var multiparty=require('multiparty');
var util=require('util');
var fs=require('fs');
var Img=require('../model/img.js');

router.get('/',function(req,res,next){ 
    Img.find(function(err,photos){
        res.render('photos', { photos: photos});
    });
});
//上传
router.post('/file/uploading',function(req,res,next){
  if(req.session.user){
     //生成multiparty对象，并配置上传目标路径
     var form=new multiparty.Form({uploadDir:'./public/images'});
     //上传完成后处理
     form.parse(req,function(err,fields,files){
         var filesTmp=JSON.stringify(files,null,2);
         if(err){
            console.log('error:'+err);
         }else{
              var inputFiles=files.imgIptFile;
              var body='';
              inputFiles.forEach(function(item,index,array){
                     var uploadedPath=item.path;
                     var dstPath='./public/images/'+item.originalFilename;
                     var path='../images/'+item.originalFilename
                     var img=new Img({name:item.originalFilename,path:path});
                     img.save(function(err){
                       if(err){
                           console.log("图片保存失败！");
                        }else{
                           console.log("图片保存成功！");
                        }
                     });//保存成功
                   fs.rename(uploadedPath,dstPath,function(err){
                      if(err){
                          console.log("\n\n",index,"---------照片命名失败----------",err,"\n\n");
                      }else if(index==inputFiles.length-1){
                           res.redirect("..");
                       }//if-else
                     });//fs.rename
              });//inputFiles.forEach
              //查找图片
         }//if-else
     });//parse 
   }else{
      res.writeHeader(200,{"Content-Type":"text/html"});
      res.end("only admin can do it!");   
  }  
});
module.exports=router;