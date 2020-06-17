// pages/like/likes.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    myhouse:[],
    state:0,
    color0:"",
   color1:"",
  },

  // 跳转登录页面
login:function(){
  wx.navigateTo({
    url: '/pages/login/login',
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
    wx.getStorage({
      key: 'login',
      success:res=>{
        app.globalData.userInfo=res.data
        // 获取用户是否登录
        this.setData({
          user:app.globalData.userInfo
        })
        if(app.globalData.userInfo.id!=null){
          this.houseShow();
        }
      }, fail:res=>{
        app.globalData.userInfo={}
        this.setData({
          user: null
        })
       }
    })
   
  },

  // 显示我的房屋的方法
  houseShow(e){
    if(e!=null){
      if(e.currentTarget.dataset.state!=null){
        this.data.state = e.currentTarget.dataset.state
    }
    }
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    this.setData({
      user:app.globalData.userInfo
    })
    // 定义一个函数：作用是查询所有的房屋信息，返回的结果是json格式
   wx.request({
     url: liunxUrl+'house/house/queryByUserId', 
     data: {
       userId:this.data.user.id
     },
     success:(res)=> {
       if(this.data.state==0){
        this.setData({
          color0:"font-size: 35rpx;font-weight: 800",
          color1:"",
        })
        console.info(res.data);
        this.data.myhouse = res.data.data;
        let my = [];
        this.data.myhouse.forEach(item=>{
           if(item.tenants.length>0){
               my.push(item)
           }
        })
        this.setData({
          myhouse: my
        });
        console.info(this.data.myhouse)
       }else{
        this.setData({
          color1:"font-size: 35rpx;font-weight: 800",
          color0:" ",
        })
        console.info(res.data);
        this.data.myhouse = res.data.data;
        let my = [];
        this.data.myhouse.forEach(item=>{
           if(item.tenants.length<=0){
               my.push(item)
           }
        })
        this.setData({
          myhouse: my
        });
        console.info(this.data.myhouse)
       }
       
       wx.hideLoading({
        
       })
     }
   })  
  },

  // 点击查询的方法
  look:function(e){
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
        wx.navigateTo({
          url: '/pages/viewMyHouse/viewMyHouse',
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