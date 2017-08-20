/**
 * 系统消息查询
 * 
 * @author LIJIAYIN
 * @version 1.1
 */
var systemMessagesTable;
var systemMessagesListUrl= "systemMessagesList.json";
//var finddate = new Date();

//var addOrUpdateState;

$(function() {
	
    chooseTime();
	// 加载表格
	createSystemMessagesListTable();
	
//	$("#new").click(function() {
//		Addinit();
//	});
//	$("#userStatus").change(function(){
//	    createSystemMessagesListTable();
//	});
//	$("#forbiddenFunc").change(function(){
//		createSystemMessagesListTable();
//	});
//	$("#userLevel").change(function(){
//		createSystemMessagesListTable();
//	});
//	$("#btnSearchName").change(function(){
//		createSystemMessagesListTable();
//	});
});

function chooseTime(){
	$('#startTime,#endTime').datetimepicker({
		
		timeFormat:"HH:mm:ss",
		dateFormat:"yy/mm/dd"
		
	});

}
/**
 * 创建系统消息表格
 * 
 * @param data
 * @returns
 */
function createSystemMessagesListTable() {
	 systemMessagesTable=$('#systemMessagesTable').dataTables_userDef(
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
						"ajax":systemMessagesListUrl,
						"columns" : [
								{
									"title" : "消息标题",
									"data" : "messageTitle",
									"name" : "messageTitle",
									"visible" : true,
									"orderable" : true,
								},
								{
									"title" : "发送人",
									"data" : "sender",
									"name" : "sender",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "发送时间",
									"data" : "sendTime",
									"name" : "sendTime",
									"visible" : true,
									"orderable" : true
								},

								{
									"title" : "消息内容",
									"data" : "messageCont",
									"name" : "messageCont",
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
									"title" : "发送状态",
									"data" : "sendStatus",
									"name" : "sendStatus",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "接收人",
									"data" : "receiver",
									"name" : "receiver",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "发送类型",
									"data" : "sendType",
									"name" : "sendType",
									"visible" : true,
									"orderable" : true,
									"render" : function(data, type, full, meta) {
										var sendTypeHtml;
										if(data===0){
											sendTypeHtml='<span title="发送类型">自动发送</span>';
										}else{
											sendTypeHtml='<span title="发送类型">人工发送</span>';
										}
										return sendTypeHtml;
									}
								},
								{
									"title" : "操作",
									"data" : "messageId",
									"visible" : true,
									"width": "160px",
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<a title="查看" class="sm-queryBtn btn btn-sm btn-info" onclick="querySystemMessageDetailById(\''
												+ data
												+ '\');">查看</a>';
										operBtn +='<a title="删除" class="delete sm-deleteBtn btn btn-sm btn-danger">删除</a>' ;
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
$('body').on('click', '.sm-deleteBtn', function() {
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
   * 查询系统消息详情
   */
function querySystemMessageDetailById(id) {
	window.location.href="querySystemMessages.html";
	if ("null" != id || id != null || "" != id) {
		$.ajax({
			type : "POST",
			dataType : 'json',
			data : {
				"id" : id
			},
			url : systemMessagesListUrl,
			success : function(data) {
				$("#sender").val(data[data].sender);
				$("#messageTitle").val(data[data].messageTitle);
				
				$("#sendTime").val(data[data].sendTime);
				
				$("#action").val(data[data].action);
				$("#actionParas").val(data[data].actionParas);
				
				$("#sendStatus").val(data[data].sendStatus);
				
				$("#receiver").val(data[data].receiver);
			}
		});
	} else {
		layer.msg("查询失败");
	}
}
