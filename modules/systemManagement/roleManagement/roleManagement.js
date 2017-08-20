var refresh="../../event/geteventcheck.action";
var leftTable;

$(function(){
	
	//加载表格
	createLeftTable();
	clickAll();
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
					    "ajax" : "../../../modules/systemManagement/roleManagement/demo-datatables-data.txt",
						
						"pagingType": "full_numbers",//分页 有first last
						"columns" : [
								{
									"title" : "<input id='chkAll' type='checkbox' />",
									"data" : "id",
									"name" : "event.id",
									"visible" : true,  
								    "orderable" : false,
								    "render" : function(data, type, full, meta){
										if (type == 'display') {				
											return  '<input type="checkbox" id="'+full.id+'" />';
										}
										return '';
				
									}
								},
								{
									"title" : "角色名",
									"data" : "eventname",
									"name" : "event.eventname",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "角色说明",
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
									"title" : "角色等级",
									"data" : "scene",
									"name" : "event.scene",
									"visible" : true,
									"orderable" : true
									
								},{
									"title" : "角色类型",
									"data" : "stopdesc",
									"name" : "event.stopdesc",
									"visible" : true,
									"orderable" : false
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
											operBtn += '<button class=" btn-sm btn btn-danger " title="删除" onclick="roleDelete(\''
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
	location.href="../../../modules/systemManagement/roleManagement/roleEdit.html";
}

//新增角色
$("#addRole").click(function(){
	location.href="../../../modules/systemManagement/roleManagement/roleEdit.html";
});

//全选
function clickAll(){
	
	$("#chkAll").click(function(){
	    var checkAll = $(this).attr("checked");
	    if(checkAll)
		{
			var checkboxList = $('#leftTable  input');
			checkboxList.each(function(){
              $(this).attr("checked",true);
          }); 
		}
		else
		{
			var checkboxList = $('#leftTable  input');
			checkboxList.each(function(){
              $(this).attr("checked",false);
          }); 
		}
	});
}

/**
 * 【删除操作】
 * 
 * @param objId
 */
function roleDelete(eventid) {
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
		
		
		
		
		
		
		
		
