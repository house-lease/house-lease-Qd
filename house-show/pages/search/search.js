// pages/search/search.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"你想住哪里？",
    houses:[
    ],
    user:{}

},

  // 单击搜索触发的事件
  open:function(){
    wx.navigateTo({
      url: '/pages/select/select',
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
    this.data.user=app.globalData.userInfo;
      wx.getStorage({
        key: 'rimHouses',
        success:res =>{
          this.setData({
            houses:res.data
          })
        }
      })
      wx.getStorage({
        key: 'addressName',
        success: res=>{
          this.setData({
            address:res.data
          })
        }
      })
  },

   // 点击查询方法
   look:function(e){
    console.info(e.currentTarget.dataset.id);
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
        if(this_.data.user.id!=null){
          // 添加浏览记录
      wx.request({
        url:liunxUrl + 'house/browse/addInfo',
        data:{
          userId:this_.data.user.id,
          houseId:e.currentTarget.dataset.id
        },
        success:res=>{
          console.info(res.data.message)
        }
      })
      }
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