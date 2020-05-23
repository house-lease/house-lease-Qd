// pages/message/message.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {

    chatList:[
        {
          id:1,
          name:"我是谁",
          message:"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
          image:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1124881678,3417344117&fm=26&gp=0.jpg",
          time:"22:36"
        }
    ],
    user:{},
    chatS:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 查询聊天信息
  chat(e){
    console.info(e.currentTarget.dataset.id)
    wx.request({
      url: liunxUrl+'house/chatTest/queryAllChat',
      data:{
        sendUserId:app.globalData.userInfo.id,
        receptionUserId:e.currentTarget.dataset.id
      },
      success:res =>{
        this.setData({
          chatS:res.data.data
        })
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


  },
  // 获得聊天列表
  getChatList(){
    wx.request({
      url: liunxUrl+'house/chatTest/queryAllChatList',
      data:{
        userId:app.globalData.userInfo.id
      },
      success:res =>{
        this.setData({
          chatList:res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

    // 跳转登录页面
login:function(){
  wx.navigateTo({
    url: '/pages/login/login',
  })
}
  ,
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    this.data.user = app.globalData.userInfo
    this.setData({
      user:app.globalData.userInfo
    })
    if( this.data.user.id!=null){
      this.getChatList();
      let that= this;
      setInterval(function get(){
        that.getChatList()
      },2000);
    }
   

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