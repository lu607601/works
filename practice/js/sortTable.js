(function(){
	var clickBtn,btns=[];//被点击的那个按钮
	var title=["姓名","语文","数学","英语","总分"];
	var childs={
		"姓名":["小红","小兰","小明","小李","小南"],
		"语文":[80,70,90,80,70],
	    "数学":[80,70,80,90,90],
	    "英语":[70,90,80,70,80],
	    "总分":[230,230,250,240,240]
	}//childs
	var table={
		  //初始化样式
         init:function(){
             var oUl=document.createElement("ul");
             //创建标题部分
             var oLi=document.createElement('li');
             var oCellUl=document.createElement('ul');
             oCellUl.className="cellUl topBor";
             for(var j=0;j<title.length;j++){
                var oCellLi=document.createElement('li');
                oCellLi.className="cell";
                oCellLi.innerHTML=title[j];
                if(j!=0){
                   var oI=document.createElement("i");
                    oI.className="up";
                    oI.index=j;
                    btns.push(oI);
                    oCellLi.appendChild(oI);
                }              
                oCellUl.appendChild(oCellLi);       
             }//for-j
             oLi.appendChild(oCellUl);
             oUl.appendChild(oLi);
             document.getElementsByTagName('body')[0].appendChild(oUl);
             //创建标题下面的部分
             for(var i=0;i<childs[title[0]].length;i++){
                  var oLi=document.createElement('li');
                  var oCellUl=document.createElement('ul');
                  oCellUl.className="cellUl";
                  for(var j=0;j<title.length;j++){
                     var oCellLi=document.createElement('li');
                     oCellLi.className="cell";
                     oCellLi.innerHTML=childs[title[j]][i];
                     oCellUl.appendChild(oCellLi);
                  }//for-j
                  oLi.appendChild(oCellUl);
                  oUl.appendChild(oLi);
             }//for-i
             document.getElementsByTagName('body')[0].appendChild(oUl);
         },//init
         //绑定事件
         addEvent:function(){
            for(var i=0;i<btns.length;i++){
                btns[i].addEventListener('click',function(){
                	clickBtn=this;
                	table.changeUpDown();
                	table.sortT();
                	table.resultSortLayer();
                },false);
            }//for-i
         },//addEvent
         //改变最终结果
         resultSortLayer:function(){
            var aCellUl=document.getElementsByClassName('cellUl');
            for(var i=1;i<aCellUl.length;i++){
                aCellUl[i].children[clickBtn.index].innerHTML=childs[title[clickBtn.index]][i-1];
            }
         },//resultSortLayer
         //改变up和down的标识
         changeUpDown:function(){
         	if(clickBtn.className.indexOf("up")!=-1){
         	  clickBtn.className=clickBtn.className.replace(/up/g,'down');
         	}else{
              clickBtn.className=clickBtn.className.replace(/down/g,'up');
         	}//if-else
         },//changeUpDown
         //sort排序
         sortT:function(){
            childs[title[clickBtn.index]].sort(this.compare);
         },
         //sort排序的compare
         compare:function(val1,val2){
         	if(clickBtn.className.indexOf("up")!=-1){
         		return val1-val2;
         	}else{
                return val2-val1;
         	}        	
         }
	};//table
	table.init();
	table.addEvent();
})();