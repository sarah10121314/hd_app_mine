var lefttable,url_type,start,finish;
var search_type,status=["233333"];
var stat1=["正常","禁止","已删除","已取消"];
$(function(){
    initSearchInfo();
    serviceType_confirm();
    createLeftTable();
    chooseTime();
});

/**
 * 初始化日历控件，显示秒
 */
function chooseTime(){
    $('.test').datetimepicker({
        timeFormat:"HH:mm:ss",
        dateFormat:"yy/mm/dd"
    });
}


/**
 * 获取搜索栏的筛选条件
 */
function initSearchInfo(){
    search_type=$("#search_serviceType");
    $("#search_serviceType").bind("change",function (){
        serviceType_confirm();
        createLeftTable();
    });
    $("#search_serviceStatus").bind("change",function (){
        createLeftTable();
    });
    $("#search_startDate").blur(function (){
        datejudge2();
    });
    $("#search_finishDate").blur(function (){
        datejudge1();
    });
    $("#search_serviceName").blur(function (){
        createLeftTable();
    });
}

/**
 * 时间选择器-规范
 */
function datejudge1(){
    var start=$("#search_startDate").val();
    var finish=$("#search_finishDate").val();
    if(finish!=null&&finish!=""){
        if(start!=null&&start!="")
        {
            start=start.replace(/-/g,"/");
            finish=finish.replace(/-/g,"/");
            var stdate=new Date(start),fidate=new Date(finish);
            if(fidate<stdate){
                $("#startDatefb").html("开始时间不能大于结束时间！");
            }else{
                $("#startDatefb").html("");
                createLeftTable();
            }
        }
        else{
            $("#startDatefb").html("请输入开始时间！");
        }
    }
}

function datejudge2(){
    var start=$("#search_startDate").val();
    var finish=$("#search_finishDate").val();
    if(start!=null&&start!=""){
        $("#startDatefb").html("");
        if(finish!=null&&finish!=""){
            start=dateConvert(start);
            finish=dateConvert(finish);
           // var stdate=new Date(start),fidate=new Date(finish);
            if(fidate<stdate){
                $("#startDatefb").html("开始时间不能大于结束时间！");
            }else{
                $("#startDatefb").html("");
                createLeftTable();
            }
        }
    }
}

/**
 * 日期字符串转换为日期对象
 */
function dateConvert(str){
    return new Date(str.replace(/-/g,"/"));
}

/**
 * 根据订单的类型判断接口
 */
function serviceType_confirm(){
    search_type=$("#search_serviceType").val();
    switch(search_type){
        case "0":
            url_type="家政";
            break;
        case "1":
            url_type="货运";
            break;
        case "2":
            url_type="共享工具";
            break;
        case "3":
            url_type="钱找项目";
            break;
        default:
            break;
    }
}

/**
 * @function 将时间戳转化为日+小时+分+秒
 * @param {Date} 时间戳
 * @return {String} 时间字符串
 */
function timeConvert(longTime) {
    //转化为 日+小时+分+秒
    var time = parseFloat(longTime/1000);
    if (time != null && time != ""){
        if (time < 60) {
            var s = time;
            time = s + '秒';
        } else if (time > 60 && time < 3600) {
            var m = parseInt(time / 60);
            var s = parseInt(time % 60);
            time = m + "分钟" + s + "秒";
        } else if (time >= 3600 && time < 86400) {
            var h = parseInt(time / 3600);
            var m = parseInt(time % 3600 / 60);
            var s = parseInt(time % 3600 % 60 % 60);
            time = h + "小时" + m + "分钟" + s + "秒";
        } else if (time >= 86400) {
            var d = parseInt(time / 86400);
            var h = parseInt(time % 86400 / 3600);
            var m = parseInt(time % 86400 % 3600 / 60)
            var s = parseInt(time % 86400 % 3600 % 60 % 60);
            time = d + '天' + h + "小时" + m + "分钟" + s + "秒";
        }
    }
    return time;
}

/**
 * 创建表格
 *
 * @param data
 * @returns
 */
