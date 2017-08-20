$.fn.extend({
    dateTime:function(options){
        var defaults = {
            language:  'zh-CN',
            format: 'yyyy-mm-dd hh:ii',
            autoclose: true,
            todayBtn: true,
            weekStart: 1,
            todayHighlight: 1,
            startView: 2, //这里就设置了默认视图为年视图
            minView: 2, //设置最小视图为年视图
            forceParse: 0,
            pickerPosition: "bottom-left"
        }
        var options = $.extend(defaults,options);
        this.datetimepicker(options);
    },
	checkAll: function(el){
			this.click(function(){
			var checkAll = $(this).attr("checked");
			if(checkAll)
			{
				var checkboxList = $(el+ ' input');
				checkboxList.each(function(){
				  $(this).attr("checked",true);
			  }); 
			}
			else
			{
				var checkboxList = $(el+ ' input');
				checkboxList.each(function(){
				  $(this).attr("checked",false);
			  }); 
			}
		});
	}
	
})


