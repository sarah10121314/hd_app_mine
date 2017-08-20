/**
 * 行程助手信息查询
 * 
 * @author LIJIAYIN
 * @version 1.1
 */
var carTypeTable;
var outputVolumeTable;
var countingParasTable;
var carTypeUrl="carType.json";
var outputVolumeUrl = "outputVolume.json";
var countingParasUrl="countingParas.json";
//var finddate = new Date();
//var addOrUpdateState;

$(function() {
	// 加载车型列表
	createCarTypeTable();
	
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
 * 创建车型列表表格
 * 
 * @param data
 * @returns
 */
function createCarTypeTable() {
	 carTypeTable=$('#carTypeTable').dataTables_userDef(
					{
						/*"ajax" : {
							"url" : carTypeUrl,
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
						"ajax":carTypeUrl,
						"retrieve":true,
//						"data":data.data.list,
						"columns" : [

								{
									"title" : "品牌",
									"data" : "brand",
									"name" : "brand",
									"visible" : true,
									"orderable" : true,
								},
								{
									"title" : "车型名称",
									"data" : "carTypeName",
									"name" : "carTypeName",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "排量",
									"data" : "outputVolume",
									"name" : "outputVolume",
									"visible" : true,
									"orderable" : true
								},

								{
									"title" : "类型",
									"data" : "type",
									"name" : "type",
									"visible" : true,
									"orderable" : true
									
								},
								{
									"title" : "操作",
									"data" : "carTypeId",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<a title="修改" class="edit ct-updateBtn btn btn-sm btn-warning">修改</a>&nbsp;&nbsp;';
										operBtn += '<a title="删除" class="delete ct-deleteBtn btn btn-sm btn-danger">删除</a>';
										return operBtn;
									}
								} 
						]
//						"order" : [ [ 2, "desc" ] ]
					});
}
$('body').on('click', '.ct-updateBtn', function() {
	window.location.href="addCarType.html";
});
$('body').on('click', '.ct-deleteBtn', function() {
	layer.confirm("确认删除该车型吗");
});

/**
 * 创建排量列表表格
 * 
 * @param data
 * @returns
 */
function createOutputVolumeTable() {
	 outputVolumeTable=$('#outputVolumeTable').dataTables_userDef(
					{
						/*"ajax" : {
							"url" : outputVolumeUrl,
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
						"ajax":outputVolumeUrl,
						"retrieve":true,
						"columns" : [

								{
									"title" : "排量名称",
									"data" : "name",
									"name" : "name",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "操作",
									"data" : "outputVolumeId",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<a title="修改" class="edit ov-updateBtn btn btn-sm btn-warning"  onclick="updatePrivilegeById(\''
												+ data
												+ '\');">修改</a>&nbsp;&nbsp;';
										operBtn += '<a title="删除" class="delete ov-deleteBtn btn btn-sm btn-danger"  onclick="deletePrivilegeById(\''
												+ data
												+ '\');">删除</a>';
										return operBtn;
									}
								} 
						]
//						"order" : [ [ , "desc" ] ]
					});
}
$('body').on('click', '.ov-updateBtn', function() {
	window.location.href="addOutputVolume.html";
});
$('body').on('click', '.ov-deleteBtn', function() {
	layer.confirm("确认删除该排量吗");
});
function createCountingParasTable() {
	 countingParasTable=$('#countingParasTable').dataTables_userDef(
					{
						/*"ajax" : {
							"url" : countingParasUrl,
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
						"ajax":countingParasUrl,
						"retrieve":true,
						"columns" : [

								{
									"title" : "城市",
									"data" : "city",
									"name" : "city",
									"visible" : true,
									"orderable" : true
								},

								{
									"title" : "类型",
									"data" : "type",
									"name" : "type",
									"visible" : true,
									"orderable" : true,
									
								},
								{
									"title" : "里程费",
									"data" : "mileageFee",
									"name" : "mileageFee",
									"visible" : true,
									"orderable" : true,
									
								},
								{
									"title" : "时长费",
									"data" : "durationFee",
									"name" : "durationFee",
									"visible" : true,
									"orderable" : true,
									
								},
								{
									"title" : "最低消费",
									"data" : "minFee",
									"name" : "minFee",
									"visible" : true,
									"orderable" : true,
									
								},
								{
									"title" : "远途费",
									"data" : "longDistanceFee",
									"name" : "longDistanceFee",
									"visible" : true,
									"orderable" : true,
									
								},
								{
									"title" : "夜间费",
									"data" : "nightFee",
									"name" : "nightFee",
									"visible" : true,
									"orderable" : true,
									
								},
								{
									"title" : "动态调度费",
									"data" : "dispatchFee",
									"name" : "dispatchFee",
									"visible" : true,
									"orderable" : true,
									
								},
								{
									"title" : "操作",
									"data" : "countingParasId",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<a title="修改" class="edit cp-updateBtn btn btn-sm btn-warning">修改</a>&nbsp;&nbsp;';
										operBtn += '<a title="删除" class="delete cp-deleteBtn btn btn-sm btn-danger">删除</a>';
										return operBtn;
									}
								} 
						],
//						"order" : [ [ , "desc" ] ]
					});
}
$('body').on('click', '.cp-updateBtn', function() {
	window.location.href="addCountingParas.html";
});
$('body').on('click', '.cp-deleteBtn', function() {
	layer.confirm("确认删除该计费参数吗");
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
