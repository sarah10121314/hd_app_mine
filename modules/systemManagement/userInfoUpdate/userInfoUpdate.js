var birthDate = new Date();
$("#dateBirth").val(moment(birthDate).format("YYYY/MM/DD"));

var userId = $("#userId").val();
$.nameSpace("user.updateUser");

$(function()
{
	timeconfig();
	//初始化用户信息不能编辑
	userInfoUnEdit();
});

//检查用户名
function checkUserNameRepeat(userId, userName, obj) {
	$.ajax({
		type: 'post',
		url: basePath + 'uv/user/checkUserName.action',
		data: {
			userId: userId,
			userName: userName
		},
		dataType: "json",
		success: function(result) {
			if(result) {
				feedBackError(obj);
				$("#loginName").text("存在重复用户名");
			} else {
				feedBackSuccess(obj);
				$("#loginName").text("");
			}
		}
	});
}

function showps() {
	document.getElementById("box").innerHTML = "<input type=\"text\" name=\"password\" style=\"border:none; width:90%\" id=\"passWord\" value=\"" + $("#passWord").val() + "\"></input>" +
		"<i onclick=\"hideps()\" class=\"glyphicon glyphicon-eye-close pull-right\"></i>";
}

function hideps() {
	document.getElementById("box").innerHTML = "<input type=\"password\" name=\"password\" style=\"border:none; width:90%\" id=\"passWord\" value=\"" + $("#passWord").val() + "\"></input>" +
		"<i onclick=\"showps()\" class=\"glyphicon glyphicon-eye-open pull-right\"></i>";
}

//反馈异常
function feedBackError(obj) {
	//清除成功样式
	$(obj).next("span").removeClass("glyphicon glyphicon-ok");
	$(obj).parent().removeClass("has-success");

	//添加异常样式
	$(obj).next("span").addClass("glyphicon glyphicon-remove");
	$(obj).parent().addClass("has-error");
}

//反馈成功
function feedBackSuccess(obj) {
	//添加异常样式
	$(obj).next("span").removeClass("glyphicon glyphicon-remove");
	$(obj).parent().removeClass("has-error");

	//清除成功样式
	$(obj).next("span").addClass("glyphicon glyphicon-ok");
	$(obj).parent().addClass("has-success");
}

function checkPwd(obj) {
	var pwd = /^[a-zA-Z0-9_]{6,10}$/;
	var passWord = $(obj).val();
	if(passWord != "" && pwd.test(passWord)) {
		feedBackSuccess(obj);
		$("#pwdName").text("");
		return true;
	} else {
		$("#pwdName").text("密码不能为空且密码为6到10位");
		feedBackError(obj);
		return false;
	}
};

function makeSurePwd(obj) {
	if(!checkPwd($("#passWord"))) {
		return false;
	}
	if($("#passWord").val() == $("#passWord2").val()) {
		feedBackSuccess(obj);
		$("#pwdName2").text("");
		return true;
	} else {
		$("#pwdName2").text("两次密码不一致");
		feedBackError(obj);
		return false;
	}
};

function checkUserName(obj) {
	var userName_check = /^[a-zA-z][a-zA-Z0-9_]{3,11}$/;
	var userName = $(obj).val();
	if(!userName_check.test(userName)) {
		feedBackError(obj);
		$("#loginName").text("用户名只能由4到12位数字字母下划线组成，且字母开头！");
		return false;
	} else {
		$("#loginName").text("");
		feedBackSuccess(obj);
		return true;
	}
}

function checkEmployee(obj) {

	var userNumd_check = /^\d{1,6}$/;
	var userNum = $(obj).val();
	if(userNum != "" && !userNumd_check.test(userNum)) {
		feedBackError(obj);
		$("#employeeNum").text("用户编号为1到6位数字！1-999999");
		return false;
	} else {

		$("#employeeNum").text("");
		feedBackSuccess(obj);
		return true;
	}
}

function checkMobile(obj) {
	var mobile = $(obj).val();
	var mobile_check = /^[1][0-9][0-9]{9}$/;
	if(mobile != "" && !mobile_check.test(mobile)) {
		feedBackError(obj);
		$("#mobileName").text("手机号码不符合规则!");
		return false;
	} else {
		$("#mobileName").text("");
		feedBackSuccess(obj);
		return true;
	}
}

function checkPhone(obj) {
	var phone = $(obj).val();
	var phone_check = /\d{3}-\d{8}|\d{4}-\d{7}/;
	if(phone != "" && !phone_check.test(phone)) {
		feedBackError(obj);
		$("#phoneName").text("电话号码不符合规则！参考格式：025-12345678或0512-1234567");
		return false;
	} else {
		$("#phoneName").text("");
		feedBackSuccess(obj);
		return true;
	}

}

function checkLogName(obj) {
	var logName = $(obj).val();

	if(logName != "") {
		$("#log").text("");
		feedBackSuccess(obj);
		return true;
	} else {
		$("#log").text("登录名称不能为空！");
		feedBackError(obj);
		return false;
	}
}

function checkNickName(obj) {
	var nickName = $(obj).val();

	if(nickName != "") {
		$("#nick").text("");
		feedBackSuccess(obj);
		return true;
	} else {
		$("#nick").text("昵称不能为空！");
		feedBackError(obj);
		return false;
	}
}

