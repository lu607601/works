var mongoose=require('mongoose');
var db=require('../model/db.js');
var Schema=mongoose.Schema;
var studyFileSchema=new Schema({
      name:{type:String,default:'studyFileName'},
      path:{type:String,default:'studyFilePath'},
      date:{type:String,default:'0-0-0'}
    });
var study=mongoose.model('studyFilecollection',studyFileSchema); 
module.exports=study; 