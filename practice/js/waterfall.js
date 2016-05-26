window.onload=function(){
   var oMain=document.getElementById('main');
   //获取所有的.pin元素
   var aPin=getByClsName(oMain,'pin');
   //取得一个图片的宽
   var oneWidth=aPin[0].offsetWidth;
   var docWidth=document.documentElement.clientWidth||document.body.clientWidth;
   var col=Math.floor(docWidth/oneWidth);
   //获得并设定omain的宽度
   oMain.style.width=oneWidth*col+"px";
   //存放每一列初始高度值的数组
   var heightArr=[];
   for(var i=0;i<col;i++){
      heightArr.push(aPin[i].offsetHeight);
   }//for-i
   //把除了第一行的所有的图片的position设为absolute,进行位置固定
   for(i=col;i<aPin.length;i++){
        aPin[i].style.position="absolute";
        aPin[i].style.top=getMinH(heightArr)[1]+"px";
        aPin[i].style.left=getMinH(heightArr)[0]*oneWidth+"px";
        heightArr[getMinH(heightArr)[0]]+=aPin[i].offsetHeight;
   }
   //监测页面高度
   //console.log(11,document.documentElement.scrollTop||document.body.scrollTop);
   //console.log(22,document.documentElement.clientHeight||document.body.clientHeight);
   //console.log(33,document.documentElement.scrollHeight||document.body.scrollHeight);
   
   window.onscroll=function(){
     var scrollH=document.documentElement.scrollHeight||document.body.scrollHeight;
	if(scrollH>getMinH(heightArr)[1]){
        loadMore(heightArr,oneWidth);
  	}//if
   }//window.onscroll
}//window.onload

//进行页面加载多余的图片
function loadMore(heightArr,oneWidth){
	var oMain=document.getElementById('main');
		    //创建新图片,并改变新加入图片的那一列的高度值
            var oPin=document.createElement("div");
            var oBox=document.createElement("div");
            var oImg=document.createElement("img");
            oPin.className="pin";
            oBox.className="box";
            oImg.src="images/"+Math.ceil(Math.random()*10)+".jpg";
            oBox.appendChild(oImg);
            oPin.appendChild(oBox);
            oMain.appendChild(oPin);
            oPin.style.position="absolute";
            oPin.style.top=getMinH(heightArr)[1]+"px";
            oPin.style.left=getMinH(heightArr)[0]*oneWidth+"px";
            heightArr[getMinH(heightArr)[0]]+=oPin.offsetHeight;

}//loadMore

//取得最小的高度值
function getMinH(heightArr){
   var minVal=Number.MAX_VALUE,minCol=0;
   for(var i=0;i<heightArr.length;i++){
        if(minVal>heightArr[i])
        {
        	minVal=heightArr[i];
        	minCol=i;
        }
   }
   return [minCol,minVal];
}
//获取类的工具
function getByClsName(oParent,cls){
   var result=[];
   var arr=oParent.getElementsByTagName("*");
   for(var i=0;i<arr.length;i++){
       if(arr[i].className==cls){
           result.push(arr[i]);
       }//if
   }//for
   return result;
}//getByClsName