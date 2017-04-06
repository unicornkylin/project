Page({
  data:{
    name:"第一个测试者",
    country: [
      {name: 'USA', value: '美国'},
      {name: 'CHN', value: '中国', checked: 'true'},
      {name: 'BRA', value: '巴西'},
      {name: 'JPN', value: '日本'},
      {name: 'ENG', value: '英国'},
      {name: 'TUR', value: '法国'},
    ]
  },

  subFn:function(e){
    console.log("提交表单", e.detail.value)
  },
  resetFn:function(){
    console.log("click reset")
  },

  onLoad:function(options){
    // 生命周期函数--监听页面加载
    String2
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    String3
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    String4
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    String5
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    String6
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    String7
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    String8
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})