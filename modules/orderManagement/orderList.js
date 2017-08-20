var lefttable,order_list,order_detail,section,url_type;
var search_type;

$(function(){
    initSearchInfo();
    orderType_confirm();
    order_list=$("#order_list");
    section=$("#section");
    order_detail=$("#order_detail");
    createLeftTable();
    /**
     * 加载日期控件
     */
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
    search_type=$("#orderType");
    $("#orderType").bind("change",function (){
        createLeftTable()
    });
    $("#orderStatus").bind("change",function (){
        createLeftTable()
    });
    $("#search_startDate").blur(function (){
        datejudge2();
    });
    $("#search_finishDate").blur(function (){
        datejudge1();
    });
    $("#searchKey_orderNumber").blur(function (){
        createLeftTable()
    });
    $("#searchKey_taker").blur(function (){
        createLeftTable()
    });
    $("#searchKey_payer").blur(function (){
        createLeftTable()
    });
}

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
    }
}

/**
 * 根据订单的类型判断接口
 */
function orderType_confirm(){
    if(search_type.val()=="0"){
        url_type="家政";
    }else if(search_type.val()=="1"){
        url_type="货运";
    }
    else{
        url_type=null;
    }
}

/**
 * 创建表格
 *
 * @param data
 * @returns
 */
function createLeftTable() {
    // $('#leftTable').dataTable.dataTables_userDef
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
            "url": "json_order1.txt",
            "data":function(data){
                //alert(data)
                return data.data;
            }
        },
        //"ajax" : "json_order.txt",
        "pagingType": "full_numbers",//分页 有first last
        "columns" : [

            {
                "title" : "订单号",
                "data" : "ordernumber",
                "name" : "order.ordernumber",
                "visible" : true,
                "orderable" : true,
            },{
                "title" : "服务项目",
                "data" : "serviceName",
                "name" : "order.orderType",
                "visible" : true,
                "orderable" : true
            },
            {
                "title" : "服务类别",
                "data" : "serviceType",
                "name" : "order.serviceType",
                "visible" : true,
                "orderable" : true
            },

            {
                "title" : "下单人",
                "data" : "payer",
                "name" : " order.payer",
                "visible" : true,
                "orderable" : true
            },

            {
                "title" : "接单人",
                "data" : "orderTaker",
                "name" : "order.orderTaker",
                "visible" : true,
                "orderable" : true
            },{
                "title" : "状态",
                "data" : "orderStatus",
                "name" : "order.orderStatus",
                "visible" : true,
                "orderable" : true
            },{
                "title" : "金额",
                "data" : "price",
                "name" : "order.price",
                "visible" : true,
                "orderable" : true
            },{
                "title" : "下单时间",
                "data" : "orderCreateDate",
                "name" : "order.orderCreateDate",
                "visible" : true,
                "orderable" : true
            },{
                "title" : "接单时间",
                "data" : "orderTakeDate",
                "name" : "order.orderTakeDate",
                "visible" : true,
                "orderable" : true
            },{
                "title" : "地址",
                "data" : "address",
                "name" : "order.address",
                "visible" : true,
                "orderable" : true
            },
            {
                "title" : "操作",
                "data" : "orderId",
                "visible" : true,
                "orderable" : false,
                "render" : function(data, type, row, meta) {
                    var operBtn = '<button type="button"  class="btn btn-sm btn-warning "  title="编辑" onclick="openOrderUpdate(\''
                        + data+ '\');">修改</button>';
                    operBtn += '<button type="button"  class="btn btn-sm btn-primary"  title="查看" onclick="openOrderDetail1(\''
                        + data + '\');">查看</button>';
                    operBtn += '<button type="button"  class="btn btn-sm btn-danger"  title="删除" onclick="isCheckDelOrder(\''
                        + data +
                        '\');">删除</button>';

                    return operBtn;
                }
            }],
        "order" : [ [ 2, "desc" ] ]

    });
}

function openOrderUpdate(id){
    window.location.href = "updateOrder.html?id="+id+"&type="+search_type.val();
}

function openOrderDetail1(id){
    order_list.css('display','none');
    order_detail.css('display','block');
    section.css('display','none');
    InitDetail(id);
}

function isCheckDelOrder(ids){
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
            url: "json_orderDetail.txt",
            success: function (data) {
                var json=data.data.order;
                // var json=JSON.parse(js);
                //$("#d_orderNumber").
                $("#d_orderNumber").html(json.orderNumber);
                $("#d_orderType").html(search_type.val()=="0"?"家政":"货运");
                $("#d_orderCreateDate").html(json.orderCreateDate);
                $("#d_payer").html(json.payer);
                $("#d_phone").html(json.phone);
                $("#d_price").html(json.price);
                $("#d_orderTaker").html(json.orderTaker);
                $("#d_orderTakeDate").html(json.orderTakeDate);
                $("#d_address").html(json.address);
                if(search_type.val()=="1"){
                    $("div.d_freight").css('display','block');
                    $("#d_vehicle").html(json.vehicleInfo);
                    $("#d_departure").html(json.departure);
                    $("#d_destination").html(json.destination);
                    $("#d_goodsInfo").html(json.goodsInfo);
                    $("#d_goodsRemark").html(json.goodsRemark);
                }
                if(json.status!="1"&&json.status!="2"){
                    $("#d_orderFinishDate").html(json.orderFinishDate);
                }
                else{
                    $("#orderDetail_payInfo").css('display','block');
                    $("#d_predate").html("完成时间");
                    $("#d_orderFinishDate").html(json.orderFinishDate);
                    $("d_pay,d_comment").display="block";
                    $("#d_payType").html(json.payType);
                    $("#d_payId").html(json.payId);
                    $("#d_cusComment").html(json.cusComment);
                    $("#d_busComment").html(json.busComment);
                    $("#d_orderStatus").html(json.status);
                }
            }
        });
    } else {
        $('#leftmodel').modal('toggle');
    }
}