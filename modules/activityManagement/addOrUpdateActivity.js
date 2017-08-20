/**
 * 新增活动
 * 
 * @author LIJIAYIN
 * @version 1.1
 */

$(function() {
//  chooseTime();
  $(".chooseTime").datetimepicker();
});
//

//function chooseTime(){
//	$('#timeStart,#timeEnd').datetimepicker({
//		
//		timeFormat:"HH:mm:ss",
//		dateFormat:"yy/mm/dd"
//		
//	});
//}

/**
   * 新增活动信息
   * 
 * @returns {Boolean}
   */
//function updateUserInfoById(){
//	var company = $("#company").val().replace(/(^\s*)|(\s*$)/g, "");
//	var outreachsite=$("#outreachsite").val();
//	var lttd=$("#lttd").val();
//	var lgtd=$("#lgtd").val();
//	if(isNaN(lgtd)){
//		layer.msg('经度请输入正确格式', {
//			time: 2500 //20s后自动关闭
//		});
//		$("#lgtd").focus();
//		return;
//	}
//	if(isNaN(lttd)){
//		layer.msg('纬度请输入正确格式', {
//			time: 2500 //20s后自动关闭
//		});
//		$("#lttd").focus();
//		return;
//	}
//	
//	if (company == null || company == "") {
//		layer.msg('单位名称不允许为空', {
//			time: 2500 //20s后自动关闭
//		});
//		$("#company").focus();
//		return;
//	}if (company.length > 99) {
//		layer.msg('单位名称字符过长,请重新输入!', {
//			time: 2500 //20s后自动关闭
//		});
//		$("#company").focus();
//		return;
//	}
//	var dutytel=$("#dutytel").val();
//	var patrn = /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$|^((\+?86)|(\(\+86\)))?1\d{10}$|^\d{5}$|^\d{8}$/;
//	 if(!patrn.test(dutytel)){
//		 layer.msg('单位电话格式不正确,请输入十一位手机号或五位短号或八位座机号', {
//				time: 3000
//				});	
//		 return ;
//	    }
//	 
//	 var fax=$("#fax").val();
//		var fax_check = /^(\d{3,4}-)?\d{7,8}$/;
//		if(fax != "" && !fax_check.test(fax)){
//			 layer.msg('传真格式为:XXX-12345678或XXXX-1234567或XXXX-12345678', {
//					time: 3000
//					});	
//			
//			return ;
//		}
//	 var email=$("#email").val();
//		var email_check = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//		if(email != "" && !email_check.test(email)){
//			 layer.msg('邮箱不符合规则,请重新输入!', {
//					time: 3000
//					});	
//			
//			return ;
//		}
//	if (outreachsite==null || outreachsite == "") {
//		
//		layer.msg('请选择厂站', {
//			time: 2500 //20s后自动关闭
//			
//		});
//		return;
//	}else{
//		$.ajax({
//			type : "POST",
//			dataType : 'json',
//			data : {
//				"siteId" : $("#siteid").val(),
//				"name" : name
//			},
//			url : "../../outreach/isCheckName.action",
//			success : function(data) {
//				var vcompany = $("#vcompany").val().replace(/(^\s*)|(\s*$)/g, "");
//				if(name==vcompany && addOrUpdateState=="update"){
//					data=true;
//				}
//				if(data == false){
//					layer.msg('已存在该单位名称', {
//						time: 2500, //毫秒
//					});
//				}
//				if(data==true){
//					$("#PubToForm").attr("action","../../outreach/addorupdateoutreach.action");
//					// 提交表单
//					$('#PubToForm').ajaxForm({
//								success : function(data) {
//									$('#leftmodel').modal('hide');
//									var left_Table = $('#leftTable').dataTable().api();
//									left_Table.ajax.url(refresh).load(null, false);
//								},
//								error : function(data, e) {
//									layer.msg('信息录入失败,请重新检查', {
//										time: 1500, //毫秒
//									});
//									//$('#leftmodel').modal('hide');
//								}
//							});
//					$('#PubToForm').submit();
//				}
//			}
//		});
//	}
//}
