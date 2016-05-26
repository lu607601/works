var mongoose=require('mongoose');
var userSchema=require("../model/userSchema.js");
var user=mongoose.model('usercollection',userSchema);
module.exports=user;