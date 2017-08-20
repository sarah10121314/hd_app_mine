$(function() {

   
    addURLEvent();
    var minBulletSize = 3;
    var maxBulletSize = 70;
    var min = Infinity;
    var max = -Infinity;

    PMFrame.init();
    
    PMFrame.resize();
    $(window).resizeEnd({
        delay : 250
    }, function() {
    	PMFrame.resize();
    });


    $(document).on("click", "#switch-rtl", function(event) {
       
        $('#listdiv').mCustomScrollbar({
            scrollButtons: {
                enable: false
            },
            autoHideScrollbar: false,
            scrollInertia: 150,
            theme: "light-thin",
            set_height: 440,
            advanced: {
                updateOnContentResize: true
            }
        });
    });
    
	var flag = isLogin();

	//默认视图
	$.getJSON(getRootPath()+'/user/usercurrentview.action?time='+new Date().getTime(), function(data) {

		
		try {
			$("#viewName").html(data.name);
		} catch (e) {
//			logout();
		}

	});
	//视图下拉框加载
	$.getJSON(getRootPath()+'/user/userviewlist.action?time='+new Date().getTime(), function(data) {

		$("#viewList").empty();
		
		try {
			if(data!=null){
				for(var i=0;i<data.length;i++){
					$("#viewList").append("<li><a href='#' class='viewid' value='"+data[i].id+"'><span>"+data[i].name+"</span></a></li>");
				}
				//添加下拉框点击事件
				$(".viewid").each(function(i){
					   $(this).click(function(){
						   //判断是否登录
						   isLogin();
						   var $this=$(this);
						   $.msgbox("视图即将切换,界面将重新加载?", {
								type : "confirm",
								buttons : [{
											type : "submit",
											value : "确定"
										}, {
											type : "submit",
											value : "取消"
										}]
							}, function(result) {
								if (result == '取消')
									return;

								// submit data

								var html = $.ajax({
									   url: getRootPath()+"/user/switchview.action?viewid="+$this.attr('value'),
									   async: false
									  }).responseText;
								   
								   if(html.toLowerCase()=='true'){
									   location.reload() ;
								   }else{
									   $.msgbox("视图切换失败!", {
										   type : "confirm",
											buttons : [{
														type : "submit",
														value : "确定"
													}]
										});
								   }
								

							});
						   
						   
						   
					   }); 
					});
			}
		} catch (e) {
//			logout();
		}

	});
    
    //登出
    $('.user_logout').on("click",function(event){
    	logout();
    });
    
    $(document).on("click", ".theme-color", function(event) {
        var color = $(this).data('color');
        
        $('#listdiv').mCustomScrollbar({
            scrollButtons: {
                enable: false
            },
            autoHideScrollbar: false,
            scrollInertia: 150,
            theme: "light-thin",
            set_height: 440,
            advanced: {
                updateOnContentResize: true
            }
        });
    });


  
    
    //主页标签效果
    $('#tabmain').on('mouseover',tabIndex_mouseover);
    $('#tabmain').on('mouseout',tabIndex_mouseout);
    $('#tabmain').on('click',tabIndex_click);

    //添加关闭当前页面按钮事件和关闭所有页面按钮事件
//    $('#closeselected').on('click',close_selected);

    
    /* Notifications, demo purpose */
//    setTimeout(function() {
//        if (!$('#quickview-sidebar').hasClass('open') && !$('.page-content').hasClass('page-builder') && !$('.morphsearch').hasClass('open')) generateNotifDashboard(notifContent);
//    }, 3000);



    /* Progress Bar  Widget */
    if ($('.widget-progress-bar').length) {
        $(window).load(function() {
            setTimeout(function() {
                $('.widget-progress-bar .stat1').progressbar();
            }, 900);
            setTimeout(function() {
                $('.widget-progress-bar .stat2').progressbar();
            }, 1200);
            setTimeout(function() {
                $('.widget-progress-bar .stat3').progressbar();
            }, 1500);
            setTimeout(function() {
                $('.widget-progress-bar .stat4').progressbar();
            }, 1800);
        });
    };
});

