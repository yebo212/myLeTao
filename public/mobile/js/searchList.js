// $(function () {
//   // 全局参数查询对象
//   var queryObj = {
//     proName: "",
//     brandId: "",
//     price: "",
//     num: "",
//     page: 1,
//     pageSize: 6
//   };
//   queryObj.proName = getURLParams("key");
//
//   // 总条数
//   var Count = 1;
//   mui('.mui-scroll-wrapper').scroll({
//     scrollY: true, //是否竖向滚动
//     scrollX: false, //是否横向滚动
//     startX: 0, //初始化时滚动至x
//     startY: 0, //初始化时滚动至y
//     indicators: false, //是否显示滚动条
//     deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
//     bounce: true//是否启用回弹
//   });
//   mui.init({
//     pullRefresh : {
//       container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
//       down : {
//         height:50,//可选,默认50.触发下拉刷新拖动距离,
//         auto: true,//可选,默认false.首次加载自动下拉刷新一次
//         contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
//         contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
//         contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
//         callback :function(){
//           setTimeout(function () {
//             queryObj.page=1;
//             queryProduct(function (e) {
//               console.log(e);
//               Count=e.count;
//               var html=template("listTpl",e);
//               $(".lt_list").html(html);
//               mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
//             })
//           },1000);
//         }
//       },
//       up : {
//         height:50,//可选.默认50.触发上拉加载拖动距离
//         auto:false,//可选,默认false.自动上拉加载一次
//         contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
//         contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
//         callback :function(){
//           setTimeout(function () {
//             mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
//           },1000);
//         }
//       }
//     }
//   });
//
//
//   //封装了一个获取URL上的参数的函数
//   function getURLParams(name) {
//     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) {
//       return unescape(r[2]);
//     }
//     return null;
//   }
//   // 封装了一个发送AJAX请求的函数
//   function queryProduct(callback) {
//     $.ajax({
//       url: "/product/queryProduct",
//       data: queryObj,
//       success: function (result) {
//         callback && callback(result);
//       }
//     });
//   }
// })
//


$(function () {
  // 全局参数查询对象
  var queryObj = {
    proName: "",
    brandId: "",
    price: "",
    num: "",
    page: 1,
    pageSize: 2
  };
  queryObj.proName = getURLParams("key");
  console.log(getURLParams("key"));
  var Count = 1;
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        height: 50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: function () {
          queryObj.page=1;
          setTimeout(function () {
            queryProduct(function (result) {
              Count = result.count;
              var html = template("listTpl", result);
              $(".lt_list").html(html);
              mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh(false);
              mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
            });
          }, 1000)
        }
      },
      up: {
        height: 50,//可选.默认50.触发上拉加载拖动距离
        auto: true,//可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {
          var totalPage = Math.ceil(Count / queryObj.pageSize);
          setTimeout(function () {
            // 判断
            if (queryObj.page < totalPage) {
              // 继续请求数据
              queryObj.page++;
              queryProduct(function (result) {
                var html = template("listTpl", result)
                $(".lt_list").append(html);
                // 有数据 传入 false  则无其他显示
                mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
              })
            } else {
              // 没有数据就传入 true  给出用户提示 没有数据了
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
            }
          }, 1000);

        }
      }
    }
  });

  function queryProduct(callback) {
    $.ajax({
      url: "/product/queryProduct",
      data: queryObj,
      success: function (result) {
        callback && callback(result);
      }
    });
  }
  function getURLParams(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    }
    return null;
  }
  $(".btn_search").on("tap", function () {
    var val = $(".txt_search").val();
    if (!$.trim(val)) {
      mui.toast("请输入关键字");
    } else {
      queryObj.proName = val;
      mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
    }
  })
  $(".lt_orderBar>a").on("tap", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(this).find(".fa").toggleClass("fa-chevron-down fa-chevron-up");
    var sort = -1;
    if ($(this).find(".fa").hasClass("fa-chevron-up")) {
      sort = 1;
    } else {
      sort = 2;
    }
    if ($(this).data("sortname") == "price") {
      queryObj.price = sort;
      queryObj.num = "";
    }
    if ($(this).data("sortname") == "num") {
      queryObj.num = sort;
      queryObj.price = "";
    }
    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
  })
})
