// pages/personalCenter/personalCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_url:"",
    nickName:"",
     sex:"",
    user:{}
  },

  // 用户登录方法
  login:function(){
    var this_ = this;
    wx.getUserInfo({
          success:function(res){
         console.log(res.userInfo);
        // 更改初始化数据
        this_.setData({
          "nickName":res.userInfo.nickName,
          "image_url":res.userInfo.avatarUrl,
          "sex":res.userInfo.gender
        })
        // 调用授权登录的方法
         wx.login({
               success:function(res) {
                  var code = res.code;
                   if (code) {
                       // 如果code存在,拿着code向开发者服务器发送请求
                       wx.request({
                           url: 'http://localhost:8080/house/user/login',
                           method: 'POST',
                           header: { "content-type": "application/x-www-form-urlencoded"  },
                           data: { 
                              code: code ,
                              image_url: this_.data.image_url,
                              nickName:this_.data.nickName,
                              sex:this_.data.sex
                           },
                            success(responseData) {
                            console.info(responseData.data)
                            if (responseData.data.data!=null) {
                             // 表示登录成功
                              // >> 1、小程序客户端保存登录状态，即ticket
                             wx.setStorage({
                                key: "ticket",
                                data: responseData.data.data
                              })
                            wx.getStorage({
                              key: 'ticket',
                              success:function(res){
                                console.info(res.data)
                                  this_.setData({
                                    user:res.data
                                  })

                              }
                            })
                  
                                // >> 2、显示登录成功的信息
                              wx.showToast({
                                title: '登录成功',
                                 icon: 'success',
                                 duration: 2000
                              })
                               } else {
                                  // 登录失败
                                  // >> 1、移除已经保存的ticket
                                wx.removeStorage({
                                key: 'key'
                               })
                  
                                  // >> 2、显示登录失败信息
                                  wx.showToast({
                                    title: '登录失败',
                                    icon: 'none',
                                    duration: 2000
                                  })
                               }
                            }
                       })
                   }
               }
         })        
        }
    })  
  }
,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
// 获取用户是否登录
var this_=this;
wx.getStorage({
  key: 'ticket',
  success:function(res){
      this_.setData({
        user:res.data
      })
  }
})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})