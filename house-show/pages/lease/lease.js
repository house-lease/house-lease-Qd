// pages/lease/lease.js

var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
      lease:{},
      chatS:[]
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
// 获取订单信息
  getLease(){
      wx.getStorage({
        key: 'lease',
        success:res=>{
          console.info(res.data)
          this.data.lease = res.data
          this.setData({
            lease:res.data
          })
        }
      })
  },
  // 拨打电话
  calling: function (e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone,
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
    },
    // 跳转聊天页面
    consult(e){
      if(app.globalData.userInfo.id!=null){
      if(e.currentTarget.dataset.id.id!=app.globalData.userInfo.id){
        wx.request({
          url: liunxUrl+'house/chatTest/queryAllChat',
          data:{
            sendUserId:app.globalData.userInfo.id,
            receptionUserId:e.currentTarget.dataset.id.id
          },
          success:res =>{
            wx.setStorage({
              data: res.data.data,
              key: 'chatS',
            })
            wx.setStorage({
              data: e.currentTarget.dataset.id,
              key: 'receptionUserId',
            })
            console.info(this.data.chatS)
            wx.navigateTo({
              url: '/pages/chat/chat',
            })
          }
        })     
      }
    }
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
    this.getLease();
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