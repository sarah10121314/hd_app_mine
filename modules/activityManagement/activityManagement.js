/**
 * 活动信息查询
 * 
 * @author LIJIAYIN
 * @version 1.1
 */
var activityTable;
var activityUrl = "activityManagement.json";
//var finddate = new Date();

//var addOrUpdateState;

$(function() {
//	$('#startTime').datetimepicker({
//	    format: 'yyyy-mm-dd hh:ii:ss',
//	    autoclose:true,
//	    startView:3,
//	    todayBtn: true,
//	    minView: "month",
//	    initialDate: new Date()
//	});
    chooseTime();
	// 加载表格
	createActivityTable();
	
//	$("#new").click(function() {
//		Addinit();
//	});
//	$("#userStatus").change(function(){
//	    createUserTable();
//	});
//	$("#forbiddenFunc").change(function(){
//		createUserTable();
//	});
//	$("#userLevel").change(function(){
//		createUserTable();
//	});
//	$("#btnSearchName").change(function(){
//		createUserTable();
//	});
});
//
//function chooseTime(){
//	$("#startTime").datetimepicker({
//      timeFormat:"HH:mm",
//		dateFormat:"yy/mm/dd",
//      minView:'hour',
//      language: 'zh-CN',
//      autoclose:true,
//      startDate:new Date()
//  }).on("click",function(){
//      $("#startTime").datetimepicker("setEndDate",$("#startTime").val())
//  });
//  $("#endTime").datetimepicker({
//      timeFormat:"HH:mm",
//		dateFormat:"yy/mm/dd",
//      minView:'month',
//      language: 'zh-CN',
////      autoclose:true,
//      viewSelect:'decade',
//      startDate:new Date()
//  }).on("click",function(){
//      $("#endTime").datetimepicker("setStartDate",$("#endTime".val()))
//  });
//
//}

function chooseTime(){
	$('#startTime,#endTime').datetimepicker({
		
		timeFormat:"HH:mm:ss",
		dateFormat:"yy/mm/dd"
		
	});

}
//function chooseStartTime(){
//	$('#startTime').datetimepicker({
//	    format: 'yyyy-mm-dd'
//	});
//}
/**
 * 创建表格
 * 
 * @param data
 * @returns
 */
function createActivityTable() {
	 activityTable=$('#activityTable')
	 .dataTables_userDef(
					{
						/*"ajax" : {
							"url" : activityUrl,
							"type" : "POST",
							"data": function (data) {    
								return $.extend( {}, data.data.list, {    
									"userStatus" : $("#userStatus").val(),
									"forbiddenFunc" : $("#forbiddenFunc").val(),
									"userLevel" : $("#userLevel").val(),
									"userName" : $("#btnSearchName").val()
								} );
							}
						},*/
						"ajax":activityUrl,
						"columns" : [
								{
									"title" : "序号",
									"data" : "activityOrder",
									"name" : "activityOrder",
									"visible" : true,
									"width": "80px",
									"orderable" : true,
								},
								{
									"title" : "活动标识",
									"data" : "activityIdentity",
									"name" : "activityIdentity",
									"visible" : true,
									"orderable" : true,
								},
								{
									"title" : "活动主题",
									"data" : "activityTitle",
									"name" : "activityTitle",
									"visible" : true,
									"orderable" : true,
								},
								{
									"title" : "活动开始时间",
									"data" : "startTime",
									"name" : "startTime",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "活动结束时间",
									"data" : "endTime",
									"name" : "endTime",
									"visible" : true,
									"orderable" : true
								},

								{
									"title" : "活动链接",
									"data" : "activityUrl",
									"name" : "activityUrl",
									"visible" : true,
									"orderable" : true,
									"render" : function(data, type, full, meta) {
										var operBtn = '<a title="活动链接" class=" " href="'+data+'">'+data+'</a>';
										return operBtn;
									}
								},
//								{
//									"title" : "活动图片",
//									"data" : "activityPic",
//									"name" : "activityPic",
//									"visible" : true,
//									"orderable" : true,
//									"render" : function(data, type, full, meta) {
//										var operBtn = '<img title="活动图片" class="" src="'+data+'"/>';
//										return operBtn;
//									}
//								},
								{
									"title" : "操作",
									"data" : "activityId",
									"visible" : true,
									"orderable" : false,
									"width": "200px",
									"render" : function(data, type, full, meta) {
										var operBtn = '<a title="修改" class="edit ac-updateBtn btn btn-sm btn-warning">修改</a>&nbsp;&nbsp;';
										operBtn += '<a title="删除" class="delete ac-deleteBtn btn btn-sm btn-danger"  onclick="deleteUserById(\''
												+ data+ '\');">删除</a>';
										operBtn += '<a title="查看" class="ac-queryBtn btn btn-sm btn-info">查看</a>';		
										return operBtn;
									}
								} 
						],
						"order" : [ [ 0, "desc" ] ]
					});
}
//onclick="updateUserInfoById(\''+ data+ '\');"
//onclick="queryUserDetailsById(\''+ data+ '\');"
//$(".editBtn").on
$('body').on('click', '.ac-updateBtn', function() {
	window.location.href="addOrupdateActivity.html";
});
$('body').on('click', '.ac-queryBtn', function() {
	window.location.href="queryActivityDetail.html";
});

