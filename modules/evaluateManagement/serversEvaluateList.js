/**
 * 通知消息查询
 * 
 * @author LIJIAYIN
 * @version 1.1
 */
var serversEvaluateListTable;
var serversEvaluateListUrl= "demandersEvaluateList.json";
//var finddate = new Date();

//var addOrUpdateState;

$(function() {
	
//	$("#handCheck").modal();
	chooseTime();
	// 加载表格
	createServersEvaluateListTable();
	
//	$("#new").click(function() {
//		Addinit();
//	});
//	$("#userStatus").change(function(){
//	    createServersEvaluateListTable();
//	});
//	$("#forbiddenFunc").change(function(){
//		createServersEvaluateListTable();
//	});
//	$("#userLevel").change(function(){
//		createServersEvaluateListTable();
//	});
//	$("#btnSearchName").change(function(){
//		createServersEvaluateListTable();
//	});
});

function chooseTime(){
	$('#startTime,#endTime').datetimepicker({
		
		timeFormat:"HH:mm:ss",
		dateFormat:"yy/mm/dd"
		
	});

}


  
/**
 * 创建通知消息表格
 * 
 * @param data
 * @returns
 */
function createServersEvaluateListTable() {
	 serversEvaluateListTable=$('#serversEvaluateListTable').dataTables_userDef(
					{
						/*"ajax" : {
							"url" : notificationMessagesListUrl,
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
						"ajax":serversEvaluateListUrl,
						"columns" : [
								{
									"title" : "需求名称",
									"data" : "commentTarget",
									"name" : "commentTarget",
									"visible" : true,
									"orderable" : true,
								},
								{
									"title" : "需求者",
									"data" : "orderNum",
									"name" : "orderNum",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "评论时间",
									"data" : "commentTime",
									"name" : "commentTime",
									"visible" : true,
									"orderable" : true
								},

								{
									"title" : "评论内容",
									"data" : "commentCont",
									"name" : "commentCont",
									"visible" : true,
									"orderable" : true
								},
								
								{
									"title" : "评论者",
									"data" : "commentator",
									"name" : "commentator",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "评论状态",
									"data" : "commentStatus",
									"name" : "commentStatus",
									"visible" : true,
									"orderable" : true,
									"render" : function(data, type, full, meta) {
										var commentStatusHtml;
										if(data==="0"){
											commentStatusHtml='<span title="发送类型">已审核</span>';
										}else if(data==="1"){
											commentStatusHtml='<span title="发送类型">已禁止</span>';
										}else{
											commentStatusHtml='<span title="发送类型">待审核</span>';
										}
										return commentStatusHtml;
									}
								},
								{
									"title" : "操作",
									"data" : "commentId",
									"visible" : true,
									"width": "200px",
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<a title="审核" data-method="notice" class="se-checkBtn btn btn-sm btn-info" onclick="handCheck(\''
												+ data+ '\')">审核</a>' ;
										operBtn +='<a title="编辑" class="se-queryBtn btn btn-sm btn-warning" href="updateServerEvaluate.html">编辑</a>';
										operBtn +='<a title="删除" class="delete se-deleteBtn btn btn-sm btn-danger">删除</a>' ;
										return operBtn;
									}
								} 
						],
						"order" : [ [ 2, "desc" ] ]
					});
}

//查看消息详情
//$('body').on('click', '.se-queryBtn', function() {
//	window.location.href="querySystemMessages.html";
//	onclick="getOutreachById(\''
//												+ data
//												+ '\');"
//});

//审核弹出框	
function handCheck(id){
	layer.open({
        type: 1
        ,title: '审核' //不显示标题栏
        ,closeBtn: false
        ,area: ['300px', '180px']
        ,shade: 0.3
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['确认', '取消']
        ,moveType: 1 //拖拽模式，0或者1
        ,content: $("#handCheckCont")
        ,yes: function(index,layero){
//         var url = "";
//         $.ajax({
//				type : "post",
//				dataType : 'json',
//				url : url,
//				data : {
//					"id" : id
//				},
//				success : function(data) {
//
//					serversEvaluateListTable = $('#serversEvaluateListTable').dataTable().api();
//					serversEvaluateListTable.ajax.url(serversEvaluateListUrl).load(null, false);
         			layer.close(index);
//				},
//				error : function(){
//					layer.msg('审核失败', {
//						time: 2000, //20s后自动关闭
//					  });
//				}
//			}
        }
      });
}

//删除通知消息弹出框
$('body').on('click', '.se-deleteBtn', function() {
	layer.confirm('确定要删除该评论吗？'
//	,{},function(index){
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
//			}
	);
//			//关闭
//			layer.close(index);
	});

/**
   * 查询通知消息详情
   */
//function queryDemanderEvaluateDetailById(id) {
//	window.location.href="queryNotificationMessages.html";
//	if ("null" != id || id != null || "" != id) {
//		$.ajax({
//			type : "POST",
//			dataType : 'json',
//			data : {
//				"id" : id
//			},
//			url : notificationMessagesListUrl,
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
//}
