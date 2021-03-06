var refresh="../../event/geteventcheck.action";
var leftTable;
var timeend=new Date();
var timebefore=moment(timeend).add("month",-1);
$("#sendtimeend").val(moment(timeend).format("YYYY/MM/DD HH:mm:ss"));
$("#sendtimebefore").val(moment(timebefore).format("YYYY/MM/DD HH:mm:ss"));
$("#receivetimeend").val(moment(timeend).format("YYYY/MM/DD HH:mm:ss"));
$("#receivetimebefore").val(moment(timebefore).format("YYYY/MM/DD HH:mm:ss"));

$(function(){
	
	timeconfig();
	
	//加载表格
	createLeftTable();
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
					    "ajax" : "../../../modules/appService/serviceTypeManagement/demo-datatables-data.txt",
						
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
											return  '<input type="checkbox" id="'+full.id+'" /><img src="/hd_app/modules/appService/serviceTypeManagement/imgs/open.png" class="img-rounded">';
										}
										return '';
				
									}
								},
								{
									"title" : "排序",
									"data" : "eventname",
									"name" : "event.eventname",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "菜单名称",
									"data" : "sitename",
									"name" : "event.sitename",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "图标",
									"data" : "occurtime",
									"name" : "event.occurtime",
									"visible" : true,
									"orderable" : true
									,
									"render" : function(data, type, full, meta) {
										var sevIcon = '<img src="'+full.workflowid+'">';
										return sevIcon;
									}
							    },
								{
									"title" : "操作",
									"data" : "id",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<button class=" btn-sm btn btn-warning " title="修改" onclick="updateSerTypeById(\''
												+ full.id 
												+ '\');">修改</button>';
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

function updateSerTypeById(priceid){
	location.href="../../../modules/appService/serviceTypeManagement/serviceTypeUpdate.html";
}



		
		
		
		
		
		
		
		
		
