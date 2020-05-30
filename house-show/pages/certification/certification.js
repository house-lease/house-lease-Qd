// pages/certification/certification.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    image:""
  },

  takePhoto() {
    // 调用"选择项目"的api
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res => {
        this.setData({
          image : res.tempFilePaths
        })
      }
    })
   
  },
   // 实名认证
   uploadImage(){
  
    wx.uploadFile({
      url: liunxUrl+'house/apply/landlordApply', //仅为示例，非真实的接口地址
      formData:{
        userId:this.data.user.id,
      },
      filePath:this.data.image[0],
      name: 'houseImageUrl',
      success:(res) =>{
        let json = JSON.parse(res.data)
        if(json.data){
          wx.showToast({
            title:json.message,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/personalCenter/personalCenter',
            })
          }, 2300)  
        }else{
          wx.showToast({
            title:json.message,
            image:'/pages/image/jg.png',
            duration: 2000
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
    this.data.user=app.globalData.userInfo
    this.setData({
      user:app.globalData.userInfo
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