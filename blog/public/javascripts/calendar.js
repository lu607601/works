    $(function(){
    	var firstDay='';//本月第一天是星期几
    	var monthDays=[];//每月的天数
    	var monthTitle='';
    	var yearTitle='';
    	//获取每月的第一天
      //判断是否是闰月
      //获得每月天数
      //创建表格
    	 
    	//标题处
        function setTitle(){
        	var oDate=new Date();
        	var year=oDate.getFullYear();
        	var month=oDate.getMonth()+1;
        	$('#year').text(year);
        	$('#month').text(month);
        	monthTitle=parseInt($('#month').text());
    	    yearTitle=parseInt($('#year').text());
        }    	 

        function getFirstDay(){
          var oDate=new Date();
          oDate.setFullYear(yearTitle);
          oDate.setMonth(monthTitle-1);
          oDate.setDate(1);
          firstDay=oDate.getDay()-1;
        }//getFirstDay
        function isLeap(){
    		if(yearTitle%400||(yearTitle%4&&yearTitle%100!=0))
    		    return 1;
    		else
    		    return 0;
        }//isLeap
        function getMonthDays(){
            monthDays=[0,31,28+isLeap(yearTitle),31,30,31,30,31,31,30,31,30,31];
        }//getMonthDays
        function createTable(){
            //表头
           var strTable="<thead><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></thead></tbody>"
           var date=new Date();
           getMonthDays(yearTitle);
           var line=Math.ceil(monthDays[monthTitle]/7)+1;
           //主体部分
           for(var i=0;i<line;i++){
              strTable+='<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
           }//for-i
           $('#calendarTable').html(strTable);
        }//createTable
        //将日期填到日历上去
        function insertDate(){
           var oDate=new Date();
           var year=oDate.getFullYear();
           var month=oDate.getMonth()+1;
           var nowDay=oDate.getDate();
           getFirstDay(yearTitle,monthTitle);
           if(firstDay==-1){
           	  firstDay=6;
           }
           for(var i=0;i<monthDays[monthTitle];i++){
           	    if(nowDay==i+1&&month==monthTitle&&yearTitle==year){
           	        $("#calendarTable tbody td").eq(i+firstDay).addClass('blue');
           	    }
               $("#calendarTable tbody td").eq(i+firstDay).text(i+1);
           }
        }//insertDate
        //清空表单里的所有数据
        function clearData(){
        	var len=$("#calendarTable tbody td").length;
           for(var i=0;i<len;i++){
               $("#calendarTable tbody td").eq(i).removeClass('blue').text('');
           }
        }//clear
        function update(){
        	$('#month').text(monthTitle);
        	$('#year').text(yearTitle);
        	clearData();
        	insertDate();
        }
        $('#pre').click(function(){
            monthTitle-=1;
            if(monthTitle==0){
            	monthTitle=12;
            	yearTitle-=1;
            }
            update();           
        });
        $('#next').click(function(){
            monthTitle+=1;
            if(monthTitle==13){
            	monthTitle=1;
            	yearTitle+=1;
            }
            update();
        });
         setTitle();
         createTable();
         insertDate();
    });