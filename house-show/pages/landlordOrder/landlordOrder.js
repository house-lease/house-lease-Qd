// pages/order/order.js

var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
  records:[],
  dealState:1,
  color0:"",
   color1:"",
  },
  
// 点击查询方法
look (e) {
  wx.request({
    url: liunxUrl + 'house/house/queryByHouseId',
    data: {
      houseId: e.currentTarget.dataset.id
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
        url: '/pages/landlordLease/landlordLease',
      })
    }
  })
},
// 订单分类
classify(e){
  this.getRecord(e.currentTarget.dataset.state);
},
  // 获取订单列表
  getRecord(e){
    if(e!=null){
      this.data.dealState=e
      if(e==0){
        this.setData({
          color0:"font-size: 35rpx;font-weight: 800",
          color1:"",
        })
      }else if(e==1){
        this.setData({
          color1:"font-size: 35rpx;font-weight: 800",
          color0:"",
        })
      }
    }else{
      this.setData({
        color1:"font-size: 35rpx;font-weight: 800",
        color0:"",
      })
    }
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
      wx.request({
        url: liunxUrl+'/house/record/queryByPayeeUserId',
        data:{
          payeeUserId:app.globalData.userInfo.id,
          dealState:this.data.dealState
        },
        success:res=>{
          wx.hideLoading({
            complete: (res) => {},
          })
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