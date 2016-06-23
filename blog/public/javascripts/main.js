$(function(){   
	/*-----------------------导航-----------------------------*/
    $('.navBarLeft li').each(function(){  
        var activeNav=window.location.pathname.replace('/','');
        $.each($('.navBarLeft li'),function(){
           $(this).removeClass('active'); 
        });  
        switch(activeNav){ 
           case '':$('.navBarLeft li').eq(0).addClass('active');
                    break;
           case 'study':$('.navBarLeft li').eq(1).addClass('active');
                    break;
           case 'photos':$('.navBarLeft li').eq(2).addClass('active');
                    break;
           case 'activity':$('.navBarLeft li').eq(3).addClass('active');
                    break;                   
        }
    });//each
    /*-----------------------登录退出-----------------------------*/
    $('.login').click(function(){
        $('#signInBtn').text("登录");
    });
    $('.register').click(function(){
        $('#signInBtn').text("注册");
    });
    $('#signInBtn').click(function(){
         var username=$('#inputEmail').val(); 
         var psw=$('#inputPassword').val();   
         if($('#signInBtn').text()=="注册"){
             $.post('/register',{username:username,psw:psw},function(data){
                var data=JSON.parse(data);
                $.cookie('adminName',data["admin"]["username"]);
                $('#loginM a').text('');
                $('#loginM').hide();
                $('#adminName a').eq(0).text($.cookie('adminName'));
                $('#loginOut').removeClass('hidden');
                //关闭模态框
                $('#loginModal').modal('toggle');               
             });
         }else{
             $.post('/login',{username:username,psw:psw},function(data){
                var data=JSON.parse(data);
                if(data["admin"]){
                     $.cookie('adminName',data["admin"]["username"]);
                     $('#loginM a').text('');
                     $('#loginM').hide();
                     $('#adminName a').eq(0).text($.cookie('adminName'));
                     $('#loginOut').removeClass('hidden');                    
                }else{
                    alert("登陆失败！");
                }
                    //关闭模态框
                     $('#loginModal').modal('toggle');
             });//$.post
            }
    });
    $('#loginOut').click(function(){
        $.post('/loginOut',function(data){
            $('#loginM a').text('登录');
            $('#loginM').show();
            $.cookie('adminName',null,{path:'/',expires:-10});
            $('#adminName').text('');
            $('#loginOut').addClass('hidden');
            location.href=JSON.parse(data)["redirect"];
        });//$.post
    });
    if($.cookie('adminName')==undefined){
        $('#loginM a').text('登录');
        $('#loginM').show();
        $('#adminName a').eq(0).text('');
        $('#loginOut').addClass('hidden');
    }else{
        $('#loginM a').text('');
        $('#loginM').hide();
        $('#adminName a').eq(0).text($.cookie('adminName'));
        $('#loginOut').removeClass('hidden');        
    }
    /*-----------------------文章截取-------------------------*/
    $('.articleContent').text($('.articleContent').text().substring(0,150)+'。。。');
    /*-----------------------文章评论-------------------------*/
    $('.commentBtn').click(function(){
        $.post('/',$('.comment').serialize(),function(data){
            console.log("---data---",data);
        });
    });
	/*-----------------------分页-----------------------------*/
	var totalPage=$.cookie('totalPage')||1;
    if(totalPage==1){
        $('.pager li:last').addClass("disabled");
        $('.pager li:first').addClass("disabled");
    } 
	//分页的ajax提交
	function ajaxPagination(url){
		$.get(url,function(data){
               var articles=JSON.parse(data)["articles"];
                $.each(articles,function(index,obj){
                     $($('.articleTitle')[index]).text(obj.title);
                     $($('.articleContent')[index]).text(obj.content);
                     $($('.articleDate')[index]).text(obj.date);
                     $($('.editArticle')[index]).attr("href",obj._id);
                     $($('.delArticle')[index]).attr("href",obj._id);
                });
    	 	})
	}
    //向前的那个按钮的分页的提交
    $('.pager li:first>a').click(function(){
            $('.pager li:last').removeClass("disabled");
            var curPage,path=window.location.pathname.replace('/','');
            if(path!=''){
                curPage=parseInt(path.split("=")[1]);
            }else{
                curPage=1;
            }  
            if(curPage==2){
                $('.pager li:first').addClass("disabled");
            }    
    	 	var url="/?page="+(curPage-1);
            ajaxPagination(url);
            return false;
       });
    //向后的那个按钮的分页的提交
    $('.pager li:last>a').click(function(){            
            $('.pager li:first').removeClass("disabled");
            var curPage,path=window.location.pathname.replace('/','');
            if(path!=''){
                curPage=parseInt(path.split("=")[1]);
            }else{
                curPage=1;
            }   
            if(curPage==totalPage-1){
                $('.pager li:last').addClass("disabled");
            }    
    	 	var url="/a?page="+(curPage+1);
            ajaxPagination(url);
            return false;
       });
	/*-----------------------写文章-----------------------------*/
	function ajaxWriteArticle(){
        var title=$('#wTitle').val();
        var txtArea=$('#wContent').val();
        $.post("/",{title:title,content:txtArea},function(data,status){
            var url=JSON.parse(data)["redirect"];
            //console.log(url);
            var totalPage=JSON.parse(data)["totalPage"];
            console.log(totalPage);
            $.cookie('totalPage',totalPage);
            //console.log("-----------------\n",window.location);
            location.href=url;
        });//$.post
   }//ajaxWriteArticle   
	var submitBtn=$('#wSbmitBtn');
    var resetBtn=$('#wRsetBtn');
    submitBtn.click(function(){
        ajaxWriteArticle();
    });
    resetBtn.click(function(){
        $('#descib').val('');
    });
});
