var mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/blog');
var db=mongoose.connection;
db.on('error',function(error){
    console.log("数据库连接失败："+error);
});
db.on('open',function(){
    console.log("数据库连接成功！！");   
});

module.exports=db;