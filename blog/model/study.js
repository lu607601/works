var mongoose=require('mongoose');
var studyFileSchema=require('../model/studyFileSchema');
var study=mongoose.model('studyFilecollection',studyFileSchema);
module.exports=study; 