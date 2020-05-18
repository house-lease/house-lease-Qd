// pages/consult/consult.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zheng:"/pages/image/zhengmian.jpg",
    fan:"/pages/image/fanmian.jpg",
    hi:"",
    h1:"hidden",
    h2:"hidden",
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // 跳转到个人中心
  tiao(){
    wx.switchTab({
      url: '/pages/personalCenter/personalCenter',
    })
  }
  ,
  takePhoto() {
    // 调用"选择项目"的api
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:res => {
        this.setData({
          zheng : res.tempFilePaths
        })
      }
    })
   
  },
  takePhoto1(){
      // 调用"选择项目"的api
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:res => {
          this.setData({
            fan : res.tempFilePaths
          })
          this.setData({
            h2:""
          })
        }
      })    
  },

  // 实名认证
  uploadImage(){
    wx.uploadFile({
      url: liunxUrl+'house/upload/userAuthentication', //仅为示例，非真实的接口地址
      formData:{
        userId:this.data.user.id,
      },
      filePath:this.data.zheng[0],
      name: 'image',
      headers: {
        'Content-Type': 'form-data'
      },
      success:res =>{
       this.setData({
         user:res.data.data
       })
       app.globalData.userInfo=this.data.user
       this.setData({
         hi:"hidden",
         h1:""
       })
      },
      complete(res){
        console.log(res)
      }
    })
    
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

      console.info(this.data.user.id)
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