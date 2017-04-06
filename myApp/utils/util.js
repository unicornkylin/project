function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function postReq(url,data,cb){
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {'Content-Type': 'application/x-www-form-urlencoded' //POST 方法使用
              },
      success: function(res){
        return typeof cb == "function" && cb(res)
      },
      fail: function(){
        return typeof cb == "function" && cb(false)
      }
    })
}

function getReq(url,data,cb) {
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      header: {'content-type': 'application/json'   //GET 方法使用
              },
      success: function(res){
        return typeof cb == "function" && cb(res)
      },
      fail: function(){
        return typeof cb == "function" && cb(false)
      }
    })
}

// 去前后空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 提示错误信息
function isError(msg, that) {
  that.setData({
    showTopTips: true,
    errorMsg: msg
  })
}

// 清空错误信息
function clearError(that) {
  that.setData({
    showTopTips: false,
    errorMsg: ""
  })
}

function showMsgBox( msg){

  wx.showModal({
      title: '错误',
      content:msg,

  })
}

module.exports = {
  formatTime: formatTime,
  showMsgBox:showMsgBox,
  postReq:postReq,
  getReq:getReq
}
