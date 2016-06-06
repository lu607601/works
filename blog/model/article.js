var mongoose=require('mongoose');
var db=require('../model/db.js');
var Schema=mongoose.Schema;
var articleSchema=new Schema({
      title:{type:String,default:'title'},
      content:{type:String,default:'content'},
      date:{type:String,default:'0-0-0'},
    });
var article=mongoose.model('articlecollection',articleSchema);
module.exports=article;