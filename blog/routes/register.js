var express=require("express");
var router=express.Router();
router.get("/",function(req,res,next){
    res.render('register',{});
});
router.post("/",function(req,res,next){
	var user={
		username:req.body.username,
		psw:req.body.psw
	};
    res.redirect('/');
});
module.exports=router;