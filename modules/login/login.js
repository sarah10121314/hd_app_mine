$(function() {

    if($('body').data('page') == 'login'){

        /* Show / Hide Password Recover Form */
        $('#password').on('click', function(e) {
            e.preventDefault();
            $('.form-signin').slideUp(300, function() {
                $('.form-password').slideDown(300);
            });
        });
        $('#login').on('click', function(e) {
            e.preventDefault();
            $('.form-password').slideUp(300, function() {
                $('.form-signin').slideDown(300);
            });
        });
        $('#submit-form, #submit-password').click(function(e) {
        	window.location.href = '../../../modules/index/dashboard.html';
            e.preventDefault();
           
            if($("#user_name").val()==""){
            	layer.msg("用户名不能为空", {
            			time: 1500//1.5秒自动关闭
      				});
            }else if($("#user_password").val()==""){
            	layer.msg("密码不能为空", {
        			time: 1500//1.5秒自动关闭
  				});
            }else{
                loginFun(this);
            }
          
        });
     
        
        $.backstretch([getRootPath()+"/ecmes/assets/images/gallery/login.jpg"], {
            fade: 600,
            duration: 4000
        });


       

    }
    if($('body').data('page')== 'signup'){

        var form = $(".form-signup");
        $.backstretch([getRootPath()+"//assets/images/gallery/login.jpg"],
        {
            fade: 600,
            duration: 4000
        });
        $("#account-builder").on('mouseenter', function() {
            TweenMax.to($(this), 0.35, {
                css: {
                    height: 130,
                    width: 500,
                    left: '37%',
                    'border-bottom-left-radius': 0,
                    'border-top-right-radius': 0,
                    '-moz-border-bottom-left-radius': 0,
                    '-moz-border-top-right-radius': 0,
                    '-webkit-border-bottom-left-radius': 0,
                    '-webkit-border-top-right-radius': 0
                },
                ease: Circ.easeInOut
            });
        });
        $("#account-builder").on('mouseleave', function() {
            TweenMax.to($(this), 0.35, {
                css: {
                    height: 44,
                    width: 250,
                    left: '44%',
                    'border-bottom-left-radius': 20,
                    'border-top-right-radius': 20
                },
                ease: Circ.easeInOut
            });
        });
        /* Hide / Show Social Connect */
        $('#social-cb').change(function() {
            if ($(this).is(":checked")) {
                $('.social-btn').slideDown(function() {
                    $('body').removeClass('no-social');
                });
            }
            else {
                $('.social-btn').slideUp(function() {
                    $('body').addClass('no-social');
                });
            }
        });
        /* Hide / Show Background Image */
        $('#image-cb').change(function() {
            if ($(this).is(":checked")) {
                $.backstretch([getRootPath()+"/ecmes/assets/images/gallery/login.jpg"], {
                    fade: 600,
                    duration: 4000
                });
                $('#slide-cb').attr('checked', false);
            }
            else $.backstretch("destroy");
        });
        /* Add / Remove Slide Image */
        $('#slide-cb').change(function() {
            if ($(this).is(":checked")) {
                $.backstretch([getRootPath()+"/ecmes/assets/images/gallery/login4.jpg", getRootPath()+"/ecmes/assets/images/gallery/login3.jpg", getRootPath()+"/ecmes/assets/images/gallery/login2.jpg", getRootPath()+"/ecmes/assets/images/gallery/login.jpg"], {
                    fade: 600,
                    duration: 4000
                });
                $('#image-cb').attr('checked', false);
            }
            else {
                $.backstretch("destroy");
            }
        });
        /* Hide / Show User Image */
        $('#user-cb').change(function() {
            if ($(this).is(":checked")) {
                TweenMax.to($('.user-img'), 0.3, {
                    opacity: 0,
                    ease: Circ.easeInOut
                });
            }
            else {
                TweenMax.to($('.user-img'), 0.3, {
                    opacity: 1,
                    ease: Circ.easeInOut
                });
            }
        });
        $('#submit-form').click(function(e) {
        	window.location.href = '../../../modules/index/dashboard.html';
//          form.validate({
//              rules: {
//                  firstname:
//                  {
//                      required: true,
//                      minlength: 3
//                  },
//                  lastname:
//                  {
//                      required: true,
//                      minlength: 4
//                  },
//                  email: {
//                      required: true,
//                      email: true
//                  },
//                  password: {
//                      required: true,
//                      minlength: 6,
//                      maxlength: 16
//                  },
//                  password2: {
//                      required: true,
//                      minlength: 6,
//                      maxlength: 16,
//                      equalTo: '#password'
//                  },
//                  terms: {
//                      required: true
//                  }
//              },
//              messages: {
//                  firstname: {
//                      required: 'Enter your first name',
//                      minlength: 'Enter at least 3 characters or more'
//                  },
//                  lastname: {
//                      required: 'Enter your last name',
//                      minlength: 'Enter at least 3 characters or more'
//                  },
//                  email: {
//                      required: 'Enter email address',
//                      email: 'Enter a valid email address'
//                  },
//                  password: {
//                      required: 'Write your password',
//                      minlength: 'Minimum 6 characters',
//                      maxlength: 'Maximum 16 characters'
//                  },
//                  password2: {
//                      required: 'Write your password',
//                      minlength: 'Minimum 6 characters',
//                      maxlength: 'Maximum 16 characters',
//                      equalTo: 'Password don\'t match'
//                  },
//                  terms: {
//                      required: 'You must agree with terms'
//                  }
//              },
//              errorPlacement: function(error, element) {
//                  if (element.is(":radio") || element.is(":checkbox")) {
//                      element.closest('.option-group').after(error);
//                  }
//                  else {
//                      error.insertAfter(element);
//                  }
//              }
//          });
//          e.preventDefault();
//          if (form.valid()) {
//              $(this).addClass('ladda-button');
//              var l = Ladda.create(this);
//              l.start();
//              setTimeout(function() {
//                  window.location.href = getRootPath()+'/ecmes/index/dashboard.html';
//              }, 2000);
//          }
//      });
//
    }
    
});

var loginFun = function(btn){

    var l = Ladda.create(btn);
    l.start();
	$.post(getRootPath()+'/user/login.action', {
		username : $('#user_name').val(),
		password : $('#user_password').val()
		},
	
		function(data) {
			l.stop();
			if (data.status=='y') {
				window.location.href = getRootPath()+'/ecmes/index/dashboard.html';
			} else {
				layer.msg(data.info, {
					
					time: 1500//1.5秒自动关闭
					});
			}
		}, 'json'

	);
};

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