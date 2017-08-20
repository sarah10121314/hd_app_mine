var refresh="../../event/geteventcheck.action";
var leftTable;
var sysTable;
var timeend=new Date();
var timebefore=moment(timeend).add("month",-1);
$("#sendtimeend").val(moment(timeend).format("YYYY/MM/DD HH:mm:ss"));
$("#sendtimebefore").val(moment(timebefore).format("YYYY/MM/DD HH:mm:ss"));
$("#receivetimeend").val(moment(timeend).format("YYYY/MM/DD HH:mm:ss"));
$("#receivetimebefore").val(moment(timebefore).format("YYYY/MM/DD HH:mm:ss"));

$(function(){
	
	timeconfig();
	createUserLableTable();
	createSystemLableTable();
	clickAll();
});


function timeconfig(){
	$('#sendtimebefore,#sendtimeend,#receivetimebefore,#receivetimeend').datetimepicker({
		
		timeFormat:"HH:mm:ss",
		dateFormat:"yy/mm/dd"
		
	});

}

$(function() {
	ecCom.curUserSites("#serchSite",null,"0,1,2",true);
	
	// 加载表格
	createUserLableTable();
	$("#btnSearchName").change(function(){
		createUserLableTable();
	});
	$("#serchSite").change(function(){
		createUserLableTable();
	});
	$("#planType").change(function(){
		createUserLableTable();
	});
	/**
	 * 帮助
	 */
	$("#expertHover").click(function(){
		function_declaration("很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字很长一段文字");
	});
});


/**
 * 创建用户标签管理表格
 * 
 * @param data
 * @returns
 */
function createUserLableTable() {
	leftTable = $('#userLableTable').dataTables_userDef({
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
					    "ajax" : "../../../modules/appService/tagManagement/demo-datatables-data.txt",
						
						"pagingType": "full_numbers",//分页 有first last
						"columns" : [

								{
									"title" : "标签值",
									"data" : "eventname",
									"name" : "event.eventname",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "引用数量",
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
									"title" : "操作",
									"data" : "id",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										/*var operBtn = '<a title="进入历史页面" onclick="getEventById(\''
											+ full.eventname + '\',\''
											+ full.id + '\',\''+ full.workflowinstid + '\',\'' + full.workflowid + '\',\'' 
												+ '\');"><i class="glyphicon glyphicon-alert"></i></a>&nbsp;&nbsp;';*/
										var operBtn = '<button class=" btn-sm btn btn-warning " title="转换" onclick="eventChange(\''
												+ full.id 
												+ '\');">转换</button>';
											operBtn += '<button class=" btn-sm btn btn-danger " title="删除" onclick="eventDelete(\''
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


	

function createSystemLableTable() {
	sysTable = $('#systemLableTable').dataTables_userDef({
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
					    "ajax" : "../../../modules/appService/tagManagement/demo-datatables-data.txt",
						
						"pagingType": "full_numbers",//分页 有first last
						"columns" : [
								{
									"title" : "<input id='chkAll' type='checkbox' />",
									"data" : "id",
									"name" : "event.id",
									"visible" : true,  
								    "orderable" : false,
								    "render" : function(data, type, row, meta){
										if (type == 'display') {				
											return  '<input type="checkbox" id="'+row.id+'" />';
										}
										return '';
				
									}
								},
								{
									"title" : "分类名称",
									"data" : "eventname",
									"name" : "event.eventname",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "tag值",
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
									"title" : "操作",
									"data" : "id",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<button class=" btn-sm btn btn-danger " title="清空" onclick="eventClear(\''
												+ full.id
												+ '\');">清空</button>';
										return operBtn;
									}
								} ],
						"order" : [ [ 1, "desc" ] ]

					});
}

//全选
function clickAll(){
	
	$("#chkAll").click(function(){
	    var checkAll = $(this).attr("checked");
	    if(checkAll)
		{
			var checkboxList = $('#systemLableTable  input');
			checkboxList.each(function(){
              $(this).attr("checked",true);
          }); 
		}
		else
		{
			var checkboxList = $('#systemLableTable  input');
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
function eventChange(eventid) {
	

	layer.confirm('是否转换？', {
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
				layer.msg('转换失败', {
					//十秒自动关闭
					time: 1500
					});	
			}
		});
			//关闭
			layer.close(index);
		});
	
}

/**
 * 【删除操作】
 * 
 * @param objId
 */
function eventDelete(eventid) {
	

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
		
/**
 * 【清空操作】
 * 
 * @param objId
 */
function eventClear(eventid) {
	layer.confirm('是否清空？', {
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
		
