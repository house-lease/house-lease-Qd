// pages/select/select.js
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {

    addrss:"",
    tips: {},
    latitude:"",
    longitude:""
  },
  handleSearcher(e){
    var value = e.detail.value;
    console.info(value);
}
,
bindInput: function(e){
  var that = this;
  var keywords = e.detail.value; 
  var key = config.Config.key;
  var myAmapFun = new amapFile.AMapWX({key: key});
  myAmapFun.getInputtips({
    keywords: keywords,
    success: function(data){
      if(data && data.tips){
        that.setData({
          tips: data.tips
        });
        console.info(that.data.tips)
      }
    }
  })
},
// 点击下拉列表的方法
bindSearch: function(e){
  let location = e.currentTarget.dataset.keywords.location
  let index = location.indexOf(",")
  this.data.longitude = location.substring(0,index)
  this.data.latitude = location.substring(index+1)
  this.setData({
    addrss:e.currentTarget.dataset.keywords.name
  })
  console.info(this.data.latitude)
  console.info(this.data.longitude)
  let this_ = this;
  wx.request({
    url: liunxUrl+'house/house/rim',
    data:{
      latitude:this_.data.latitude,
      longitude:this_.data.longitude
    }, 
    success(res) {
      console.info(res.data.data);
        wx.setStorage({
          data: res.data.data,
          key: 'rimHouses',
        })
        wx.setStorage({
          data: e.currentTarget.dataset.keywords.name,
          key: 'addressName',
        })
        wx.navigateTo({
          url: '/pages/search/search',
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