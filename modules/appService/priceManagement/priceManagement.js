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
	//初始化发单价格、接单价格不能编辑
	$("#sendSerName").val($("#eclevel").find("option:selected").text()+"＞"+$("#ecstatus").find("option:selected").text());
	$("#serveiceName").val($("#eclevel").find("option:selected").text()+"＞"+$("#ecstatus").find("option:selected").text());
	sendPriceUnEdit();
	resPriceUnEdit();
	
	//加载表格
	createLeftTable();
	
	$("#eclevel").change(function(){
		createLeftTable();
	});
	$("#ecstatus").change(function(){
		createLeftTable();
	});
});


function timeconfig(){
	$('#sendtimebefore,#sendtimeend,#receivetimebefore,#receivetimeend').datetimepicker({
		
		timeFormat:"HH:mm:ss",
		dateFormat:"yy/mm/dd"
		
	});
}

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
					    "ajax" : "../../../modules/appService/priceManagement/demo-datatables-data.txt",
						
						"pagingType": "full_numbers",//分页 有first last
						"columns" : [

								{
									"title" : "时长（月）",
									"data" : "eventname",
									"name" : "event.eventname",
									"visible" : true,
									"orderable" : true
								},
								{
									"title" : "普通价格（元）",
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
									"title" : "促销时间",
									"data" : "scene",
									"name" : "event.scene",
									"visible" : true,
									"orderable" : true
									
								},{
									"title" : "促销价格（元）",
									"data" : "stopdesc",
									"name" : "event.stopdesc",
									"visible" : true,
									"orderable" : false
								},
								{
									"title" : "操作",
									"data" : "id",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
										var operBtn = '<button class=" btn-sm btn btn-warning " title="价格设置" onclick="updatePriceById(\''
											+ full.eventname + '\',\''
											+ full.id + '\',\''+ full.workflowinstid + '\',\'' + full.workflowid + '\',\'' 
												+ '\');">价格设置</button>';
										return operBtn;
									}
								} ],
						"order" : [ [ 1, "desc" ] ]

					});
}

function updatePriceById(){
	location.href="../../../modules/appService/priceManagement/priceUpdate.html";
}

//发单价格  修改按钮  点击事件
$("#updSendPrice").click(function(){
	sendPriceEdit();
	$("#updSendPrice").hide();
	$("#saveSendPrice").show();
});

//发单价格  保存按钮  点击事件
$("#saveSendPrice").click(function(){
	sendPriceUnEdit();
	$("#updSendPrice").show();
	$("#saveSendPrice").hide();
});

//接单价格  修改按钮  点击事件
$("#updResPrice").click(function(){
	resPriceEdit();
	$("#updResPrice").hide();
	$("#saveResPrice").show();
});

//接单价格  保存按钮  点击事件
$("#saveResPrice").click(function(){
	resPriceUnEdit();
	$("#updResPrice").show();
	$("#saveResPrice").hide();
});



function sendPriceUnEdit()
{
	$("#sendSerName").attr("disabled",'false');
	$("#sendPrice").attr("disabled",'false');
	$("#sendtimebefore").attr("disabled",'false');
	$("#sendtimeend").attr("disabled",'false');
	$("#sendSalesPrice").attr("disabled",'false');
}

function sendPriceEdit()
{
	$("#sendPrice").removeAttr("disabled");
	$("#sendtimebefore").removeAttr("disabled");
	$("#sendtimeend").removeAttr("disabled");
	$("#sendSalesPrice").removeAttr("disabled");
}

function resPriceUnEdit()
{
	$("#serveiceName").attr("disabled",'false');
	$("#resPrice").attr("disabled",'false');
	$("#receivetimebefore").attr("disabled",'false');
	$("#receivetimeend").attr("disabled",'false');
	$("#recSalesPrice").attr("disabled",'false');
}

function resPriceEdit()
{
	$("#resPrice").removeAttr("disabled");
	$("#receivetimebefore").removeAttr("disabled");
	$("#receivetimeend").removeAttr("disabled");
	$("#recSalesPrice").removeAttr("disabled");
}


		
		
		
		
		
		
		
		
		
