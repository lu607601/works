function TreeNode(obj){
   this.parent=obj.parent;
   this.childs=obj.childs||[];
   this.data=obj.data||"";
   this.selfElement=obj.selfElement;//访问对应的DOM结点
   this.selfElement.TreeNode=this;//对应的DOM结点访问回来
}//treeNode

TreeNode.prototype={
	 constructor:TreeNode,
	 //color在label上,hidden在col上,btn在label下的第一个span上
	 render:function(btn,color,hidden,deColor){
	 	 //是否展开
	 	 if(btn){
            if(this.isLeaf()){
            	this.selfElement.getElementsByClassName('btn')[0].innerHTML="";
                this.selfElement.getElementsByClassName('btn')[0].className='btn noBorder';
            }else if(this.isFolder()){//是折叠的
            	this.selfElement.getElementsByClassName('btn')[0].innerHTML="+";
            	this.selfElement.getElementsByClassName('btn')[0].className='btn';
            }else{
                this.selfElement.getElementsByClassName('btn')[0].innerHTML="-";
                this.selfElement.getElementsByClassName('btn')[0].className='btn';
            }
	 	 }//if-btn
	 	 //是否有颜色显示
	 	 if(color){
	 	 	if(this.selfElement.getElementsByClassName('head')[0].className.indexOf('color')==-1){
               this.selfElement.getElementsByClassName('head')[0].className+=' color';
	 	 	}
	 	 }//if-color
          if(deColor){
	 	 		 this.selfElement.getElementsByClassName('head')[0].className=this.selfElement.getElementsByClassName('head')[0].className.replace(/color/g,'');
	 	 }//if-color
         //改变可见性
         if(hidden){
            if(this.selfElement.className.indexOf('hidden')==-1){
               this.selfElement.className+=' hidden';
	 	 	}else{
	 	 	   this.selfElement.className=this.selfElement.className.replace(/hidden/g,'');
	 	 	}
         }//hidden
	 },
     addNode:function(text){
     	if(text==null)return this;
     	if (text.trim() == "") {
            alert("节点内容不能为空！");
            return this;
        }
        // 先增加子节点，再渲染自身样式
        // 若当前节点关闭，则将其展开
        if(!this.isLeaf() && this.isFolder()){
            this.toggleFold();
        }
         var oDiv=document.createElement('div');
         oDiv.className='col';
         var oLabel=document.createElement('label');
         oLabel.className='head';
         var oSpan1=document.createElement('span');
         oSpan1.className='btn noBorder';
         var oSpan2=document.createElement('span');
         oSpan2.className='headTitle';
         oSpan2.innerHTML=text;
         var oSpan3=document.createElement('span');
         oSpan3.className='add';
         oSpan3.innerHTML='add';
         var oSpan4=document.createElement('span');
         oSpan4.className='del';
         oSpan4.innerHTML='del';
         oLabel.appendChild(oSpan1);
         oLabel.appendChild(oSpan2);
         oLabel.appendChild(oSpan3);
         oLabel.appendChild(oSpan4);
         oDiv.appendChild(oLabel);
         this.selfElement.appendChild(oDiv);
         this.childs.push(new TreeNode({parent:this,childs:[],data:text,selfElement:oDiv}));
         this.render(true,false);
         return this;
     },//addNode
     delNode:function(){
     	//..........................................如果是头节点呢。。。。？？？？？
         this.parent.selfElement.removeChild(this.selfElement);//移出dom中的节点
         //从父节点中删除孩子
         for(var i=0;i<this.parent.childs.length;i++){
               if(this.parent.childs[i]==this){
                     this.parent.childs.splice(i,1);
               }//if
               break;
         }//for
         this.parent.render(true,false,false)
     },//delNode
     //展开和收拢节点---------展开的意思就是子节点都显示出来
     toggleFold:function(){
        if(this.isLeaf()){
            return this;
        }//if
        for(var i=0;i<this.childs.length;i++){
            this.childs[i].render(false,false,true);
        }
        this.render(true,false);
        return this;
     },//toggleFold
     //判断是否为叶节点
     isLeaf:function(){
         if(this.childs.length==0){
         	return 1;
         }
         else {
         	return 0;
         }
     },
     //判断结点是否处于折叠状态
     isFolder:function(){
         if(this.isLeaf()){
         	return 0;
         }else if(this.childs[0].selfElement.className.indexOf('hidden')!=-1){
            return 1;
         }else {
         	return 0;
         }
     }//isFolder
}//treeNodeprototype
//////////////////////以上是封装TreeNode的代码//////////////////////////////////
///////////////////////////事件绑定区//////////////////////////////
var root=new TreeNode({parent:null,childs:[],data:"计算机书目",
	     selfElement:document.getElementsByClassName('col')[0]});
var selectNode;
//为root绑定事件代理，处理所有节点的点击事件
addEvent(root.selfElement,"click",function(e){
       var target=e.target||e.srcElement;
       var domNode=target;
       while(domNode.className.indexOf('col')==-1)
       	     domNode=domNode.parentNode;
       selectNode=domNode.TreeNode;
       if(target.className.indexOf('headTitle')!=-1||target.className.indexOf('btn')!=-1){
       	  //如果点击的是文字或者是按钮
          selectNode.toggleFold();
       }else if(target.className.indexOf('add')!=-1){
          selectNode.addNode(prompt("请输入子结点的内容："));
       }else if(target.className.indexOf('del')!=-1){
          selectNode.delNode();
       }
});//addEvent
//给root绑定广度优先搜索函数，无需访问DOM，返回一个搜索结果队列
root.search=function(query){
     var result=[];
     var que=[];
     var current=this;
     que.push(current);
     while(que.length>0){
        var  current=que.shift();
        current.render(false,false,false,true);
        if(current.data==query){
             result.push(current);
        }//if
        for(var i=0;i<current.childs.length;i++){
             que.push(current.childs[i]);
        }//for
     }//while
     return result;
}//root.search
//搜索并显示结果
addEvent(document.getElementById("search"),"click",function(){
	var query=document.getElementById('inputTxt').value.trim();
    var result=root.search(query);
    if(result.length==0){
    	 alert("不存在所查找的节点");
    	 return ;
    	}
    for(var i=0;i<result.length;i++){
    	result[i].render(false,true,false);
    	var pathNode=result[i];
    	while(pathNode.parent!=null){
    	     if (pathNode.selfElement.className.indexOf(" hidden")!=-1) 
    	           pathNode.parent.toggleFold(); // 若是收拢状态，则展开
                pathNode = pathNode.parent;
           }//while
    }//for
})//addEvent
//清除搜索结果
//动态生成Demo树
root.addNode("办公类").addNode("编程类").addNode("网络类").addNode("动画类");
root.childs[0].addNode("Windows应用").addNode("office快速入门");
root.childs[1].addNode("c语言程序设计").addNode("Java从入门到精通").addNode("Asp.Net入门经典");
root.childs[2].addNode("网络基础").addNode("TCP/IP协议");
root.childs[3].addNode("PhotoShop创意设计");
//初始化查询Demo值
//document.getElementById("searchText").value="JavaScript";


//跨浏览器兼容的工具函数
function addEvent(element,type,handler){
    if(element.addEventListener){
    	element.addEventListener(type,handler,false);
    }else if(element.attachEvent){
        element.attachEvent('on'+type,handler);
    }else{
        element['on'+type]=handler;
    }//else
}



