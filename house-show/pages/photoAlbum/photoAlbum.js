// pages/photoAlbum/photoAlbum.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bedroomhidden:false,
    toilethidden:true,
    saloonhidden:true,
    bedroomphotos:[],
    toiletphotos:[
     ],
    saloonphotos:[
    ],
    house:{}
  },
  click1:function(e){
    this.setData({
      bedroomhidden:this.data.bedroomhidden = false,
      toilethidden:this.data.toilethidden = true,
      saloonhidden:this.data.saloonhidden = true
    })
  },
  click2:function(e){
    this.setData({
      bedroomhidden:this.data.bedroomhidden = true,
      toilethidden:this.data.toilethidden = false,
      saloonhidden:this.data.saloonhidden = true
    })
    let this_ = this
    wx.request({
      url: liunxUrl+'house/houseImage/query', 
      data:{
        houseId:this_.data.house.id,
        imagePlaceId:2
      },
      success(res) {
        this_.setData({
          toiletphotos:res.data.data
        })
      }
    })
  },
  click3:function(e){
    this.setData({
      bedroomhidden:this.data.bedroomhidden = true,
      toilethidden:this.data.toilethidden = true,
      saloonhidden:this.data.saloonhidden = false
  })
let this_ =this
  wx.request({
    url: liunxUrl+'house/houseImage/query', 
    data:{
      houseId:this_.data.house.id,
      imagePlaceId:3
    },
    success(res) {
      this_.setData({
        saloonphotos:res.data.data
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
    let this_ = this;
    wx.getStorage({
      key: 'house',
      success:res =>{
        this_.setData({
          house:res.data
        })
        wx.request({
          url: liunxUrl+'house/houseImage/query', 
          data:{
            houseId:this_.data.house.id,
            imagePlaceId:1
          },
          success(res) {
            this_.setData({
              bedroomphotos:res.data.data
            })
          }
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