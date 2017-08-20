$(function() {

   

    var minBulletSize = 3;
    var maxBulletSize = 70;
    var min = Infinity;
    var max = -Infinity;

    PMFrame.init();
    PMFrame.resize();
	PMFrame.renderTabList();
	
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



   

    /* Notifications, demo purpose */
    notifContent = '<div class="alert alert-dark media fade in bd-0" id="message-alert"><div class="media-left"><img src="../assets/images/profil_page/friend8.jpg" class="dis-block img-circle"></div><div class="media-body width-100p"><h4 class="alert-title f-14">New message received</h4><p class="f-12 alert-message pull-left">John send you a message 2 hours ago.</p><p class="pull-right"><a href="#" class="f-12">Read message</a></p></div></div>';
    setTimeout(function() {
        if (!$('#quickview-sidebar').hasClass('open') && !$('.page-content').hasClass('page-builder') && !$('.morphsearch').hasClass('open')) generateNotifDashboard(notifContent);
    }, 3000);



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
			$("#tabhead #closewin").click(function(){
				$("#tabhead .active .tabclose").click();
			});	
			//tab close all
			$("#tabhead #closeall").click(function(){
				$("#tabhead .tabclose").click();
			});	
			
			$(window).resize(function() {
				PMFrame.resize();
			});
		},
		openTab : function(title, url, icon,isnew) {
			if (url == '' || url == '#') {
				return;
			}
			if(isnew){
				url=url+(url.indexOf("?")>-1?'&':'?')+'tm='+ (new Date).getTime();
			}
			
			var mid = $.md5(url);

			if ($('#li' + mid + ' a').length != 0) {
				$('#li' + mid + ' a').tab('show');
				return;
			}
			
			

			if (icon) {
				title = '<img src="' + icon + '"/>' + title;
			}
			$('<li id="li'+mid +'"><a  href="#tab'+mid+'" data-toggle="tab" url="" >'+title+' <i class="tabclose" title="关闭" tip="关闭">x</i></a> </li>').insertBefore('#tabhead .dropdown');
			$('#tabcontent').append('<div class="tab-pane" id="tab'+mid+'"><iframe id="i'+mid+'" name="i'+mid+'" src="'+url+'" frameborder=0 style="height:100%;width:100%;overflow-x:hidden;" scrolling="yes"></iframe></div>');



			this.renderTabList();
			$('#li' + mid + ' a').tab('show');
			
			
			
			$('#li' + mid + ' .tabclose').on('click', function(event) {
						$("#li" + mid).prev().find('a').tab('show');
						$("#li" + mid).remove();
						$("#tab" + mid).remove();
						PMFrame.renderTabList();
					});
			this.resize();
		},

		resize : function() {

			$("#pageFrame").height($(window).height()-$(".topbar").height());
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

		},
		renderTabList:function(){

			$("#tabhead li .win").remove();
			 
				
			$("#tabhead >li:not(.dropdown)").each(function(i){
			 
				$('<li class="win" ><a href="javascript:$(\'#'+this.id+' a\').tab(\'show\')">'+$(this).find('a').text().replace('x','')+'</li></a>').insertBefore("#tabhead li .divider");
				
				   
			 });
			
		}
	};

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
                }, 500)
            }
        }
    });
}