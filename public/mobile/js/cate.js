$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false,
  });

  renderSlider(function (data) {
    $('.lt_left').html(template('cate_slide',{model:{list:data,currId:0}})).find('li:first-child').trigger('tap');
    $('.loading').hide();
  })
  $('.lt_left').on('tap','li',function(e){
    var parentId = e.target.dataset['id'];
    var title = e.target.innerHTML;
    $('.lt_left').html(template('cate_slide',{model:{list:Window.slideData,currId:parentId}}));

    renderContent(parentId,function(data){
      $('.lt_right').html(template('cate_content',{model:{list:data,title:title}}));
    });
  });


  function renderSlider(callback) {
    console.log(Window.slideData);
    if(Window.slideData){
      callback&&callback(Window.slideData);
    }
    $.ajax({
      type:'get',
      url:'/category/queryTopCategory',
      data:'',
      dataType:'json',
      success: function (data) {
        Window.slideData=data.rows;
        console.log(Window.slideData);
        callback && callback(Window.slideData);
      }
    });
  }
  function renderContent(parentId,callback) {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{id:parentId},
      dataType:'json',
      success: function (data) {
        callback && callback(data.rows);
      }
    });
  }
})