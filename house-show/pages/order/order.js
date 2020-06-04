// pages/order/order.js

var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  records:[]
   
    
  },
  // 取消订单
  cancel(e){
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      success:res => {
          if (res.confirm) {
            console.info(e.currentTarget.dataset.id)
            wx.request({
              url: liunxUrl+'/house/record/updateDealState',
              data:{
                userId:app.globalData.userInfo.id,
                id:e.currentTarget.dataset.id,
                dealState:2
              },
              success:res=>{
                console.info(res.data.data)
                this.setData({
                  records:res.data.data
                })
              }
            })
          } 
      }
  })
  }
,
// 继续付款
go(e){
  console.info(e.currentTarget.dataset.id)
  wx.request({
    url: liunxUrl+'/house/record/queryByRecordId',
    data:{
      recordId:e.currentTarget.dataset.id
    },
    success:res=>{
      console.info(res.data.data)
      wx.setStorage({
        data: res.data.data,
        key: 'paymentOne',
      })
      wx.navigateTo({
        url: '/pages/payment/payment',
      })
    }
  })
}
,
// 查看订单详细
examine(e){
  console.info(e.currentTarget.dataset.id)
  wx.request({
    url: liunxUrl+'/house/record/queryByRecordId',
    data:{
      recordId:e.currentTarget.dataset.id
    },
    success:res=>{
      console.info(res.data.data)
      wx.setStorage({
        data: res.data.data,
        key: 'lease',
      })
      wx.navigateTo({
        url: '/pages/lease/lease',
      })
    }
  })
}
,
  // 获取订单列表
  getRecord(){
      wx.request({
        url: liunxUrl+'/house/record/queryByPayerUserId',
        data:{
          payerUserId:app.globalData.userInfo.id
        },
        success:res=>{
          console.info(res.data.data)
          this.setData({
            records:res.data.data
          })
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
    this.getRecord();
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