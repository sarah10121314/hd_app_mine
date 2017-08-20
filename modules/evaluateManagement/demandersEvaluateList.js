/**
 * 需求者评论查询
 * 
 * @author LIJIAYIN
 * @version 1.1
 */
var demandersEvaluateListTable;
var demandersEvaluateListUrl= "demandersEvaluateList.json";

//var addOrUpdateState;

$(function() {
	//加载日期选择器
	chooseTime();
	// 加载表格
	createDemandersEvaluateListTable();
	$("#chkAll").checkAll("#demandersEvaluateListTable");
	
//	$("#new").click(function() {
//		Addinit();
//	});
//	$("#userStatus").change(function(){
//	    createDemandersEvaluateListTable();
//	});
//	$("#forbiddenFunc").change(function(){
//		createDemandersEvaluateListTable();
//	});
//	$("#userLevel").change(function(){
//		createDemandersEvaluateListTable();
//	});
//	$("#btnSearchName").change(function(){
//		createDemandersEvaluateListTable();
//	});
});

function chooseTime(){
	
	$('.chooseTime').datetimepicker({
		
//      dateFormat: 'yyyy-mm-dd',
//      timeFormat:'HH:ii:ss',
        format: 'yyyy-mm-dd hh:ii:ss',
        language: 'zh-CN',
		autoclose:true,
		startView:2,
		todayBtn:true,
		todayHighlight:1,
		forceParse: 0,
		weekStart: 1,
		pickerPosition: "bottom-left"
	});

}
/**
 * 创建通知消息表格
 * 
 * @param data
 * @returns
 */
function createDemandersEvaluateListTable() {
	 demandersEvaluateListTable=$('#demandersEvaluateListTable').dataTable(
//	 .dataTables_userDef(
					{
						/*"ajax" : {
							"url" : demandersEvaluateListUrl,
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
						"ajax":demandersEvaluateListUrl,
						searching : false,
	lengthChange : false, // 是否启用设置每页显示记录数
	"language": {
		"sLengthMenu": "&nbsp;&nbsp;&nbsp;&nbsp;每页显示 _MENU_ 条",
		"sZeroRecords": "抱歉， 没有找到",
    	"sEmptyTable": "抱歉， 没有找到",
    	"sInfo": "显示 _START_ 到 _END_ 条　共 _TOTAL_ 条",
    	"sInfoEmpty": "没有记录",
    	"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
    	"sProcessing":"正在加载中...",
    	"sSearch": "搜索：",
    	"oPaginate": {
    		"sFirst": "首页",
    		"sPrevious": "上一页",
    		"sNext": "下一页",
    		"sLast": "末页"
    	}
	},

						
						
						"columns" : [
						
								{
									"title" : "<input id='chkAll' type='checkbox'/>",
									"data" : "commentId",
									"name" : "commentId",
									"visible" : true,
									"orderable" : false,
									 "render" : function(data, type, row, meta){
										if (type == 'display') {				
											return  '<input type="checkbox" id="'+row.commentId+'" />';
										}
										return '';
				
									}
								},
								{
									"title" : "评论对象",
									"data" : "commentTarget",
									"name" : "commentTarget",
									"visible" : true,
									"orderable" : true,
								},
								{
									"title" : "订单编号",
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
										var operBtn = '<a title="审核" class="de-checkBtn btn btn-sm btn-info" onclick="handCheck(\''
												+ data+ '\')">审核</a>' ;
										operBtn +='<a title="编辑" class="de-updateBtn btn btn-sm btn-warning" href="updateDemanderEvaluate.html">编辑</a>';
										operBtn +='<a title="删除" class="delete de-deleteBtn btn btn-sm btn-danger" onclick="delDemanderEvaluateById(\''
												+ data
												+ '\');">删除</a>' ;
										return operBtn;
									}
								} 
						],
						"order" : [ [ 2, "desc" ] ]
					});
}

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

//删除评论弹出框
function delDemanderEvaluateById(id){
   layer.confirm('确定要删除该评论吗？',{},function(index){
		var url = "";
			$.ajax({
				type : "post",
				dataType : 'json',
				url : url,
				data : {
					"id" : id
				},
				success : function(data) {

					demandersEvaluateListTable = $('#demandersEvaluateListTable').dataTable().api();
					demandersEvaluateListTable.ajax.url(demandersEvaluateListUrl).load(null, false);
				},
				error : function(){
					layer.msg('删除失败', {
						time: 2000, //20s后自动关闭
					  });
				}
			});
	});
			//关闭
			layer.close(index);
}

//全选
//function clickAll(){
//	
//	$("#chkAll").click(function(){
//	    var checkAll = $(this).attr("checked");
//	    if(checkAll)
//		{
//			var checkboxList = $('#demandersEvaluateListTable  input');
//			checkboxList.each(function(){
//            $(this).attr("checked",true);
//        }); 
//		}
//		else
//		{
//			var checkboxList = $('#demandersEvaluateListTable  input');
//			checkboxList.each(function(){
//            $(this).attr("checked",false);
//        }); 
//		}
//	});
//}

//删除全部
//	$('#delAll').bind('click',function(){
//		var ids = new Array();
//		var checkboxList = $('#demandersEvaluateListTable tbody input');
//		checkboxList.each(function(){
//			if( $(this).attr("checked") )
//			{
//				var commentId = $(this).attr("id");
//				ids.push(commentId);
//			}
//      }); 
//		if(ids.length > 0)
//		{
//			layer.confirm('是否删除全部？', {
//				//默认  确定取消
//				}, function(index){
//					$("#commentids").val(ids);
//					$.ajax({
//						type : "post",
//						dataType : 'json',
//						url : "../../event/deleventdb.action",
//						data : {
//							"ids" : $("#eventids").val(),
//						},
//						success : function(data) {
//							if(data)
//							{
//								
//							$('#chkAll').attr("checked",false);
//							var jobevent = $('#ecTable').dataTable().api();
//							jobevent.ajax.url(refresh).load(null, false);
//							
//							layer.msg('批处理删除成功', {
//								//十秒自动关闭
//								time: 1500
//								});	
//							}
//							else{
//								layer.msg('批处理删除失败', {
//									//十秒自动关闭
//									time: 2000
//									});	
//							}
//						},
//						error : function(){
//							layer.msg('批处理删除失败', {
//								//十秒自动关闭
//								time: 2000
//								});	
//						}
//					});
//						//关闭
//						layer.close(index);
//					});
//		}
//		else
//		{
//			layer.msg("请先选中要批处理删除的信息!", {
//				time: 3000,//1.5秒自动关闭
//				});
//		}
//		
//	});
//});

/**
   * 查询评论详情
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