PMFrame = {
		init:function(){
			//tab current win
//			$("#tabhead #closewin").click(function(){
//				$("#tabhead .active .tabclose").click();
//			});	
//			//tab close all
//			$("#tabhead #closeall").click(function(){
//				$("#tabhead .tabclose").click();
//			});	
			

		    $('#tabcloseall').on('click',close_all);
			
			$(window).resize(function() {
				PMFrame.resize();
					});
		},
		openTab : function(title, url, icon,isnew) {
			
			if($('#tabhead').children().length>=22){
				
			   $.msgbox("最多打开20个窗口，请关闭部分窗口！", {
				   type : "confirm",
					buttons : [{
								type : "submit",
								value : "确定"
							}]
				});
				return;
			}			
					
			if (url == '' || url == '#') {
				return;
			}
			if(isnew){
				url=url+(url.indexOf("?")>-1?'&':'?')+'tm='+ (new Date).getTime();
			}
			
			
			
			var mid = $.md5(url);
			
			/**如果页面已打开*/
//			if ($('#i' + mid).length != 0) {
//				$('#i' + mid).tab('show');
//				return;
//			}

			/*将当前显示页面移动到页面缓存中*/
			var pageFrame = $('.showPage');
			pageFrame.addClass('hiddenPage');
			pageFrame.removeClass('showPage');
			/*去除显示颜色*/
			$('.bg-blue').addClass('bg-light');
			$('.bg-blue').removeClass('bg-blue');
			
			
			//如果是主页
			if(icon=='icon-home'){
				$('#imain').removeClass('hiddenPage');
				$('#imain').addClass('showPage');
				
				$('#tabmain').addClass('bg-blue');
				$('#tabmain').removeClass('bg-light'); 
				return;
			}
			
			/**如果页面已打开*/
			if($('#i'+mid).length>0){
				$('#i' + mid).removeClass('hiddenPage');
				$('#i' + mid).addClass('showPage');
//				$('#i' + mid).prependTo('#iframeRam');

				$('#tab' + mid).addClass('bg-blue');
				$('#tab' + mid).removeClass('bg-light'); 
				return;
			}
			
			//添加图形标签
//			if (icon) {
//				title = '<img src="' + icon + '"/>' + title;
//			}closeall
			
			
			/**tab中添加此页面*/
			$('<li id="li'+mid +'" class="m-2 tabheadli"><div id="tab'+mid+'" class="index-tab bg-blue p-r-10 p-l-10">'+title+'&nbsp;&nbsp;<a id="a'+mid+'" class="tabclose"  href="javascript:void(0)">x</a></div></li>').insertBefore('#licloseall');			
			$('#supplies').append('<div class="showPage" id="i'+mid+'" style="width: 100%;" ><iframe id="if-'+mid+'" src="'+url+'" frameborder=0 style="width:100%;overflow-x:hidden;" scrolling="yes" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div>');

			 /*标签效果*/
		    $('#tab'+mid).on('mouseover',tabIndex_mouseover);
		    $('#tab'+mid).on('mouseout',tabIndex_mouseout);
		    $('#tab'+mid).on('click',tabIndex_click);

		    
		    //标签关闭按钮事件
		    $('#a'+mid).on('click',close_tab);
		    
			/*显示当前tab*/
//			this.renderTabList();
//			$('#li' + mid + ' a').tab('show');
//			$('#li' + mid + ' .tabclose').on('click', function(event) {
//						$("#li" + mid).prev().find('a').tab('show');
//						$("#li" + mid).remove();
//						$("#tab" + mid).remove();
//						PMFrame.renderTabList();
//					});
//			
//			
			this.resize();
		},

		resize : function() {

			$(".showPage").height($(window).height()-$(".topbar").height());
			
			$(".showPage >iframe").height($(window).height()-$(".topbar").height());
		},
		changesite : function(siteid) {

			$.ajax({
						type : "POST",
						url : "../../user/setusersite.action",
						data : {
							siteid : siteid
						},
						success : function(msg) {
							location.href = 'dashboard.jsp?tm='
									+ (new Date).getTime();
						},
						error:function(){
							location.href = 'dashboard.jsp?tm='
									+ (new Date).getTime();
						}
					});

		}
//		,renderTabList:function(){
//
//			$("#tabhead li .win").remove();
//			 
//				
//			$("#tabhead >li:not(.dropdown)").each(function(i){
//			 
//				$('<li class="win" ><a href="javascript:$(\'#'+this.id+' a\').tab(\'show\')">'+$(this).find('a').text().replace('x','')+'</li></a>').insertBefore("#tabhead li .divider");
//				
//				   
//			 });
//			
//		}
	};


