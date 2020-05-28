// 聊天室
// 192.168.0.106
var url = 'ws://182.92.168.223/house/wx';
// 182.92.168.223
const app = getApp();

// var utils = require('./util.js');

function connect(user,func) {
  let that = this
  wx.connectSocket({
    url: url,
    header:{'content-type': 'application/json','user':user.id},
    success: function () {
      console.log('信道连接成功~')
    },
    fail: function () {
      console.log('信道连接失败~')
    } 
  })
  wx.onSocketOpen(function (res) {
     //接受服务器消息
     wx.onSocketMessage(func);//func回调可以拿到服务器返回的数据
  });
  wx.onSocketError(function (res) {
  })  
}
//发送消息
function send(msg) {
  wx.sendSocketMessage({ 
    data: msg 
  });
}
module.exports = {
  connect: connect,
  send: send
}