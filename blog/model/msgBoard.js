var mongoose=require('mongoose');
var db=require('../model/db.js');
var Schema=mongoose.Schema;
var msgBoardSchema=new Schema({
	  son_id:Schema.Types.ObjectId,
	  article_id:Schema.Types.ObjectId,
	  sender_author:{type:String,default:'sender_author'},
	  receiver_author:{type:String,default:'receiver_author'},
      content:{type:String,default:'content'},
      title:{type:String,default:'title'},
      time:{type:String,default:'0-0-0'}
    });
var msgBoard=mongoose.model('msgcollection',msgBoardSchema);
module.exports=msgBoard;