//删除弹出框
$('body').on('click', '.ac-deleteBtn', function() {
	layer.confirm('确定要删除该活动吗？')
//	{
//	//默认  确定取消
//	}, function(index){
//			
//			var url = "/users/deleteUserInfo";
//			$.ajax({
//				type : "post",
//				dataType : 'json',
//				url : url,
//				data : {
//					"id" : id
//				},
//				success : function(data) {
//
////					userTable = $('#userTable').dataTable().api();
////					userTable.ajax.url(refresh).load(null, false);
//				},
//				error : function(){
//					layer.msg('删除失败', {
//						time: 2000, //20s后自动关闭
//					  });
//				}
//			});
//			//关闭
////			layer.close(index);
//	})		
});


/**
 * 删除会员
 * 
 * @param objId
 */
//function deleteUserById(id){
//	layer.confirm('确定要删除该会员吗？', {
//	//默认  确定取消
//	}, function(index){
//			
//			var url = "/users/deleteUserInfo";
//			$.ajax({
//				type : "post",
//				dataType : 'json',
//				url : url,
//				data : {
//					"id" : id
//				},
//				success : function(data) {
//
//					userTable = $('#userTable').dataTable().api();
//					userTable.ajax.url(refresh).load(null, false);
//				},
//				error : function(){
//					layer.msg('删除失败', {
//						time: 2000, //20s后自动关闭
//					  });
//				}
//			});
//			//关闭
//			layer.close(index);
//		});
//
//}

/**
   * 查询会员信息
   */
//function queryUserDetailsById(id) {
//	if ("null" != id || id != null || "" != id) {
//		$.ajax({
//			type : "POST",
//			dataType : 'json',
//			data : {
//				"id" : id
//			},
//			url : "/users/queryUsersInfo",
//			success : function(data) {
//				addOrUpdateState="update";
//				$("#id").val(data.data.id);
//				$("#principal").val(data.data.principal);
//				
//				$("#linkman").val(data.data.linkman);
//				
//				$("#lgtd").val(data.data.lgtd);
//				$("#lttd").val(data.data.lttd);
//				
//				$("#linktel").val(data.data.linktel);
//				
//				$("#fax").val(data.data.fax);
//				$("#dutytel").val(data.data.dutytel);
//					
//				$("#voutreachsite").val(data.data.siteid);
//				
//				$('#outreachsite').select2().select2('val',data.data.siteid);
//				
//				$("#email").val(data.data.email);
//				$("#jobs").val(data.data.jobs);
//				$("#company").val(data.data.company);
//				$("#vcompany").val(data.data.company);
//				$("#con").val(data.data.con);
//				$("#ext1").val(data.data.ext1);
//				$("#ext2").val(data.data.ext2);
//				$("#addOrEdit").html("<i class='glyphicon glyphicon-edit'></i>修改");
//
//				$('#leftmodel').modal('toggle');
//			}
//		});
//	} else {
//		$('#leftmodel').modal('toggle');
//	}
//}
//
/**
   * 修改会员信息
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
