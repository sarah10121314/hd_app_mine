//
var id,type;
$(function(){
    //var data = $.getUrlParam(window.location.href);
    id=getUrlParam("id");
    type=getUrlParam("type");
    //alert(id+","+type);
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
                var json=js;
                // var json=JSON.parse(js);
                //$("#d_orderNumber").
                $("#orderNumber").val(json.data.orderNumber);
                $("#orderType").val(type=="0"?"家政":"货运");
                $("#orderCreateDate").val(json["data"].orderCreateDate);
                $("#payer").val(json["data"].payer);
                $("#phone").val(json["data"].phone);
                $("#price").val(json["data"].price);
                $("#orderTaker").val(json["data"].orderTaker);
                $("#orderTakeDate").val(json["data"].orderTakeDate);
                $("#address").val(json["data"].address);
                $("#orderStatus").val(json.data.status);
                if(type=="1"){
                    $("div.travel").css('display','block');
                    $("#vehicleInfo").val(json.data.vehicleInfo);
                    $("#departure").val(json.data.departure);
                    $("#destination").val(json.data.destination);
                    $("#goodsInfo").val(json.data.goodsInfo);
                    $("#goodsRemark").val(json.data.goodsRemark);
                }
                if(json["data"].status!="1"&&json["data"].status!="2"){
                    $("#orderFinishDate").val(json["data"].orderFinishDate);
                }
                else{
                    $("#orderDetail_payInfo").css('display','block');
                    $("#finish_date").html("完成时间");
                    $("#orderFinishDate").val(json["data"].orderFinishDate);
                    $("div.pay").display="block";
                    $("#payType").val(json.data.payType);
                    $("#payId").val(json.data.payId);
                    $("#cusComment").val(json.data.cusComment);
                    $("#busComment").val(json.data.busComment);
                }
            }
        });
    } else {
        $('#leftmodel').modal('toggle');
    }
}