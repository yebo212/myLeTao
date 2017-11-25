$(function () {
  //初始化搜索框
  $(".txt_search")[0].value="";
  //给主题部分填充内容
  $(".lt_history").html(template("searchTpl",{model:getSearchData()}));
  //绑定点击事件
  $("body").on("tap",".btn_search",function () {
    //获取搜索框中的内容
    var key=$.trim($(".txt_search").val());
    //如果搜索框中什么都没有或者是空字符串的话就什么都不执行
    if(!key){
      //mui的提示功能
      mui.toast('请输入关键字');
      return false;
    }
    addSearchData(key);
    $(".lt_history").html(template("searchTpl",{model:getSearchData()}));
    $(".txt_search")[0].value="";
    window.location.href='searchList.html'+"?"+"key="+key;
    return false;
  }).on("tap",".fa-trash",function () {
    localStorage.clear();
    $(".lt_history").html(template("searchTpl",{model:getSearchData()}));
  }).on("tap",".fa-times",function () {
    removeSearchData($(this).parent().find('[data-key]').attr('data-key'));
    $(".lt_history").html(template("searchTpl",{model:getSearchData()}));
  }).on("tap","[data-key]",function () {
    window.location.href = 'searchList.html'+'?'+'key='+$(this).attr('data-key');
  })
})

//封装了一个获取本地历史记录数据的函数
function getSearchData(){
  return JSON.parse(localStorage.getItem('leTaoSearchHistory') || '[]');
};
//封装了一个添加本地历史记录数据的函数
function addSearchData(key) {
  var list=getSearchData();
  //一种遍历的写法- -
  /*var arr1 = [ "aaa", "bbb", "ccc" ];
   $.each(arr1, function(i,val){
   alert(i);
   alert(val);
   });*/
  $.each(list,function (i,item) {
    if(item==key){
      list.splice(i,1)
    }
  })
  list.push(key);
  if(list.length>10){
    list.splice(0,list.length-10);
  };
  //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
  localStorage.setItem('leTaoSearchHistory',JSON.stringify(list))
}
//封装了一个删除本地历史记录数据的函数
var removeSearchData = function(key){
  var list = getSearchData();
  $.each(list,function(i,item){
    if(item == key){
      list.splice(i,1);
    }
  });
  localStorage.setItem('leTaoSearchHistory',JSON.stringify(list));
};