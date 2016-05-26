var mongoose=require('mongoose');
var db=require('../model/db.js');
var Schema=mongoose.Schema;
var userSchema=new Schema({
      username:{type:String,default:'default-1'},
      email:{type:String,default:'default@qq.com'}
    });

module.exports=userSchema;