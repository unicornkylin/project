//index.js
var util = require( '../../utils/util.js' )

function loginCallback(res){
  console.log(res);
  console.log("执行跳转函数");

  if( res.statusCode == 5 )
  {
    util.showMsgBox(res.data);
    return;
  }
  // wx.navigateTo({
  wx.switchTab({
    url: '../index/index',
    success: function(res){
      // success
      console.log("执行跳转函数成功");
    },
    fail: function() {
      // fail
      console.log("执行跳转函数失败");
    },
    complete: function() {
      // complete
    }
  })

  // wx.switchTab({
  //   url: '../index/index',
  //   success: function(res){
  //     // success
  //   },
  //   fail: function() {
  //     // fail
  //   },
  //   complete: function() {
  //     // complete
  //   }
  // })
}

//获取应用实例
var app = getApp()
Page({
 data:{
  userId:'',
  userPassword:'',
 },

 //加载完后，处理事件
 // 如果有本地数据，则直接显示
 onLoad:function(options){
  var that = this;
  //获取本地数据
  wx.getStorage({
   key: 'id',
   success: function(res){
    console.log(res.data);
    that.setData({id: res.data});
   }
  });
  wx.getStorage({
   key: 'userPassword',
   success: function(res){
    console.log(res.data);
    that.setData({userPassword: res.data});
   }
  });
 },
 onReady:function(){
  // 页面渲染完成
 },
 onShow:function(){
  // 页面显示
 },
 onHide:function(){
  // 页面隐藏
 },
 onUnload:function(){
  // 页面关闭
},

login:function(e){
 console.log(e.detail.value);//格式 Object {userName: "user", userPassword: "password"}

 //获得表单数据
 var objData = e.detail.value;

 // if(objData.userId && objData.userPassword){
 //  // 同步方式存储表单数据
 //  wx.setStorage({
 //   key:'userId',
 //   data:objData.id
 //  });
 //  wx.setStorage({
 //   key:'userPassword',
 //   data:objData.userPassword
 //  });
 //
 //  //跳转到成功页面
 //  navToSignup();
 // }
    if(objData.userId && objData.userPassword){
        util.postReq( 'http://127.0.0.1:5000/login/',
                      {
                        userId: objData.userId,
                        userPassword: objData.userPassword
                      },
                      loginCallback
       )
    }

},


})
