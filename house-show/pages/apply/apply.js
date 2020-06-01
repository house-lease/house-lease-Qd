// pages/apply/apply.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
      apply:[]
  },
  getApply(){
    wx.request({
      url: liunxUrl+'/house/apply/queryByUserId',
      data:{
        userId:app.globalData.userInfo.id
      },
      success:res=>{
        console.info(res.data)
        this.setData({
          apply:res.data.data
        })
      }
    })

  }
,
  image(e){
    e.currentTarget.dataset.image
    wx.previewImage({
      current:e.currentTarget.dataset.image, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.image] // 需要预览的图片http链接列表
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
    this.getApply();
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