function supplies()
{
	
	$.ajaxSetup ({
		cache: false //关闭AJAX相应的缓存
		});
	var s="../supplies/suppliesList.jsp";
	$("#supplies").load(s);

}


function generateNotifDashboard(content) {
    var position = 'topRight';
    if ($('body').hasClass('rtl')) position = 'topLeft';
    var n = noty({
        text: content,
        type: 'success',
        layout: position,
        theme: 'made',
        animation: {
            open: 'animated bounceIn',
            close: 'animated bounceOut'
        },
        timeout: 4500,
        callback: {
            onShow: function() {
                $('#noty_topRight_layout_container, .noty_container_type_success').css('width', 350).css('bottom', 10);
            },
            onCloseClick: function() {
                setTimeout(function() {
                    $('#quickview-sidebar').addClass('open');
                }, 500);
            }
        }
    });
}

function tabIndex_mouseover(event){
	    	$(event.currentTarget).addClass('bg-aero');
	    	$(event.currentTarget).removeClass('bg-light');
}

function tabIndex_mouseout(event){
	    	$(event.currentTarget).addClass('bg-light');
	    	$(event.currentTarget).removeClass('bg-aero');
}

function tabIndex_click(event){
		/*隐藏当前页面*/
		$('.showPage').addClass('hiddenPage');
		$('.showPage').removeClass('showPage');
		var id = $(event.currentTarget).attr('id').replace("tab","i");
		/*显示选中页面*/
		$('#'+id).removeClass('hiddenPage');
		$('#'+id).addClass('showPage');
		/*标签颜色改变*/
		tabSelected($(event.currentTarget).attr('id'));
}

function tabSelected(id){
	$('.bg-blue').addClass('bg-light');
	$('.bg-blue').removeClass('bg-blue');
	
	$('#'+id).addClass('bg-blue');
	$('#'+id).removeClass('bg-light');
}

function close_tab(event){
	//获取关闭窗口ID
	var id = $(event.currentTarget).attr('id').replace("a","");

	//获取当前显示窗口的id
	var selectedID = $('.bg-blue').attr('id').replace("tab","");
	
	//删除li
	$('#li'+id).remove();
	//删除页面
	$('#i'+id).remove();
	
	
	//如果当前显示页面为被关闭页面
	if(selectedID == id){
		//显示主页
		tabSelected('tabmain');
		$('#ifullmap').removeClass('hiddenPage');
		$('#ifullmap').addClass('showPage');
	}
	
}

function close_selected(event){
	//获取当前显示窗口的id
	var selectedID = $('.bg-blue').attr('id').replace("tab","");
	if(selectedID=='fullmap'){
		return;
	}
	//删除li
	$('#li'+selectedID).remove();
	//删除页面
	$('#i'+selectedID).remove();
	//显示主页
	tabSelected('tabmain');
	$('#ifullmap').removeClass('hiddenPage');
	$('#ifullmap').addClass('showPage');
}

function close_all(event){
	var idArr = [];
	for(var i=0;i<$('#tabhead').children().length;i++){
		if(i!=0&&i!=$('#tabhead').children().length-1){
			var id = $('#tabhead').children().eq(i).attr('id').replace('li','');
			idArr.push(id);
			
		}
	}
	
	for(var i = 0;i<idArr.length;i++){
		//删除li
		$('#li'+idArr[i]).remove();
		//删除页面
		$('#i'+idArr[i]).remove();
	}
	


	//显示主页
	tabSelected('tabmain');
	$('#imain').removeClass('hiddenPage');
	$('#imain').addClass('showPage');
}

