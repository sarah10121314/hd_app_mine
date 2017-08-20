/**
 * 系统消息模板查询
 * 
 * @author LIJIAYIN
 * @version 1.1
 */
var systemMessagesTemplateTable;
var systemMessagesTemplateUrl= "systemMessagesTemplate.json";
//var finddate = new Date();

//var addOrUpdateState;

$(function() {
	// 加载表格
	createSystemMessagesTemplateTable();
	
//	$("#new").click(function() {
//		Addinit();
//	});
//	$("#userStatus").change(function(){
//	    createSystemMessagesTemplateTable();
//	});
//	$("#forbiddenFunc").change(function(){
//		createSystemMessagesTemplateTable();
//	});
//	$("#userLevel").change(function(){
//		createSystemMessagesTemplateTable();
//	});
//	$("#btnSearchName").change(function(){
//		createSystemMessagesTemplateTable();
//	});
});

/**
 * 创建系统消息表格
 * 
 * @param data
 * @returns
 */
function createSystemMessagesTemplateTable() {
	 systemMessagesTemplateTable=$('#systemMessagesTemplateTable').dataTables_userDef(
					{
						/*"ajax" : {
							"url" : systemMessagesListUrl,
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
						"ajax":systemMessagesTemplateUrl,
						"columns" : [
								{
									"title" : "模板标识",
									"data" : "templateIdentity",
									"name" : "templateIdentity",
									"visible" : true,
									"orderable" : true,
								},
								{
									"title" : "模板标题",
									"data" : "templateTitle",
									"name" : "templateTitle",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "模板内容",
									"data" : "templateCont",
									"name" : "templateCont",
									"visible" : true,
									"orderable" : true
								},

								{
									"title" : "行为",
									"data" : "action",
									"name" : "action",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "行为参数",
									"data" : "actionParas",
									"name" : "actionParas",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "操作",
									"data" : "templateId",
									"visible" : true,
									"width": "160px",
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<a title="修改" class="smt-updateBtn btn btn-sm btn-warning" onclick="updateSystemMessageTemplateDetailById(\''
												+ data
												+ '\');">修改</a>';
										operBtn +='<a title="删除" class="delete smt-deleteBtn btn btn-sm btn-danger">删除</a>' ;
										return operBtn;
									}
								} 
						],
						"order" : [ [ 2, "desc" ] ]
					});
}

//查看消息详情
//$('body').on('click', '.sm-queryBtn', function() {
//	window.location.href="querySystemMessages.html";
//	onclick="getOutreachById(\''
//												+ data
//												+ '\');"
//});

//删除系统消息弹出框
$('body').on('click', '.smt-deleteBtn', function() {
	layer.confirm('确定要删除该系统消息吗？',{},function(index){
//		var url = "/users/deleteUserInfo";
//			$.ajax({
//				type : "post",
//				dataType : 'json',
//				url : url,
//				data : {
//					"id" : id
//				},
//				success : function(data) {
//
//					systemMessagesTable = $('#systemMessagesTable').dataTable().api();
//					systemMessagesTable.ajax.url(systemMessagesListUrl).load(null, false);
//				},
//				error : function(){
//					layer.msg('删除失败', {
//						time: 2000, //20s后自动关闭
//					  });
//				}
			});
//			//关闭
//			layer.close(index);
	});

/**
   * 修改系统消息模板详情
   */
function updateSystemMessageTemplateDetailById(id) {
	window.location.href="updateSystemMessagesTemplate.html";
//	if ("null" != id || id != null || "" != id) {
//		$.ajax({
//			type : "POST",
//			dataType : 'json',
//			data : {
//				"id" : id
//			},
//			url : systemMessagesListUrl,
//			success : function(data) {
//				$("#sender").val(data[data].sender);
//				$("#messageTitle").val(data[data].messageTitle);
//				
//				$("#sendTime").val(data[data].sendTime);
//				
//				$("#action").val(data[data].action);
//				$("#actionParas").val(data[data].actionParas);
//				
//				$("#sendStatus").val(data[data].sendStatus);
//				
//				$("#receiver").val(data[data].receiver);
//			}
//		});
//	} else {
//		layer.msg("查询失败");
//	}
}
