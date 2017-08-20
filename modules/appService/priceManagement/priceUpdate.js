var timeend=new Date();
var timebefore=moment(timeend).add("month",-1);
$("#saletimeend").val(moment(timeend).format("YYYY/MM/DD HH:mm:ss"));
$("#saletimebefore").val(moment(timebefore).format("YYYY/MM/DD HH:mm:ss"));

$(function(){
	
	timeconfig();
});

function timeconfig(){
	$('#saletimeend,#saletimebefore').datetimepicker({
		
		timeFormat:"HH:mm:ss",
		dateFormat:"yy/mm/dd"
		
	});
}

//提交按钮点击事件
$("#updatePrice").click(function(){
	location.href="../../../modules/appService/priceManagement/priceManagement.html";
});