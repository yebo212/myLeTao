$(function () {
  $(".txt_search")[0].value="";

  $("body").on("tap",".btn_search",function () {
    var arr = (ls.getItem("LT_his") && JSON.parse(ls.getItem("LT_his"))) || [];
    if(!$.trim($(".txt_search").val())){
      return false;
    }
    $(".lt_history .title").html('<span class="mui-pull-left">搜索历史</span> <span class="mui-pull-right fa fa-trash">清空记录</span>')

    $(".txt_search")[0].value="";
  });
})