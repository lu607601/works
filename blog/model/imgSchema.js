var mongoose=require('mongoose');
var db=require('../model/db.js');
var Schema=mongoose.Schema;
var imgSchema=new Schema({
      name:{type:String,default:'imgName'},
      path:{type:String,default:'imgPath'}
    });

module.exports=imgSchema;