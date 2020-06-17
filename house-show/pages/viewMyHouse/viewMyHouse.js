// pages/particulars/particulars.js
var amapFile = require('../../libs/amap-wx');
var config = require('../../libs/config');
var markersData = [];
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
        qie:"",
        qie1:"hidden",
        user:{},
        hi:"",
        hi1:"hidden",
        interval:2000,//自动切换时间间隔
        duration:1000,//滑动动画时长
        current:0,//图片数量
        querykeywords:"",
        houses:{},
        markers:{},
        markerss: [],
        textData: {},
        city: '',
        collect:{},
        latitude:"",
        longitude:"",
        nearby:[],
        color0:"font-size: 35rpx;font-weight: 800",
        color1:"",
        c1:"font-weight: 700",
        c2:"",
        c3:"",
        c4:"",
        c5:"",
        
      },
 swiperChange: function (e) {
        var that = this;
          that.setData({
            current: e.detail.current
          })
      }, 

      // 跳转到相册页面
    showImage(){
      wx.navigateTo({
        url: '/pages/photoAlbum/photoAlbum',
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
      }else{
        wx.showToast({
            title: '这是您的房子',
            image:"/pages/image/jg.png",
           duration:2000
       })
      } 
    }else{
      wx.navigateTo({
        url: '/pages/login/login',
      })
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
    // 房屋的上下架操作
    putaway(e){
        let state  = e.currentTarget.dataset.state;
        wx.showLoading({
          title: '加载中',
          mask: true,
        })
        wx.request({
          url: liunxUrl+'house/house/updateHouseState',
          data:{
            houseId:this.data.houses.id,
            state:state
          },
          success:res=>{
            wx.hideLoading({
              complete: (res) => {},
            })
            if(res.data.data!=null){
                if(res.data.data){
                  this.look(this.data.houses.id)
                  wx.showToast({
                      title: '操作成功',
                     duration:2000
                 })
                }else{
                  this.look(this.data.houses.id)
                  wx.showToast({
                      title: '房间不足',
                      image:"/pages/image/jg.png",
                     duration:2000
                 })
                }
            }else{
              wx.showToast({
                  title: '请重试',
                  image:"/pages/image/jg.png",
                 duration:2000
             })
            }
          }
        })
    }
,
    
getUser(){
  wx.getStorage({
    key: 'login',
    success:res=>{
        app.globalData.userInfo=res.data
      // 获取用户是否登录
      this.setData({
        user:app.globalData.userInfo
      })

    }, fail:res=>{
      app.globalData.userInfo={}
      this.setData({
        user: null
      })
     }
  })
}
,
  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function () {
  this.getUser()
    wx.getStorage({
      key: 'house',
      success:res =>{
          this.setData({
            houses:res.data
          })
          this.data.houses = res.data
          console.info(this.data.houses)
      }
    })
  },
// 点击查询的方法
  look(e){
    wx.request({
      url: liunxUrl+'house/house/queryByHouseId', 
      data: {
       houseId:e
      },
      success:(res)=> {
       this.setData({
         houses:res.data.data
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

