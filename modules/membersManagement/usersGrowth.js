/**
 * 等级和特权信息查询
 * 
 * @author LIJIAYIN
 * @version 1.1
 */
var levelTable;
var privilegeTable;
/**
 * 小手图标
 */
//window.onload = function() {
//	document.getElementsByTagName("html").item(0).style.cursor = "pointer";
//};
var levelUrl = "userLevel.json";
var privilegeUrl="userPrivilege.json";
//var finddate = new Date();
//var addOrUpdateState;

$(function() {
//	ecCom.curUserSites("#psite",null,"0,1,2",true); 
//	ecCom.curUserSites("#outreachsite","","0,1,2",false); 
	// 加载等级列表
	createLevelTable();
	
//	$("#userStatus").change(function(){
//		createLeftTable();
//	});
//	$("#forbiddenFunc").change(function(){
//		createLeftTable();
//	});
//	$("#userLevel").change(function(){
//		createLeftTable();
//	});
//	$("#btnSearchName").change(function(){
//		createLeftTable();
//	});
});
/**
 * 创建等级列表表格
 * 
 * @param data
 * @returns
 */
function createLevelTable() {
	 levelTable=$('#levelTable').dataTables_userDef(
					{
						/*"ajax" : {
							"url" : levelUrl,
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
						"ajax":levelUrl,
						"retrieve":true,
//						"data":data.data.list,
						"columns" : [

								{
									"title" : "等级名称",
									"data" : "levelName",
									"name" : "levelName",
									"visible" : true,
									"orderable" : true,
								},
								{
									"title" : "消费区间（元）",
									"data" : "consumptRange",
									"name" : "consumptRange",
									"visible" : true,
									"orderable" : true,
									"render" : function(data, type, full, meta) {
										var operBtn = '<span title="最低消费" class=" ">'+data.minConsumption+'-</span>';
										operBtn += '<span title="最高消费" class="">'+data.maxConsumption+'</span>';
										return operBtn;
									}
								},
								{
									"title" : "特权ID",
									"data" : "privilegeId",
									"name" : "privilegeId",
									"visible" : true,
									"orderable" : true
								},

								{
									"title" : "特权说明",
									"data" : "privilegeDes",
									"name" : "privilegeDes",
									"visible" : true,
									"orderable" : true,
									
								},
								{
									"title" : "操作",
									"data" : "levelId",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<a title="修改" class="edit level-updateBtn btn btn-sm btn-warning">修改</a>&nbsp;&nbsp;';
										operBtn += '<a title="删除" class="delete level-deleteBtn btn btn-sm btn-danger">删除</a>';
										return operBtn;
									}
								} 
						],
						"order" : [ [ 2, "desc" ] ]
					});
}
$('body').on('click', '.level-updateBtn', function() {
	window.location.href="addOrUpdateLevel.html";
});
$('body').on('click', '.level-deleteBtn', function() {
	layer.confirm("确认删除该会员等级吗");
});

/**
 * 创建特权列表表格
 * 
 * @param data
 * @returns
 */
function createPrivilegeTable() {
	 privilegeTable=$('#privilegeTable').dataTables_userDef(
					{
						/*"ajax" : {
							"url" : privilegeUrl,
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
						"ajax":privilegeUrl,
						"retrieve":true,
						"columns" : [

								{
									"title" : "特权ID",
									"data" : "privilegeId",
									"name" : "privilegeId",
									"visible" : true,
									"orderable" : true
								},

								{
									"title" : "特权说明",
									"data" : "privilegeDes",
									"name" : "privilegeDes",
									"visible" : true,
									"orderable" : true,
									
								},
								{
									"title" : "操作",
									"data" : "ID",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<a title="修改" class="edit pri-updateBtn btn btn-sm btn-warning"  onclick="updatePrivilegeById(\''
												+ data
												+ '\');">修改</a>&nbsp;&nbsp;';
										operBtn += '<a title="删除" class="delete pri-deleteBtn btn btn-sm btn-danger"  onclick="deletePrivilegeById(\''
												+ data
												+ '\');">删除</a>';
										return operBtn;
									}
								} 
						],
//						"order" : [ [ , "desc" ] ]
					});
}
$('body').on('click', '.pri-updateBtn', function() {
	window.location.href="addOrUpdatePrivilege.html";
});
$('body').on('click', '.pri-deleteBtn', function() {
	layer.confirm("确认删除该会员特权吗");
});
/**
 * 【删除等级操作】
 * 
 * @param objId
 */
//function left_delete(id)
//{
//	layer.confirm('是否删除？', {
//	//默认  确定取消
//	}, function(index){
//			
//			var url = "../../outreach/deloutreach.action";
//			$.ajax({
//				type : "post",
//				dataType : 'json',
//				url : url,
//				data : {
//					"id" : id
//				},
//				success : function(data) {
//
//					var left_Table = $('#leftTable').dataTable().api();
//					left_Table.ajax.url(refresh).load(null, false);
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
//
///**
// * 查询会员信息
// */
//function getUserInfoById(id) {
//	if ("null" != id || id != null || "" != id) {
//		$.ajax({
//			type : "POST",
//			dataType : 'json',
//
//			data : {
//				"id" : id
//			},
//			url : "../../outreach/getoutreachbyid.action",
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
///**
// * 添加修改
// * 
// * @returns {Boolean}
// */
//function addOrUpdate(){
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
//
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
