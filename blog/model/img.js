var mongoose=require('mongoose');
var imgsSchema=require("../model/imgSchema.js");
var imgs=mongoose.model('imgscollection',imgsSchema);
module.exports=imgs;