function logout(){
	$.ajax({
		url : getRootPath()+'/user/logout.action',
		success : function(msg) {
			window.location.href = getRootPath()+'/ecmes/login/login.jsp';
		}
	});
}

//根据解析视图json文件
function createViewConfig(){
	var url = getRootPath()+"/user/getviewcofig.action";
	$.ajax({
		   type: "POST",
		   url:url,
		   contenttype :"application/x-www-form-urlencoded;charset=utf-8", 
		   success: function(data){
			   if(data!=null&&data!=""&&data!='null'){
				   var config = eval("("+data+")");
				   //菜单视图创建
				   var menuArr = config.menuConfig;
				   //如果有menuArr
				   if(menuArr!=null){
					   for(var i=0;i<menuArr.length;i++){
						   if(menuArr[i].id=='menu1'){
							   createMenu1(menuArr[i]);
						   }else if(menuArr[i].id=='menu2'){
							   createMenu2(menuArr[i]);
						   }
					   }
				   }
				   //基础视图创建
				   var baseConfig = config.baseConfig;
				   createBase(baseConfig);
				
			   }else{
				   createBase(null);
				   addURLEvent();
			   }
		   }
	}); 
}

//创建菜单1
function createMenu1(data){ 
	 var menuArr = data.children;
	 if(menuArr!=null&menuArr.length>0){
		 $("#usermenu").empty();
		 for(var i=0;i<menuArr.length;i++){
			 var menu = menuArr[i];
			 if(menu.func==null||menu.func==""){
				 if(menu.children!=null&&menu.children.length>0){
					 $("#usermenu").append("<li class='dropdown-submenu'><a href='javascript:void(0)'>"+menu.name+"</a><ul class='dropdown-menu' style='display: none;'  id='ul"+menu.id+"'></ul></li>");
					 var menuChildren = menu.children;
					 for(var j =0;j<menuChildren.length;j++){
						   var menuChild = menuChildren[j];
						   if(menuChild.param!=null&&menuChild.param!=""){
							   url = menuChild.func+"?"+menuChild.param;
						   }else{
							   url = menuChild.func;
						   }
						   $('#ul'+menu.id).append("<li><a href='javascript:void(0)' url='"+url+"'>"+menuChild.name+"</a></li>");
					 }
					 //添加显示事件
					 $(".dropdown-submenu").mouseover(function(event){
						 $(this).children("ul.dropdown-menu").attr('style','');
					 });
					//添加显示事件
					 $(".dropdown-submenu").mouseout(function(event){
						 $(this).children("ul.dropdown-menu").attr('style','display: none;');
					 });
				 }else{
					 $("#usermenu").append("<li><a href='javascript:void(0)'>"+menu.name+"</a></li>");
				 }
			}else{
				 if(menu.param!=null&&menu.param!=""){
					   url = menu.func+"?"+menu.param;
				   }else{
					   url = menu.func;
				   }
				 $("#usermenu").append("<li><a href='javascript:void(0)' url='"+url+"'>"+menu.name+"</a></li>");
			 }
		 }
		 //添加菜单点击事件
		 addURLEvent();
	 }
	 
}
/**
 * 待定*/
