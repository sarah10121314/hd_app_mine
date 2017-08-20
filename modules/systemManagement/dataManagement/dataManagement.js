var refresh="../../event/geteventcheck.action";
var leftTable;

$(function(){
	
	//加载表格
	createLeftTable();
});

$(function() {
	ecCom.curUserSites("#serchSite",null,"0,1,2",true);
	
	// 加载表格
	createLeftTable();
	$("#btnSearchName").change(function(){
		createLeftTable();
	});
	$("#serchSite").change(function(){
		createLeftTable();
	});
	$("#planType").change(function(){
		createLeftTable();
	});
	/**
	 * 帮助
	 */
	$("#expertHover").click(function(){
		function_declaration("很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字");
	});
});


/**
 * 创建表格
 * 
 * @param data
 * @returns
 */
function createLeftTable() {
	leftTable = $('#leftTable').dataTables_userDef({
						/*"ajax" : {
							"url" : refresh,
							"type" : "POST",
							"data": function (data) {    
								return $.extend( {}, data, {    
									"siteid" : $("#serchSite").val(),
									"name" : $("#btnSearchName").val(),
									"status" : 0, //正在进行 0//结束
									"type": $("#planType").val()
								} );
							}
						},
						*/
					    "ajax" : "../../../modules/systemManagement/dataManagement/demo-datatables-data.txt",
						
						"pagingType": "full_numbers",//分页 有first last
						"columns" : [
								{
									"title" : "编号",
									"data" : "workflowid",
									"name" : "event.workflowid",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "名称",
									"data" : "occurtime",
									"name" : "event.occurtime",
									"visible" : true,
									"orderable" : true
//									,
//									"render" : function(data, type, full, meta) {
//										var date = new Date(data);
//										return moment(date).format("YYYY-MM-DD HH:mm:ss");
//									}
								},
								{
									"title" : "显示顺序",
									"data" : "workflowid",
									"name" : "event.workflowid",
									"visible" : true,
									"orderable" : false
								},
								{
									"title" : "操作",
									"data" : "id",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<button class=" btn-sm btn btn-warning " title="修改" onclick="updateById(\''
												+ full.id 
												+ '\');">修改</button>';
											operBtn += '<button class=" btn-sm btn btn-danger " title="删除" onclick="dataDelete(\''
												+ full.id
												+ '\');">删除</button>';
										return operBtn;
									}
								} ],
						"order" : [ [ 1, "desc" ] ]

					});
}


function getEventById(eventname,eventid,workflowinstid,workflowid,planid){
	PM.openTab(eventname,"../planhist/historyplan.jsp?eventid=" + eventid+"&planid="+planid+"&workflowinstid="+workflowinstid+"&workflowid="+workflowid);
}

//修改点击事件
function updateById(priceid){
	location.href="../../../modules/systemManagement/dataManagement/dataEdit.html";
}

//新增类型
$("#addData").click(function(){
	location.href="../../../modules/systemManagement/dataManagement/dataEdit.html";
});

/**
 * 【删除操作】
 * 
 * @param objId
 */
function dataDelete(eventid) {
	layer.confirm('是否删除？', {
	//默认  确定取消
	}, function(index){
			
		var url = "../../event/deleventdb.action";
		$.ajax({
			type : "post",
			dataType : 'json',
			url : url,
			data : {
				"ids" : eventid
			},
			success : function(data) {
				var jobevent = $('#ecTable').dataTable().api();
				jobevent.ajax.url(refresh).load(null, false);
			},
			error : function(){
				layer.msg('删除失败', {
					//十秒自动关闭
					time: 1500
					});	
			}
		});
			//关闭
			layer.close(index);
		});
	
}
		
		
		
		
		
		
		
		
