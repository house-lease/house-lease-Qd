// pages/like/likes.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    collect:[]
  },

  // 跳转登录页面
login:function(){
  wx.navigateTo({
    url: '',
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
    this.setData({
      user:app.globalData.userInfo
    })
    if(this.data.user.id!=null){
      this.houseShow();
    }
   
  },

  // 显示收藏房屋的方法
  houseShow:function(){
    var this_=this;
    this.setData({
      user:app.globalData.userInfo
    })
    // 定义一个函数：作用是查询所有的房屋信息，返回的结果是json格式
   wx.request({
     url: liunxUrl+'house/collect/queryInfoByUserId', 
     data: {
       userId:this_.data.user.id
     },
     success(res) {
       console.info(res.data);
       this_.setData({
         "collect": res.data.data
       });
       console.info(this_.data.collect)
     }
   })  
  },

  // 点击查询的方法
  look:function(e){
    console.info(e);
    var this_ = this;
    wx.request({
      url: liunxUrl+'house/house/queryByHouseId', 
      data: {
       houseId:e.currentTarget.dataset.id
      },
      success(res) {
        console.info(res.data.data);
        wx.setStorage({
          data: res.data.data,
          key: 'house',
        })
        wx.navigateTo({
          url: '/pages/particulars/particulars',
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