//创建菜单2
function createMenu2(data){
   var menuArr = data.children;
   $(".nav-sidebar").empty();
   $(".nav-sidebar").append("<li class='nav-active active'><a url='dashboard.html' icon='icon-home' href='javascript:void(0)'><i class='icon-home'></i><span data-translate='dashboard'>首页</span></a></li>");
   for(var i=0;i<menuArr.length;i++){
	   var menu = menuArr[i];
	   $(".nav-sidebar").append("<li class='nav-parent' id='li"+menu.id+"'><a href=''><i class='"+menu.funcIcon+"'></i><span data-translate='"+menu.id+"'>"+menu.name+"</span><span class='fa arrow'></span></a></li>");
	   if(menu.children&&menu.children.length>0){
		   $("#li"+menu.id).append("<ul class='children collapse' id='ul"+menu.id+"'></ul>");
		   var menuChildren = menu.children;
		   for(var j =0;j<menuChildren.length;j++){
			   var menuChild = menuChildren[j];
			   if(menuChild.param!=null&&menuChild.param!=""){
				   url = menuChild.func+"?"+menuChild.param;
			   }else{
				   url = menuChild.func;
			   } 
			   $("#ul"+menu.id).append("<li><a url='"+url+"' href='javascript:void(0)'  data-translate='"+menuChild.id+"'>"+menuChild.name+"</a></li>");
		   }
	   }
	   //注册左侧菜单收缩后的事件
	   var hoverTimeout;
	   $('.nav-sidebar > li').hover(function() {
	       clearTimeout(hoverTimeout);
	       $(this).siblings().removeClass('nav-hover');
	       $(this).addClass('nav-hover');
	   }, function() {
	       var $self = $(this);
	       hoverTimeout = setTimeout(function() {
	           $self.removeClass('nav-hover');
	       }, 200);
	   });
	   $('.nav-sidebar > li .children').hover(function() {
	       clearTimeout(hoverTimeout);
	       $(this).closest('.nav-parent').siblings().removeClass('nav-hover');
	       $(this).closest('.nav-parent').addClass('nav-hover');
	   }, function() {
	       var $self = $(this);
	       hoverTimeout = setTimeout(function() {
	           $(this).closest('.nav-parent').removeClass('nav-hover');
	       }, 200);
	   });
	   
   }
   //添加菜单点击事件
   addURLEvent();
	   
}
/**
 * 待定*/
function createBase(data){
	if(data!=""&&data!=null){
		var isAlarm = data.isAlarm!=null?data.isAlarm:'0';
		//是否报警0不报警；1报警
		hideAlarm(isAlarm);
		
		var isMessage = data.isMessage!=null?data.isMessage:'0';
		//是否提示消息0不显示；1显示
		hideMessage(isMessage);
		
		//是否显示左侧菜单0不显示 1显示
		var leftbarhide = data.leftbarhide!=null?data.leftbarhide:'1';

		hideMenu(leftbarhide);
		
		//是否显示左侧菜单0不显示 1显示
		var topbarhide = data.topbarhide!=null?data.topbarhide:'1';

		hideTopMenu(topbarhide);
		
	}else{
		//是否报警0不报警；1报警
		hideAlarm('1');
		
		//是否提示消息0不显示；1显示
		hideMessage('1');
		
		//是否隐藏左侧菜单0隐藏 1不隐藏

		hideMenu('1');
		
		//是否隐藏左侧菜单0隐藏 1不隐藏

		hideTopMenu('1');
	}
	
}

//显示或隐藏警告按钮是否报警0不报警；1报警
function hideAlarm(flag){
	if(flag=='0'){
		$(".alarmLi").css('display','none');
	}
	
}
//显示或隐藏消息按钮是否报警0隐藏；1显示
function hideMessage(flag){
	if(flag=='0'){
		$(".messageLi").css('display','none');
	}
	
}
//显示或隐藏左侧菜单栏flag=0隐藏，flag=1显示
function hideMenu(flag){
     if(flag=='0') {
    	 collapsedSidebar();
     } 
}
//显示或隐藏上侧菜单栏flag=0隐藏，flag=1显示
function hideTopMenu(flag){
     if(flag=='0') {
    	  $('#usermenuli').css('display','none');
     } 
}
//判断图片是否存在
var hasImage = function(imgUrl) {
    var flag = false;
 
    $.ajax({
	    url: imgUrl,
	    type:"GET",
	    async:false,
	    success:function(){flag = true;}
    });
     
    return flag;
};

/**
 * 跳转页面  zhou
 * @param mid md5加密id
 * @param type 类型   1表示事件结束跳转历史页面 2跳转演练管理页面
 */
