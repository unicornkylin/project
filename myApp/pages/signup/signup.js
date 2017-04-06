var util = require( '../../utils/util.js' )


function navToIndex(){
  console.log("执行跳转函数");
  wx.navigateTo({
    url: '../login/login',
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
  userName:'',
  userPassword:'',
  userPassword2:'',

  // array: ['美国', '中国', '巴西', '日本'],
  // index: 0,
  array:['请选择部门',],
  index: 0,
 },

 //加载完后，处理事件
 // 如果有本地数据，则直接显示
 onLoad:function(options){
 },
 onReady:function(){
  // 页面渲染完成
 var that = this
  wx.request({
      url: 'http://127.0.0.1:5000/signup/department', //仅为示例，并非真实的接口地址

      header: {
          'content-type': 'application/json'
      },
      success: function(res) {

        console.log(res.data)
        that.setData({array: that.data.array.concat( res.data)})
      },

      fail: function(res) {
        console.log(res.status);
      },

    })


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

///////////////////////////////////////////


bindPickerChange: function(e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

//焦点离开 userId 框后触发
userIdCheck: function(e) {
  var objData = e.detail.value;
  console.log(objData);
  wx.request({
    url: 'http://127.0.0.1:5000/signup/userid_check/', //仅为示例，并非真实的接口地址
    data: {
      userId: objData
    },
    method:'GET',     //默认为GET
    header: {
        'content-type': 'application/json'   //GET 方法使用
      //  'Content-Type': 'application/x-www-form-urlencoded' //POST 方法使用
    },
    success: function(res) {
      console.log(res.data)
        //跳转到成功页面
        // navToIndex();
        if(res.statusCode == 5){
            util.showMsgBox(res.data)
        }

    }
  })

},

userNameCheck: function(e) {
  var objData = e.detail.value;
  wx.request({
    url: 'http://127.0.0.1:5000/signup/username_check/',
    data: {
      userName: objData
    },
    method:'GET',     //默认为GET
    header: {
        'content-type': 'application/json'   //GET 方法使用
      //  'Content-Type': 'application/x-www-form-urlencoded' //POST 方法使用
    },
    success: function(res) {
      console.log(res.data)
        //跳转到成功页面
        // navToIndex();
        if(res.statusCode == 5){
            util.showMsgBox(res.data)
        }

    }
  })
},

signup: function(e){
  const self = this;

   console.log(e.detail.value);//格式 Object {userName: "user", userPassword: "password"}

 //获得表单数据
   var objData = e.detail.value;

   if ( objData.userId == '' | objData.userName == '') {

     util.showMsgBox("ID和用户名不能为空！");
     return;
   }

   if( parseInt(objData.userId) < 8700 | parseInt(objData.userId) > 9999  ){
      util.showMsgBox("工号错误，工号范应为[8700 -- 9999]！");
      return;
   }

   if( objData.userPassword == '' ){
     util.showMsgBox('密码不能为空！');

     return;
   }

   if (objData.userPassword != objData.userPassword2) {
    wx.showModal({
        title: '错误',
        content: '两次密码不一致，请重新输入！',
        success: function(res) {
          if (res.confirm) {
            self.setData( {userPassword: ""} );
            self.setData( {userPassword2:  ""} );
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
    })
    return
   }

   if(objData.userName && objData.userPassword){
     wx.showToast({
      title: '注册中',
      icon: 'loading',
      duration: 10000
    })

     wx.request({
       url: 'http://127.0.0.1:5000/signup/', //仅为示例，并非真实的接口地址
       data: {
         userId: objData.userId,
         userName: objData.userName,
         department: this.data.index,
         userPassword:objData.userPassword
       },
       method:'POST', //默认为 GET
       header: {
          //  'content-type': 'application/json'   //GET 方法使用
          'Content-Type': 'application/x-www-form-urlencoded' //POST 方法使用
       },
       success: function(res) {
         console.log(res.data)
           //跳转到成功页面
           // navToIndex();
           wx.hideLoading()

           wx.switchTab({
             url: '../index/index',
             success: function(res){
               // success
             },
             fail: function() {
               // fail
             },
             complete: function() {
               // complete
             }
           })

       }
     })

   }
},



})
