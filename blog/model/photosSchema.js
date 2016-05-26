var mongoose=require('mongoose');
var db=require('../model/db.js');
var Schema=mongoose.Schema;
var photosSchema=new Schema({
      title:{type:String,default:'title'},
      describ:{type:String,default:'describ'},
      album:{type:Array,default:'album'}
    });

module.exports=photosSchema;