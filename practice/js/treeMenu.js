/*样式交互、节点数据、节点操作*/
var EventUtil={
  addEvent:function(ele,type,handle){
    if(ele.addEventListener){
       ele.addEventListener(type,handle,false);
    }else if(ele.attachEvent){
       ele.attachEvent('on'+type,handle);
    }else{
       ele['on'+type]=handle;
    }
  }
};

function  Node(obj){
   this.parent=obj.parent;
   this.childs=obj.childs||[];
   this.data=obj.data||'';
   this.selfElement=obj.selfElement;//从对应的js对象找到对应的dom对象
   this.selfElement.Node=this;//从对应的dom对象找到对应的js对象
}//Node

Node.prototype={
   render:function(btn,hide){
        if(btn){
          if(this.isLeaf()){
            this.selfElement.children[0].children[0].innerHTML='';
          }else  if(this.isFold()){//内容是折叠的
            this.selfElement.children[0].children[0].innerHTML=' + ';        
          }else{
            this.selfElement.children[0].children[0].innerHTML=' - ';
          }
         }//btn
       if(hide){
          if(this.selfElement.className.indexOf('hide')!=-1){
              this.selfElement.className= this.selfElement.className.replace(/hide/,'');
          }else{
              this.selfElement.className+=' hide';
          }         
       }//hide
   },
   addChild:function(text){
        if(text==null)return this;
        if (text.trim() == "") {
            alert("节点内容不能为空！");
            return this;
        }
        // 先增加子节点，再渲染自身样式
        // 若当前节点关闭，则将其展开
        if(!this.isLeaf() && this.isFold()){
            this.toggleFold();
        }
        oCol=document.createElement('div');
        oCol.className="col";
        var str="<div class='head'><span class='mark'></span><span class='title'>"
               +text+"</span><span class='add'>+</span><span class='del'>-</span></span>";
        oCol.innerHTML=str;
        var newNode=new Node({parent:this,childs:[],data:text,selfElement:oCol});
        this.childs.push(newNode);      
        this.selfElement.appendChild(oCol); 
        this.render(true,false);
        return this;    
   },//add
   delChild:function(){
        this.parent.selfElement.removeChild(this.selfElement);
        for(var i=0;i<this.parent.childs.length;i++){
            if(this.parent.childs[i]==this){
                this.parent.childs.splice(i,1);
            }
        }
        this.parent.render(true,false);
        return this;
   },//del
   toggleFold:function(){
         for(var i=0;i<this.childs.length;i++){
            this.childs[i].render(false,true);
         }
         this.render(true,false);
         return this;
   },//toggleFold
   isLeaf:function(){
       if(this.childs.length==0){
       	  return 1;
       }else{
          return 0;
       }
   },//isLeaf
   isFold:function(){
       if(this.isLeaf()){
        return 0;
       }else if(this.childs[0].selfElement.className.indexOf('hide')==-1){//展开
          return 0;
       }else{
          return 1;
       }
   }
}//prototype
var root=new Node({parent:null,childs:[],data:"计算机书目",selfElement:document.getElementById('root'),});

/*----------------------动态生成dom树------------------------------*/
root.addChild("办公类").addChild("编程类").addChild("网络类");
root.childs[0].addChild("windows应用").addChild("office快速入门");
root.childs[1].addChild("c语言程序设计").addChild("java入门到精通").addChild("js权威指南");
root.childs[2].addChild("网络基础").addChild("TCP/IP协议");

/*------------------------操作------------------------*/
(function(){
    EventUtil.addEvent(root.selfElement,'click',function(event){
      var target=event.target||event.srcElement;     
      //找到点击对象的父节点
      var oParent=target.parentNode.parentNode;
      if(target.className.indexOf('mark')!=-1||target.className.indexOf('title')!=-1){//进行展开或者折叠
           oParent.Node.toggleFold();
      }else if(target.className.indexOf('add')!=-1){//点击在了add上的按钮
           oParent.Node.addChild(prompt("请输入要加入的节点内容"));
      }else if(target.className.indexOf('del')!=-1){//点击在了del上的按钮
           oParent.Node.delChild();
      }
    });
})();