function openJsp(mid, type, con){
	if(type == "1"){
		
		openHistoryJsp(mid, con);
	}
	if(type == "2"){
		openSchedule(mid,con);
	}
};

//跳转历史页面
function openHistoryJsp(mid, eventId){
	//删除li
	$('#li' + mid).remove();
	//删除页面
	$('#i' + mid).remove();
	//跳转历史页面
	var url= "../../plantevent/getbyplaneventid.action";
	$.ajax({
		type : "post",
		dataType : 'json',
		url : url,
		data : {
			"id" : eventId
		},
		success : function(data) {
			var datas = data.data;
			var workflowinstid = datas.workflowinstid;
			var workflowid = datas.workflowid;
			var planid = datas.planid;
			var eventnames = datas.eventname;
			PM.openTab(eventnames,"../planhist/historyplan.jsp?eventid=" + eventId+"&planid="+planid+"&workflowinstid="+workflowinstid+"&workflowid="+workflowid);
		},error : function(data){
		}
	});
}
//跳转演练管理页面
function openSchedule(mid, scheduleMid){
	//删除li
	$('#li' + mid).remove();
	//删除页面
	$('#i' + mid).remove();
	
	if(scheduleMid != null || scheduleMid!=""){
		$('#i' + scheduleMid).attr("class","showPage");
		var schedule_mid = "if-" + scheduleMid;
		 document.getElementById(schedule_mid).contentWindow.refresh_schedule();
	}else{
		PM.openTab("演练管理","../schedule/scheduleList.jsp");
	}
	
}

//菜单事件添加
function addURLEvent(){
	  $('[url]').on('click',function(event){
			var title=$(event.currentTarget).text();
			console.log(title);
			if($(event.currentTarget).attr('id')=='alarmStatistics_a'){
				title='报警信息查询';
			}else if($(event.currentTarget).attr('id')=='eventStatistics_a'){
				title='事件信息查询';
			}
			var url=$(event.currentTarget).attr('url');
			var func=$(event.currentTarget).attr('func');
			var icon = $(event.currentTarget).attr('icon');
			var isnew = $(event.currentTarget).attr('isnew');

			isnew=(isnew!=undefined)&&(isnew.toLowerCase()=='true');
			//拼接项目地址
			// url = getRootPath()+url;
			if (func != null && func.length > 0) {
				eval(func);
				
			} else {
				PMFrame.openTab(title, url,icon,isnew);

			}
			
	});
}

/**
 * 判断是否登录
 * */
function  isLogin(){
	var flag = false;
	//login info
	$.getJSON(getRootPath()+'/user/loginuser.action?time='+new Date().getTime(), function(data) {

		try {
			if(data==null){
			    $.msgbox("用户登录已超时，请重新登录！", {
				   type : "confirm",
					buttons : [{
								type : "submit",
								value : "确定"
							}]
				});
				window.location.href=getRootPath()+"/ecmes/login/login.jsp";
			}else{
				var iconurl = getRootPath()+data.icon;
				//照片添加
				if(hasImage(iconurl)){
					$('#usericon').attr("src",iconurl);
				}
				//姓名添加
				$('#loginuser').html("您好, "+data.realName);
				//创建页面视图
				createViewConfig();
				flag=true;
			}
		} catch (e) {
			logout();
		}

	});
	
	return flag;
}
/** 
 * 获取项目路径
 * http://localhost:8083/proj 
 */  
function getRootPath(){  
    //获取当前网址，如： http://localhost:8083/proj/meun.jsp  
    var curWwwPath = window.document.location.href;  
    //获取主机地址之后的目录，如： proj/meun.jsp  
    var pathName = window.document.location.pathname;  
    var pos = curWwwPath.indexOf(pathName);  
    //获取主机地址，如： http://localhost:8083  
    var localhostPath = curWwwPath.substring(0, pos);  
    //获取带"/"的项目名，如：/proj  
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/')+1);  
    return(localhostPath + projectName);  
} 