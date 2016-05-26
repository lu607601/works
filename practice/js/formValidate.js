/**
 * aqiData，存储用户输入的空气指数数据
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 */
 function trim(str){
  return str.replace(/\s/g,'');
 }
function addAqiData() {
   var oCityValue=document.getElementById('aqi-city-input').value;
   var oValueValue=document.getElementById('aqi-value-input').value;
   oCityValue=trim(oCityValue);
   oValueValue=trim(oValueValue);
   if(!/^[\u4e00-\u9fa5]*$/.test(oCityValue)||!/^\d+$/.test(oValueValue)){
   	  alert("输入错误！！");
   }else{
      aqiData[oCityValue]=oValueValue;
   }
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
   var oTable=document.getElementById('aqi-table');
   var str;
   str="<tr><td>"+"城市"+"</td><td>"+"空气质量"+"</td><td>"+"操作"+"</td></tr>";
   for(var k in aqiData){
        str+="<tr><td>"+k+"</td><td>"+aqiData[k]+"</td><td><button>"+"删除"+"</button></td></tr>";
   }
   //console.log(str);
   oTable.innerHTML=k?str:'';
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var target=window.event.target||window.event.srcElement;
  var event=target.parentNode.previousSibling.previousSibling;
  if(target.nodeName.toLowerCase()=='button'){
      delete aqiData[event.innerHTML];
   }
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var oAddBtn=document.getElementById('add-btn');
  oAddBtn.onclick=addBtnHandle;
  var oTable=document.getElementById('aqi-table');
  oTable.onclick=delBtnHandle;
}

init();