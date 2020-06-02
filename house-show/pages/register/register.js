// pages/register/register.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
     phone:"",
     verification:""
  },
phone(e){
  console.info(e)
  this.data.phone=e.detail.value
},
note(){
  wx.request({
    url: liunxUrl+'/house/user/phoneVerification',
    data:{
      phone:this.data.phone
    },
    success:res=>{
      console.info(res.data)
      this.data.verification=res.data.data
      this.setData({
        verification:res.data.data
      })
    }
  })
  
},




















  // phone(e){
  //   // console.info(e.detail.value)
  //   this.data.phone = e.detail.value
  //   console.info(this.data.phone)
  // },
  // note(){
  //   console.info("点击")
  //   console.info(this.data.phone)
  //   wx.request({
  //     url:liunxUrl+'/house/user/phoneVerification',
  //     data:{
  //       phone:this.data.phone
  //     },
  //     success:res =>{
  //       console.info(res.data)
  //       this.data.verification=res.data.data
  //       this.setData({
  //         verification:res.data.data
  //       })
  //     }
  //   })
  // }
  // ,
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