function checkRealName(obj) {
	var realName = $(obj).val();

	if(realName != "") {
		$("#real").text("");
		feedBackSuccess(obj);
		return true;
	} else {
		$("#real").text("真实姓名不能为空！");
		feedBackError(obj);
		return false;
	}
}

function checkEmail(obj) {
	var email = $(obj).val();
	var email_check = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(email != "" && !email_check.test(email)) {
		$("#emailName").text("邮箱不符合规则!");
		feedBackError(obj);

		return false;
	} else {
		$("#emailName").text("");
		feedBackSuccess(obj);
		return true;
	}
}

//检查用户名
function checkUserNameRepeat(userId, userName, obj) {
	$.ajax({
		type: 'post',
		url: basePath + 'uv/user/checkusername.action',
		data: {
			userId: userId,
			userName: userName
		},
		async: false,
		dataType: "json",
		success: function(result) {
			if(result) {
				feedBackError(obj);
				$("#loginName").text("存在重复用户名");
			} else {
				feedBackSuccess(obj);
				$("#loginName").text("");
			}
		}
	});
}

//检查用户编号
function checkUserNumRepeat(userId, userNum, obj) {
	$.ajax({
		type: 'post',
		url: basePath + 'uv/user/checkusernum.action',
		data: {
			userId: userId,
			userNum: userNum
		},
		async: false,
		dataType: "json",
		success: function(result) {
			if(result) {
				feedBackError(obj);
				$("#employeeNum").text("存在重复编号");
			} else {
				feedBackSuccess(obj);
				$("#employeeNum").text("");
			}
		}
	});
}

//保存用户
function saveUser() {
	checkUserNameRepeat($("#userId").val(), $("#userName").val(), $("#userName"));
	checkUserNumRepeat($("#userId").val(), $("#userNum").val(), $("#userNum"));

	//		if ($("#employeeNum").text() != "" || $("#loginName").text() != "") {
	//			alert("请检查填写内容");
	//			return;
	//		}

	var checkResult = [
		checkPwd($("#passWord")),
		makeSurePwd($("#passWord2")),
		checkEmployee($("#userNum")),
		checkMobile($("#mobile")),
		checkPhone($("#phone")),
		checkEmail($("#email"))
	];
	var checkResult = true;
	$.each(checkResult, function(index, item) {
		if(!item) {
			checkResult = false;
		}
	});

	if(!checkResult) {
		layer.msg("请检查填写内容！", {
			time: 1500,
		});
		return;
	}

	if($("#userId").val()) {
		id = $("#userId").val();
	}
	$.ajax({
		type: 'post',
		url: basePath + 'uv/user/saveuser.action',
		dataType: "json",
		data: {
			id: id,
			resId: $("#resid").val(),
			userNum: $("#userNum").val(),
			name: $("#userName").val(),
			passWord: $("#passWord").val(),
			realName: $("#realName").val(),
			sex: $("#sex").val(),
			mobile: $("#mobile").val(),
			phone: $("#phone").val(),
			email: $("#email").val(),
			res1: $("#userRes").val(),
			resValue: $("#source").val(),
			res2: $("#userType").val(),
			deptId: $("#deptId").val(),
			positionId: $("#positionId").val(),
			professionalId: $("#professionalId").val(),
			signature: $("#signature").val(),
			icon: $("#icon").val()
		},
		success: function(data) {
			//alert(data.msg);
			if(data.msg == "success") {
				layer.msg("保存成功！", {
					time: 1500,
				});
				window.location.href = basePath + "uv/userinfo/userInfo.jsp";
			} else if(data.msg == "userNameRepeat") {
				layer.msg("用户名已存在！", {
					time: 1500,
				});
			} else if(data.msg == "userNumRepeat") {
				layer.msg("用户编号已存在！", {
					time: 1500,
				});
			} else {
				layer.msg("保存失败！", {
					time: 1500,
				});
			}
		}
	});
}

function timeconfig() {
	$('#dateBirth').datepicker({
		dateFormat: "yy/mm/dd"
	});
}

/**
 * 保存用户信息
 * @returns {Boolean}
 */
function saveUserInfo() {
//	/**
//	 * 验证方法
//	 */
//	var logName = $("#logName").val().replace(/(^\s*)|(\s*$)/g, ""); // 登录名不允许为空
//	if(logName == null || logName == "") {
//		layer.msg('登录名不允许为空!', {
//			//十秒自动关闭
//			time: 1500
//		});
//		$("#logName").focus();
//		return false;
//	}
	userInfoUnEdit();
	$("#userInfoUpd").show();
	$("#userInfoSave").hide();
}

//修改按钮  点击事件
function updateUserInfo() {
	userInfoEdit();
	$("#userInfoUpd").hide();
	$("#userInfoSave").show();
}

function userInfoUnEdit() {
	$("#logName").attr("readonly","readonly");
	$("#nickName").attr("readonly","readonly");
	$("#realName").attr("readonly","readonly");
	$("#userSex").attr("readonly","readonly");
	$("#dateBirth").attr("readonly","readonly");
	$("#mobile").attr("readonly","readonly");
	$("#email").attr("readonly","readonly");
}

function userInfoEdit() {
	$("#logName").removeAttr("readonly");
	$("#nickName").removeAttr("readonly");
	$("#realName").removeAttr("readonly");
	$("#userSex").removeAttr("readonly");
	$("#dateBirth").removeAttr("readonly");
	$("#mobile").removeAttr("readonly");
	$("#email").removeAttr("readonly");
}