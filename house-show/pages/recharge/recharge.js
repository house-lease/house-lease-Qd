var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
// pages/recharge/recharge.js
var app = getApp();
// 请求路径  需要改路径请在app.js中修改
var liunxUrl=app.globalData.liunxUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    money:""
  },
  inputSetData:function(e){
    this.data.money=e.detail.value
  }
  ,
buttonClick:function(){
  wx.showModal({
    title: '充值提醒',
    content: '是否确定充值',
    success: res=> {
      if (res.confirm) {
        wx.showLoading({
          title: '充值中',
          mask: true,
        })
        wx.request({
          url: liunxUrl+'house/particular/save', 
          data: {
            userId:app.globalData.userInfo.id,
            money:this.data.money
          },
          success:res=>{
            wx.hideLoading({
              complete: (res) => {},
            })
            if(res.data.data!=null){
                if(res.data.data==0){
                  wx.showToast({
                    title: '充值成功',
                     duration: 2000
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      complete: (res) => {
                      }
                    })
                  }, 2000)    
                }
            }else{
              wx.showToast({
                title: '充值失败',
                  image:"/pages/image/jg.png",
                 duration: 2000
              })
            }
          }
      })
      }
    }
  })
  
},

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
    // 获取用户
    this.data.user=app.globalData.userInfo;
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