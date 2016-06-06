var mongoose=require('mongoose');
var db=require('../model/db.js');
var Schema=mongoose.Schema;
var userSchema=new Schema({
      username:{type:String,default:'default-1'},
      psw:{type:String,default:'default@qq.com'}
    });
var user=mongoose.model('usercollection',userSchema);
module.exports=user;
