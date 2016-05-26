var express=require('express');
var router=express.Router();
router.get('/',function(req,res,next){ 
	res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("sorry~nothing~");
});
module.exports=router;