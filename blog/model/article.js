var mongoose=require('mongoose');
var articleSchema=require('../model/articleSchema');
var Article=mongoose.model('articlecollection',articleSchema);
module.exports=Article;