/**
 * 会员信息查询
 * 
 * @author LIJIAYIN
 * @version 1.1
 */
var userTable;
var userTableUrl = "usersManagement.json";


$(function() {
	
	// 加载表格
	createUserTable();
	//全选
	$("#chkAll").checkAll("#userTable");
	
//	$("#new").click(function() {
//		Addinit();
//	});
//	$("#userStatus").change(function(){
//	    createUserTable();
//	});
//	$("#forbiddenFunc").change(function(){
//		createUserTable();
//	});
//	$("#userLevel").change(function(){
//		createUserTable();
//	});
//	$("#btnSearchName").change(function(){
//		createUserTable();
//	});
});

/**
 * 创建表格
 * 
 * @param data
 * @returns
 */
function createUserTable() {
	 userTable=$('#userTable')
//	 .dataTable(
	 .dataTables_userDef(
					{
						/*"ajax" : {
							"url" : userTableUrl,
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
						"ajax":userTableUrl,
						"columns" : [
								{
									"title" : "<input id='chkAll' type='checkbox'/>",
									"data" : "userId",
									"name" : "userId",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, row, meta){
										if (type == 'display') {				
											return  '<input type="checkbox" id="'+row.userId+'" />';
										}
										return '';
				
									}
								},
								{
									"title" : "会员名",
									"data" : "userName",
									"name" : "userName",
									"visible" : true,
									"orderable" : true,
								},
								{
									"title" : "用户状态",
									"data" : "userStatus",
									"name" : "userStatus",
									"visible" : true,
									"orderable" : true,
									"render" : function(data, type, full, meta) {
										var userStatusHtml;
										if(data===1){
											commentStatusHtml='<span title="会员状态">正常</span>';
										}else if(data===2){
											commentStatusHtml='<span title="会员状态">锁定</span>';
										}else{
											commentStatusHtml='<span title="会员状态">注销</span>';
										}
										return commentStatusHtml;
									}
								},
//								{
//									"title" : "认证信息",
//									"data" : "authInfo",
//									"name" : "authInfo",
//									"visible" : true,
//									"orderable" : true
//								},

								{
									"title" : "账户余额(元）",
									"data" : "accountBalance",
									"name" : "accountBalance",
									"visible" : true,
									"orderable" : true,
									"render" : function(data, type, full, meta) {
										var operBtn = '<span title="可用余额" class=" ">可用：'+data.useable+'</span><br/>';
										operBtn += '<span title="冻结" class="">冻结：'+data.blocked+'</span>&nbsp;&nbsp;';
										if (data.blocked!==0){
											operBtn+='<a title="解冻" href="" style="color:red;">解冻</a>';
										}
										return operBtn;
									}
								},
								
								{
									"title" : "金币",
									"data" : "myGold",
									"name" : "myGold",
									"visible" : true,
									"orderable" : true
								},
//								{
//									"title" : "会员级别",
//									"data" : "userLevel",
//									"name" : "userLevel",
//									"visible" : true,
//									"orderable" : true
//								},
								{
									"title" : "诚信值",
									"data" : "trustScore",
									"name" : "trustScore",
									"visible" : true,
									"orderable" : true,
									"render" : function(data, type, full, meta) {
										var operBtn = '<span title="服务者诚信值" class=" ">服务者诚信值：'+data.serviceTrust+'</span><br/>';
										operBtn += '<span title="需求者诚信值" class="">需求者诚信值：'+data.requireTrust+'</span>&nbsp;&nbsp;';
										return operBtn;
									}
								},
								{
									"title" : "操作",
									"data" : "userId",
									"visible" : true,
									"orderable" : false,
									"render" : function(data, type, full, meta) {
//										var operBtn = '<a title="修改" class="edit editBtn btn btn-sm btn-warning">修改</a>&nbsp;&nbsp;';
										var operBtn = '<a title="删除" class="delete deleteBtn btn btn-sm btn-danger"  onclick="deleteUserById(\''
												+ data
												+ '\');">删除</a>';
										operBtn += '<a title="查看" class="queryBtn btn btn-sm btn-info" href="queryUserDetail.html">查看</a>';
										return operBtn;
									}
								} 
						],
						"order" : [ [ 2, "desc" ] ]
					});
}

////删除弹出框
$('body').on('click', '.deleteBtn', function() {
	layer.confirm('确定要删除该会员吗？')
//	{
//	//默认  确定取消
//	}, function(index){
//			
//			var url = "/users/deleteUserInfo";
//			$.ajax({
//				type : "post",
//				dataType : 'json',
//				url : url,
//				data : {
//					"id" : id
//				},
//				success : function(data) {
//
////					userTable = $('#userTable').dataTable().api();
////					userTable.ajax.url(refresh).load(null, false);
//				},
//				error : function(){
//					layer.msg('删除失败', {
//						time: 2000, //20s后自动关闭
//					  });
//				}
//			});
//			//关闭
////			layer.close(index);
//	})		
});


/**
 * 删除会员
 * 
 * @param objId
 */
//function deleteUserById(id){
//	layer.confirm('确定要删除该会员吗？', {
//	//默认  确定取消
//	}, function(index){
//			
//			var url = "/users/deleteUserInfo";
//			$.ajax({
//				type : "post",
//				dataType : 'json',
//				url : url,
//				data : {
//					"id" : id
//				},
//				success : function(data) {
//
//					userTable = $('#userTable').dataTable().api();
//					userTable.ajax.url(refresh).load(null, false);
//				},
//				error : function(){
//					layer.msg('删除失败', {
//						time: 2000, //20s后自动关闭
//					  });
//				}
//			});
//			//关闭
//			layer.close(index);
//		});
//
//}

/**
   * 查询会员信息
   */
//function queryUserDetailsById(id) {
//	if ("null" != id || id != null || "" != id) {
//		$.ajax({
//			type : "POST",
//			dataType : 'json',
//			data : {
//				"id" : id
//			},
//			url : "/users/queryUsersInfo",
//			success : function(data) {
//				addOrUpdateState="update";
//				$("#id").val(data.data.id);
//				$("#principal").val(data.data.principal);
//				
//				$("#linkman").val(data.data.linkman);
//				
//				$("#lgtd").val(data.data.lgtd);
//				$("#lttd").val(data.data.lttd);
//				
//				$("#linktel").val(data.data.linktel);
//				
//				$("#fax").val(data.data.fax);
//				$("#dutytel").val(data.data.dutytel);
//					
//				$("#voutreachsite").val(data.data.siteid);
//				
//				$('#outreachsite').select2().select2('val',data.data.siteid);
//				
//				$("#email").val(data.data.email);
//				$("#jobs").val(data.data.jobs);
//				$("#company").val(data.data.company);
//				$("#vcompany").val(data.data.company);
//				$("#con").val(data.data.con);
//				$("#ext1").val(data.data.ext1);
//				$("#ext2").val(data.data.ext2);
//				$("#addOrEdit").html("<i class='glyphicon glyphicon-edit'></i>修改");
//
//				$('#leftmodel').modal('toggle');
//			}
//		});
//	} else {
//		$('#leftmodel').modal('toggle');
//	}
//}
//
/**
   * 修改会员信息
   * 
 * @returns {Boolean}
   */
//function updateUserInfoById(){
//	var company = $("#company").val().replace(/(^\s*)|(\s*$)/g, "");
//	var outreachsite=$("#outreachsite").val();
//	var lttd=$("#lttd").val();
//	var lgtd=$("#lgtd").val();
//	if(isNaN(lgtd)){
//		layer.msg('经度请输入正确格式', {
//			time: 2500 //20s后自动关闭
//		});
//		$("#lgtd").focus();
//		return;
//	}
//	if(isNaN(lttd)){
//		layer.msg('纬度请输入正确格式', {
//			time: 2500 //20s后自动关闭
//		});
//		$("#lttd").focus();
//		return;
//	}
//	
//	if (company == null || company == "") {
//		layer.msg('单位名称不允许为空', {
//			time: 2500 //20s后自动关闭
//		});
//		$("#company").focus();
//		return;
//	}if (company.length > 99) {
//		layer.msg('单位名称字符过长,请重新输入!', {
//			time: 2500 //20s后自动关闭
//		});
//		$("#company").focus();
//		return;
//	}
//	var dutytel=$("#dutytel").val();
//	var patrn = /^((\+?86)|(\(\+86\)))?\d{3,4}-\d{7,8}(-\d{3,4})?$|^((\+?86)|(\(\+86\)))?1\d{10}$|^\d{5}$|^\d{8}$/;
//	 if(!patrn.test(dutytel)){
//		 layer.msg('单位电话格式不正确,请输入十一位手机号或五位短号或八位座机号', {
//				time: 3000
//				});	
//		 return ;
//	    }
//	 
//	 var fax=$("#fax").val();
//		var fax_check = /^(\d{3,4}-)?\d{7,8}$/;
//		if(fax != "" && !fax_check.test(fax)){
//			 layer.msg('传真格式为:XXX-12345678或XXXX-1234567或XXXX-12345678', {
//					time: 3000
//					});	
//			
//			return ;
//		}
//	 var email=$("#email").val();
//		var email_check = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//		if(email != "" && !email_check.test(email)){
//			 layer.msg('邮箱不符合规则,请重新输入!', {
//					time: 3000
//					});	
//			
//			return ;
//		}
//	if (outreachsite==null || outreachsite == "") {
//		
//		layer.msg('请选择厂站', {
//			time: 2500 //20s后自动关闭
//			
//		});
//		return;
//	}else{
//		$.ajax({
//			type : "POST",
//			dataType : 'json',
//			data : {
//				"siteId" : $("#siteid").val(),
//				"name" : name
//			},
//			url : "../../outreach/isCheckName.action",
//			success : function(data) {
//				var vcompany = $("#vcompany").val().replace(/(^\s*)|(\s*$)/g, "");
//				if(name==vcompany && addOrUpdateState=="update"){
//					data=true;
//				}
//				if(data == false){
//					layer.msg('已存在该单位名称', {
//						time: 2500, //毫秒
//					});
//				}
//				if(data==true){
//					$("#PubToForm").attr("action","../../outreach/addorupdateoutreach.action");
//					// 提交表单
//					$('#PubToForm').ajaxForm({
//								success : function(data) {
//									$('#leftmodel').modal('hide');
//									var left_Table = $('#leftTable').dataTable().api();
//									left_Table.ajax.url(refresh).load(null, false);
//								},
//								error : function(data, e) {
//									layer.msg('信息录入失败,请重新检查', {
//										time: 1500, //毫秒
//									});
//									//$('#leftmodel').modal('hide');
//								}
//							});
//					$('#PubToForm').submit();
//				}
//			}
//		});
//	}
//}