function createLeftTable() {
    // $('#leftTable').dataTable.dataTables_userDef
    serviceType_confirm();
    lefttable=$('#leftTable').dataTables_userDef({
        /*"ajax" : {
            "url" : orderManagement/getOrderList,
            "type" : "POST",
            "data": function (data) {
                return $.extend( {}, data, {
                    "serviceType" : $("#orderType").val(),
                    "orderNumber" : $("#searchKey_orderNumber").val(),
                    "orderStartDate":$("#search_startDate").val(),
                    "orderFinishDate":$("#search_finishDate").val(),
                    "orderStatus":$("#orderStatus").val(),
                    "payer":$("#searchKey_payer").val(),
                    "orderTaker":$("#searchKey_taker").val(),
                    "pageSize":5,
                    "pageNum":1
                } );
            }
        },
        */
        "ajax":{
            "type": "GET",
            "url": "json_serviceList.txt",
            "data":function(data){
                //alert(data)
                return data.data;
            }
        },
        //"ajax" : "json_order.txt",
        "pagingType": "full_numbers",//分页 有first last
        "columns" : [

            {
                "title" : "服务项目",
                "data" : "serviceName",
                "name" : "serviceName",
                "visible" : true,
                "orderable" : true,
            },{
                "title" : "用户",
                "data" : "serviceProvider",
                "name" : "serviceProvider",
                "visible" : true,
                "orderable" : true
            },
            {
                "title" : "服务类型",
                "data" : null,
                "name" : "serviceType",
                "visible" : true,
                "orderable" : true,
                "render" : function(data, type, row, meta) {
                    return url_type;
                }
            },

            {
                "title" : "服务状态",
                "data" : "serviceStatus",
                "name" : "serviceStatus",
                "visible" : true,
                "orderable" : true,
                "render":function(data,type,row,meta){
                    switch(data){
                        case "0":
                            return "正常";
                            break;
                        case "1":
                            return "禁止";
                            break;
                        case "2":
                            return "已删除";
                            break;
                        case "3":
                            return "已下架";
                            break;
                        default:
                            return "";
                    }
                }
            },

            {
                "title" : "服务开始时间",
                "data" : "serviceStartDate",
                "name" : "serviceStartDate",
                "visible" : true,
                "orderable" : true
            },{
                "title" : "服务结束时间",
                "data" : "serviceFinishDate",
                "name" : "serviceFinishDate",
                "visible" : true,
                "orderable" : true
            },{
                "title" : "剩余时间",
                "data" : null,
                "name" : "serviceRemainTime",
                "visible" : true,
                "orderable" : true,
                "render":function(data,type,row,meta){
                    return timeConvert(parseInt(dateConvert(row.serviceFinishDate)-dateConvert(row.serviceStartDate)));
                }
            },
            {
                "title" : "操作",
                "data" : "orderId",
                "visible" : true,
                "orderable" : false,
                "render" : function(data, type, row, meta) {
                    var operBtn = '<button type="button"  class="btn btn-sm btn-warning "  title="编辑" onclick="openServiceUpdate(\''
                        + data+ '\');">修改</button>';
                    operBtn += '<button type="button"  class="btn btn-sm btn-primary"  title="查看" onclick="openServiceDetail1(\''
                        + data + '\');">查看</button>';
                    operBtn += '<button type="button"  class="btn btn-sm btn-danger"  title="删除" onclick="isCheckDelService(\''
                        + data +
                        '\');">删除</button>';

                    return operBtn;
                }
            }],
        "order" : [ [ 2, "desc" ] ]

    });
}

function openServiceUpdate(id){
    window.location.href = "updateService.html?id="+id+"&type="+$("#search_serviceType").val();
}

function openServiceDetail1(id){
    $("#section").css('display','none');
    $("#service_detail").css('display','block');
    InitDetail(id);
}

/**
 * 删除注册服务
 * @param ids
 */
function isCheckDelService(ids){
    layer.confirm('是否删除？', {
        // 默认 确定取消
    }, function(index){
        layer.close(index);
    });
    // $.ajax({
    //     type : "post",
    //     dataType : 'json',
    //     url : "/orderManagement/deleteOrder.action",
    //     data : {
    //         "ids" : ids
    //     },
    //     success : function(data) {
    //
    //
    //         if(data.data=="false"){
    //             layer.msg('本预案已启动为事件,不可删除！', {
    //                 //十秒自动关闭
    //                 time: 3000
    //             });
    //             return false;
    //         }else{
    //             deleteRemove(ids);
    //             return true;
    //         }
    //
    //     },
    //     error : function(){
    //         layer.msg('删除失败!', {
    //             //十秒自动关闭
    //             time: 1500
    //         });
    //     }
    // });
}

/**
 * 加载服务单详细信息
 * @param id
 * @constructor
 */
