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
      
    ],
    user:{},
    chatS:[],
    setInter:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 查询聊天信息
  chat(e){
    console.info(e)
    // 修改未读消息的状态
    wx.request({
      url: liunxUrl+'house/chatTest/updateChatListViewState',
      data:{
        sendUserId:app.globalData.userInfo.id,
        receptionUserId:e.currentTarget.dataset.id.id,
        chatListId:e.currentTarget.dataset.chatlistid
      },
      success:res =>{
          if(res.data.data){
            wx.request({
              url: liunxUrl+'house/chatTest/queryAllChat',
              data:{
                sendUserId:app.globalData.userInfo.id,
                receptionUserId:e.currentTarget.dataset.id.id
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
          }
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
        this.data.chatList = res.data.data
        this.setData({
          chatList:res.data.data
        })
        let count  = 0;
        this.data.chatList.forEach(function(item,index){
          if(item.theSendUserId!=app.globalData.userInfo.id)
          count+=item.unread
        })
        if(count==0){
          count = ' '
        }
        wx.setTabBarBadge({
          index: 2,	//从左边开始第几个页面显示
          text: count.toString().trim(),  //消息条数
          fail:res=>{

          }
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
    wx.getStorage({
      key: 'login',
      success:res=>{
        app.globalData.userInfo=res.data
        this.data.user = app.globalData.userInfo
        // 获取用户是否登录
        this.setData({
          user:app.globalData.userInfo
        })
        if( this.data.user.id!=null){
          this.getChatList();
          let that= this;
          this.data.setInter=setInterval(function get(){
            that.getChatList()
            if(app.globalData.userInfo.id==null){
              clearInterval(that.data.setInter);
            }
          },2000)
        }
      }, fail:res=>{
        app.globalData.userInfo={}
        this.data.user = null
        this.setData({
          user: null
        })
        clearInterval(this.data.setInter);
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