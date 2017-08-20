/**
 * DSIMS公共 javascript
 * @author YUXIN LI
 */

	/**
	 * 【获取URL请求参数】
	 */
	$.extend({
		getUrlVars: function(){
			var vars = [], hash;
			if(window.location.href.indexOf('?')!=-1){
		    	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		    	for(var i = 0; i < hashes.length; i++){
		    		hash = hashes[i].split('=');
		      		vars.push(hash[0]);
		      		vars[hash[0]] = hash[1];
		    	}
			}
	    	return vars;
	    },
	  	getUrlVar: function(name){
	    	return $.getUrlVars()[name];
	  	}
	});


	/**
	 * 【日期初始化】
	 * @param format
	 * @returns
	 */
	Date.prototype.format = function(format) {
	    /*
	     * format="yyyy-MM-dd hh:mm:ss";
	     */
	    var o = {
	        "M+" : this.getMonth() + 1,
	        "d+" : this.getDate(),
	        "h+" : this.getHours(),
	        "m+" : this.getMinutes(),
	        "s+" : this.getSeconds(),
	        "q+" : Math.floor((this.getMonth() + 3) / 3),
	        "S" : this.getMilliseconds()
	    };
	    if (/(y+)/.test(format)) {
	            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4- RegExp.$1.length));
	        }
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(format)){
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1? o[k]:("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return format;
	    
	};
	


	
	
/**
 *  《自定义全局公共库》 @author YUXIN LI
 */
	(
		function(){
			if(!window['webapi']){
				window['webapi']={};
			}

			/**
			 *  【获取HTTP完整路径】
			 */
			var getUrl=function(){
				var obj=window.location; 
				var contextPath=obj.pathname.split("/")[1]; 
				var basePath=obj.protocol+"//"+obj.host+"/"+contextPath+"/"; 
				return basePath; 
				//return window.location.href;
			}
			
			/**
			 * 【转化JSON日期格式】
			 */
			function toDate(objDate, format) {
			    return objDate.format(format);
			}
			
			
			window['webapi']['rooturl'] = getUrl;
			window['webapi']['toDate'] = toDate;
		}
	)();
		