function InitDetail(id) {
    if ("null" != id || id != null || "" != id) {
        // $.ajax({
        //     type : "POST",
        //     dataType : 'json',
        //
        //     data : {
        //         "id" : id
        //     },
        //     url : "../../outreach/getoutreachbyid.action",
        //     success : function(data) {
        //         addOrUpdateState="update";
        //         $("#id").val(data.data.id);
        //         $("#principal").val(data.data.principal);
        //
        //         $("#linkman").val(data.data.linkman);
        //
        //         $("#lgtd").val(data.data.lgtd);
        //         $("#lttd").val(data.data.lttd);
        //
        //         $("#linktel").val(data.data.linktel);
        //
        //         $("#fax").val(data.data.fax);
        //         $("#dutytel").val(data.data.dutytel);
        //
        //         $("#voutreachsite").val(data.data.siteid);
        //
        //         $('#outreachsite').select2().select2('val',data.data.siteid);
        //
        //         $("#email").val(data.data.email);
        //         $("#jobs").val(data.data.jobs);
        //         $("#company").val(data.data.company);
        //         $("#vcompany").val(data.data.company);
        //         $("#con").val(data.data.con);
        //         $("#ext1").val(data.data.ext1);
        //         $("#ext2").val(data.data.ext2);
        //         $("#addOrEdit").html("<i class='glyphicon glyphicon-edit'></i>修改");
        //
        //         $('#leftmodel').modal('toggle');
        //     }
        // });
        $.ajax({
            type: "GET",
            dataType:"json",
            url: "json_service.txt",
            success: function (data) {
                //var status=["正常","禁止","已删除","已取消"];
                for(var i=0;i<stat1.length;i++){
                    console.log(stat1[i]+","+i);
                }
               // console.log(status[0]);
                var json=data.data.service;
                $("#d_serviceName").html(json.serviceName);
                $("#d_serviceType").html(url_type);
                $("#d_serviceProvider").html(json.serviceProvider);
                $("#d_serviceStatus").html(stat1[json.serviceStatus-0]);
                if(json.serviceStatus=="3"){
                    $("#lb_offshelfReason").css('display','block');
                    $("#d_offshelfReason").css('display','block');
                    $("#d_offshelfReason").html(json.offshelfReason);
                }
                $("#d_serviceDuration").html(json.serviceStartDate+"-"+json.serviceFinishDate);
                $("#d_remainTime").html(timeConvert(parseInt(dateConvert(json.serviceFinishDate)-dateConvert(json.serviceStartDate))));
                switch(search_type){
                    case "0":
                        $("div.home").css('display','block');
                        $("#dh_serviceTags").html(json.serviceTags);
                        $("#dh_price").html(json.price+'<span class="sp_money">￥</span>');
                        $("#dh_registerPrice").html(json.registerPrice+'<span class="sp_money">￥</span>');
                        $("#dh_address").html(json.address);
                        $("#dh_phone").html(json.phone);
                        $("#dh_introduction").html(json.introduction);
                        break;
                    case "1":
                        $("div.freight").css('display','block');
                        $("#df_serviceTags").html(json.serviceTags);
                        $("#df_price").html(json.price+'<span class="sp_money">￥</span>');
                        $("#df_registerPrice").html(json.registerPrice+'<span class="sp_money">￥</span>');
                        $("#df_vehicleType").html(json.vehicleType);
                        $("#df_vehicleSpecify").html(json.vehicleSpecify);
                        $("#df_address").html(json.address);
                        $("#df_phone").html(json.phone);
                        break;
                    case "2":
                        $("div.toolsShare").css('display','block');
                        $("#dt_serviceTags").html(json.serviceTags);
                        $("#dt_price").html(json.price+'<span class="sp_money">￥</span>');
                        $("#dt_registerPrice").html(json.registerPrice+'<span class="sp_money">￥</span>');
                        $("#dt_number").html(json.number);
                        $("#dt_introduction").html(json.introduction);
                        $("#dt_address").html(json.address);
                        $("#dt_phone").html(json.phone);
                        break;
                    case "3":
                        $("div.moneyProject").css('display','block');
                        $("label.lb_price").html("融资：");
                        $("#dm_serviceTags").html(json.serviceTags);
                        $("#dm_price").html(json.price+'<span class="sp_money">￥</span>');
                        $("#dm_registerPrice").html(json.registerPrice+'<span class="sp_money">￥</span>');
                        $("#dt_introduction").html(json.introduction);
                        $("#dt_address").html(json.address);
                        $("#dt_phone").html(json.phone);
                        break;
                    default:
                        break;
                }
            }
        });
    } else {
        $('#leftmodel').modal('toggle');
    }
}



{
    "code": 0,
    "message": "",
    "data":
    {
        "Travel":
        [
            {
                "TravelId": "行程单号",
                "publisher": "发布人",
                "ableGoods": "可装货物",
                "unableGoods": "禁装货物",
                "startingDate": "出车时间",
                "departure": "始发点",
                "destination": "终点",
                "heightLimit":"限高",
                "vehicleInfo": ["车型","载重量"],
                "remarks": "备注",
                "phone": "电话",
                "wayLocation": [
                    "城市1","城市2","城市3"
                ]
            }
        ]
    }
}