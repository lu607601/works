var mongoose=require('mongoose');
var photosSchema=require("../model/photosSchema.js");
var photos=mongoose.model('photoscollection',photosSchema);
module.exports=photos;