var lefttable,section,url_type;
var search_type;

$(function(){
    chooseTime();
    initSearchInfo();
    createLeftTable();
});

/**
 * 初始化日历控件，显示秒
 */
function chooseTime(){
    $('.date').datetimepicker({
        timeFormat:"HH:mm:ss",
        dateFormat:"yy/mm/dd"
    });
}

/**
 * 获取搜索栏的筛选条件
 */
function initSearchInfo(){
    $("#search_finishDate").blur(function (){
        datejudge1();
    });
    $("#search_startDate").blur(function (){
        datejudge2();
    });
    $("#searchKey_orderNumber").blur(function (){
        createLeftTable()
    });
    $("#searchkey_taker").blur(function (){
        createLeftTable()
    });
    $("#searchkey_payer").blur(function (){
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
                    "startDate" : $("#search_startDate").val(),
                    "finishDate" : $("#search_finishDate").val(),
                    "destination":$("#search_destination").val(),
                    "departure":$("#search_departure").val(),
                    "pageSize":5,
                    "pageNum":1
                } );
            }
        },
        */
        //"data":data,
        "ajax":"travel1.txt",
        "pagingType": "full_numbers",//分页 有first last
        "columns" : [

            {
                "title" : "行程单号",
                "data" : "TravelId",
                "name" : "TravelId",
                "visible" : true,
                "orderable" : true,
            },{
                "title" : "发布人",
                "data" : "publisher",
                "name" : "publisher",
                "visible" : true,
                "orderable" : true
            },
            {
                "title" : "可装货物",
                "data" : "ableGoods",
                "name" : "ableGoods",
                "visible" : true,
                "orderable" : true
            },

            {
                "title" : "禁装货物",
                "data" : "unableGoods",
                "name" : "unableGoods",
                "visible" : true,
                "orderable" : true
            },

            {
                "title" : "出车时间",
                "data" : "startingDate",
                "name" : "startingDate",
                "visible" : true,
                "orderable" : true
            },{
                "title" : "始发地",
                "data" : "departure",
                "name" : "departure",
                "visible" : true,
                "orderable" : true
            },{
                "title" : "终点",
                "data" : "destination",
                "name" : "destination",
                "visible" : true,
                "orderable" : true
            },{
                "title" : "载重量",
                "data" : "maxLoad",
                "name" : "maxLoad",
                "visible" : true,
                "orderable" : true
            },
            {
                "title" : "操作",
                "data" : "TravelId",
                "visible" : true,
                "orderable" : false,
                "render" : function(data, type, row, meta) {
                    var operBtn = '<button type="button"  class="btn btn-sm btn-warning "  title="编辑" onclick="openTravelUpdate(\''
                        + data+ '\');">修改</button>';
                    operBtn += '<button type="button"  class="btn btn-sm btn-primary"  title="查看版本历史" onclick="openTravelDetail1(\''
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

function openTravelUpdate(id){
    window.location.href = "updateTravel.html?id="+id;
}

function openTravelDetail1(id){
    $("#section").css('display','none');
    $("#travel_detail").css('display','block');
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
            url: "travelDetail.txt",
            success: function (js) {
                var json=js.data.freightDetail;
                // var json=JSON.parse(js);
                //$("#d_orderNumber").
                $("#d_TravelId").html(json.TravelId);
                $("#d_publisher").html(json.publisher);
                $("#d_startingDate").html(json.startingDate);
                switch(json.vehicleStatus){
                    case "0":
                        $("#d_vehicleStatus").html("正常");
                        break;
                    case "1":
                        $("#d_vehicleStatus").html("下线");
                        break;
                    case "2":
                        $("#d_vehicleStatus").html("过期");
                        break;
                    case "3":
                        $("#d_vehicleStatus").html("已删除");
                        break;
                    case "4":
                        $("#d_vehicleStatus").html("已禁止");
                        break;
                    default:
                        $("#d_vehicleStatus").html("非法状态");
                        break;
                }
                $("#d_phone").html(json.phone);
                var location=json.wayLocation,locastr="--";
                for(var key in location){
                    locastr+=location[key]+"--";
                }
                $("#d_wayLocation").html(locastr);
                $("#d_vehicleInfo").html(json.vehicleInfo);
                $("#d_heightLimit").html(json.heightLimit);
                $("#d_ableGoods").html(json.ableGoods);
                $("#d_unableGoods").html(json.unableGoods);
                $("#d_maxLoad").html(json.maxLoad);
                $("#d_remarks").html(json.remarks);
            }
        });
    } else {
        $('#leftmodel').modal('toggle');
    }
}