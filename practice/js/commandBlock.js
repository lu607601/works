
var oMain=document.getElementById('main');
var  oInputTxt=document.getElementById('inputTxt');
var  oGoBtn=document.getElementById('go');
var  oReset=document.getElementById('reset');
var  oTxtUl=document.getElementById('txtUl');

function addEvent(ele,type,handle){ 
   if(ele.addEventListener){
      ele.addEventListener(type,handle,false);
   }else if(ele.addEvent){
      ele.attachEvent('on'+type,handle);
   }else{
      ele['on'+type]=null;
   }
}//addEvent
//进行布局
(function layOut(){
   var oFragment=document.createDocumentFragment();
   //创建第一行数字行1、2、3....10
   var oUl=document.createElement('ul');
   oUl.className='ulCls';
   var oLi=document.createElement('li');
   oLi.className='ul-Li row col';
   oFragment.appendChild(oLi);
   for(var i=1;i<=10;i++){
     var oLi=document.createElement('li');
     oLi.className='ul-Li row';
     oLi.innerHTML=i;
     oFragment.appendChild(oLi);
   }
   oUl.appendChild(oFragment);
   oMain.appendChild(oUl);
   //创建中间九行
   for(i=1;i<=10;i++){
   	 var oFragment=document.createDocumentFragment();
   	 var oUl=document.createElement('ul');
     oUl.className='ulCls';
   	 var oLi=document.createElement('li');
     oLi.className='ul-Li col';
     oLi.innerHTML=i;
     oFragment.appendChild(oLi);
       for(j=1;j<=10;j++){
         var oLi=document.createElement('li');
          oLi.className='ul-Li';
          oFragment.appendChild(oLi);
       }//for
     oUl.appendChild(oFragment);
     oMain.appendChild(oUl);
   }//for
   //创建最后一行
   var oUl=document.createElement('ul');
   oUl.className='ulCls';
   oFragment.appendChild(oUl);
   var oLi=document.createElement('li');
   oLi.className='ul-Li col';
   oLi.innerHTML=10;
   oFragment.appendChild(oLi);
   for(var i=1;i<=10;i++){
     var oLi=document.createElement('li');
     oLi.className='ul-Li bottomBorder';
     oFragment.appendChild(oLi);
   }
   oMain.appendChild(oUl);
})();//layOut
//创建box
(function creatBox(){
    var oBox=document.createElement('div');
    oBox.id='box';
    oBox.className='box';
    var oBoxTop=document.createElement('div');
    var oBoxBottom=document.createElement('div');
    oBoxTop.className='box-top';
    oBoxBottom.className='box-bottom';
    oBox.appendChild(oBoxTop);
    oBox.appendChild(oBoxBottom);
    oMain.appendChild(oBox);
})();
var oBox=document.getElementById('box');
var oBoxTop=document.getElementById('box-top');
var oBoxBottom=document.getElementById('box-bottom');
var pos={
    	x:5,
    	y:5,
    	direction:1,
}//pos
function move(order,n,row){
    switch(order){
          case 'GO':
          	if(pos.direction==1){
              pos.y=pos.y-n<1?1:pos.y-n;
          	}else if(pos.direction==2){
          	  pos.x=pos.x+n>10?10:pos.x+n;              
          	}else if(pos.direction==3){
              pos.y=pos.y+n>10?10:pos.y+n;
          	}else if(pos.direction==4){
          	  pos.x=pos.x-n<1?1:pos.x-n;
          	}//if-else
          	oBox.style.left=pos.x*51+'px';
          	oBox.style.top=pos.y*51+'px';
          	break;
          case 'TUN LEF': 
          	  pos.direction-=1;
              if(pos.direction<=0){
                 pos.direction=4;
              }//if
              oBox.style.transform=
              oBox.style.webkitTransform=
              oBox.style.msTransform='rotate('+90*(pos.direction-1)+'deg)';
              break;
          case 'TUN RIG':
              pos.direction+=1;
              if(pos.direction>4){
                 pos.direction=1;
              }//if
              oBox.style.transform=
              oBox.style.webkitTransform=
              oBox.style.msTransform='rotate('+90*(pos.direction-1)+'deg)';
              break;
          case 'TUN BAC':
              pos.direction+=2;
              if(pos.direction>4){
                 pos.direction-=4;
              }//if            
              oBox.style.transform=
              oBox.style.webkitTransform=
              oBox.style.msTransform='rotate('+90*(pos.direction-1)+'deg)';
              break; 
          case 'TRA LEF':
              pos.x=pos.x-n<1?1:pos.x-n;
              oBox.style.left=pos.x*51+'px';
              break;
          case 'TRA TOP':
              pos.y=pos.y-n<1?1:pos.y-n;
              oBox.style.top=pos.y*51+'px';
              break;
          case 'TRA RIG':
              pos.x=pos.x+n>10?10:pos.x+n; 
              oBox.style.left=pos.x*51+'px';
              break;
          case 'TRA BOT':
              pos.y=pos.y+n>10?10:pos.y+n;
              oBox.style.top=pos.y*51+'px';
              break;
          case 'MOV LEF':
              pos.direction=4;
              oBox.style.transform=
              oBox.style.webkitTransform=
              oBox.style.msTransform='rotate('+90*(pos.direction-1)+'deg)';
              pos.x=pos.x-n<1?1:pos.x-n;
              oBox.style.left=pos.x*51+'px'; 
              break;
          case 'MOV TOP':
              pos.direction=1;
              oBox.style.transform=
              oBox.style.webkitTransform=
              oBox.style.msTransform='rotate('+90*(pos.direction-1)+'deg)';
              pos.y=pos.y-n<1?1:pos.y-n;
              oBox.style.top=pos.y*51+'px'; 
              break;
          case 'MOV RIG':
              pos.direction=2;
              oBox.style.transform=
              oBox.style.webkitTransform=
              oBox.style.msTransform='rotate('+90*(pos.direction-1)+'deg)';
              pos.x=pos.x+n>10?10:pos.x+n; 
              oBox.style.left=pos.x*51+'px'; 
              break;
          case 'MOV BOT':
              pos.direction=3;
              oBox.style.transform=
              oBox.style.webkitTransform=
              oBox.style.msTransform='rotate('+90*(pos.direction-1)+'deg)';
              console.log('pos.y+n',pos.y,pos.y+n);
              pos.y=(pos.y+n)>10?10:pos.y+n;
              console.log('pos.y',pos.y);
              oBox.style.top=pos.y*51+'px';
              break;
          default:
              console.log(order+"指令输入有误！！"); 
              oTxtUl.children[row].style.color="red";                      
    }
}//move

addEvent(oInputTxt,'keyup',function(){
     oTxtUl.innerHTML='';
     var rows=oInputTxt.value.split("\n");
     var len=rows.length;
     for(var i=0;i<len;i++){
       var oLi=document.createElement('li');
       oLi.innerHTML=i+1;
       oLi.className='txtLi';
       oTxtUl.appendChild(oLi);
     }
}); //oInputTxt
addEvent(oInputTxt,'scroll',function(){
     oTxtUl.style.top=-oInputTxt.scrollTop+'px';
});//addEvent
//reset指令
addEvent(oReset,'click',function(){
   oInputTxt.value='';
   oTxtUl.innerHTML='';
});//oReset
//取得输入框中的指令
(function getInstru(){   
   addEvent(oGoBtn,'click',function(){
       var cmds=oInputTxt.value.trim().split('\n');
       var i=0,len=cmds.length;
       var timer=setInterval(function(){
          if(i>=len-1){
            clearInterval(timer);
          }
          var index=cmds[i].search(/\d+/);
          var cmd=index==-1?cmds[i].trim():cmds[i].substring(0,index).trim();
          var num=parseInt(cmds[i].substring(index).trim());
          move(cmd,num,i);
           i++;
          },500);         
    });//
})();//getInstru
