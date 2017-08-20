//
var id,type;
$(function(){
    //var data = $.getUrlParam(window.location.href);
    id=getUrlParam("id");
    type=getUrlParam("type");
    //alert(id+","+type);
    $(".offshelf").css('display','none');
    InitDetail();
    $("#update_submit").click(function(){
        submit();
    });//

});
//
/**
 *
 */
function submit(){
    $.ajax({
        type : "POST",
        dataType : 'json',
        data : {
            "id" : id,
            "price":$("#price").val(),
            "orderStatus":$("#orderStatus").val()
        },
        url : "/orderManagement/updateOrder.action",
        success:function(data){
            layer.confirm("修改成功！");
        },
        error:function(){
            layer.msg('修改失败!', {
                //十秒自动关闭
                time: 1500
            });
        }
    });
    type,$("#price").val(),$("#address").val(),$("#orderFinishDate").val(),$("#orderStatus").val();
    //货运修改参数
    $("#goodsRemark").val();
}

/**
 * 获取URL传递参数
 * @param name
 * @returns {null}
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function InitDetail() {
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
            success: function (js) {
                var status=["正常","禁止","已删除","已取消"];
                var json=data.data.service;
                $("#serviceName").html(json.serviceName);
                $("#serviceType").html(url_type);
                $("#serviceProvider").html(json.serviceProvider);
                $("#serviceStatus").html(status[json.serviceStatus]);
                if(json.serviceStatus=="3"){
                    $(".offshelf").css('display','block');
                    $("offshelfReason").html(json.offshelfReason);
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