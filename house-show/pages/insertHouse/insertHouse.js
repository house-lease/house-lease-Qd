// pages/insertHouse/insertHouse.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseLeases:[],
    houseTypes:[],
    starts:[],
    houseLeaseIndex:"",
    houseTypeIndex:"",
    startIndex:"",
    // 获取地理位置
    tips: {},
    latitude:"",
    longitude:"",
    hidd:"hidden",
    user:{},
    start:{
    id:"",
      startName:"",
      startValue:"",
      state:0
      },
      price:"",
      narrate:"",
      houseName:"",
      address:"",
      uptown:"",
      houseType:{
        id:"",
        houseType:"",
        state:0
      },
      houseLease:{
        id:"",
        leaseType:"",
        state:0
      },
      houseCareful:{
        id:"",
        houseId:"",
        chuang:"1",
        shafa:"1",
        kongtiao:"1",
        ranqi:"1",
        xiyiji:"1",
        kuandai:"1",
        dianshi:"1",
        bingxiang:"1"
      },
      residueRoom:"",
  },

  // 房屋租赁类型
  bindHouseLease: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      houseLeaseIndex: e.detail.value
    })
    this.setData({
      houseLease:this.data.houseLeases[this.data.houseLeaseIndex]
    })
    console.info(this.data.houseLease)
  },
  bindHouseType: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      houseTypeIndex: e.detail.value
    })
    this.setData({
      houseType:this.data.houseTypes[this.data.houseTypeIndex]
    })
    console.info(this.data.houseType)
  },
  bindStart:function(e){
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      startIndex: e.detail.value
    })
    this.setData({
      start:this.data.starts[this.data.startIndex]
    })
    console.info(this.data.start)
  },


  // 获得房屋类型 房屋起租类型   起租时间
  package(){
    var this_ = this;
    wx.request({
      url: liunxUrl+'house/houseTypeLease/lease', 
      success(res) {
        console.info(res.data.data);
        this_.setData({
          houseLeases:res.data.data
        })
      }
    })
    wx.request({
      url: liunxUrl+'house/houseTypeLease/type', 
      success(res) {
        console.info(res.data.data);
        this_.setData({
          houseTypes:res.data.data
        })
      }
    })

    wx.request({
      url: liunxUrl+'house/start/queryAll', 
      success(res) {
        console.info(res.data.data);
        this_.setData({
          starts:res.data.data
        })
      }
    })
  }
  ,
  // 添加房屋的方法
  formSubmit(e){
    console.info(e.detail.value)
    this.setData({
      user:app.globalData.userInfo
    })
    if(e.detail.value.bingxiang==true){
        this.data.houseCareful.bingxiang=0
    }
    if(e.detail.value.kongtiao==true){
      this.data.houseCareful.kongtiao=0
  }
  if(e.detail.value.xiyiji==true){
    this.data.houseCareful.xiyiji=0
}
if(e.detail.value.shafa==true){
  this.data.houseCareful.shafa=0
}
if(e.detail.value.dianshi==true){
  this.data.houseCareful.dianshi=0
}
if(e.detail.value.ranqi==true){
  this.data.houseCareful.ranqi=0
}
if(e.detail.value.kuandai==true){
  this.data.houseCareful.kuandai=0
}
if(e.detail.value.chuang==true){
  this.data.houseCareful.chuang=0
}
this.setData({
  address:e.detail.value.address,
  houseName:e.detail.value.houseName,
  price:e.detail.value.price,
  narrate:e.detail.value.narrate,
  residueRoom:e.detail.value.residueRoom,
})
wx.request({
  url: liunxUrl+'house/house/save', 
  data:{
    user:this.data.user,
    latitude:this.data.latitude,
    longitude:this.data.longitude,
    start:this.data.start,
    price:this.data.price,
    narrate:this.data.narrate,
    houseName:this.data.houseName,
    address:this.data.address,
    uptown:this.data.uptown,
    houseType: this.data.houseType,
    houseLease: this.data.houseLease,
    houseCareful:this.data.houseCareful,
    residueRoom:this.data.residueRoom
  },
  success(res) {
    console.info(res.data.data);
    wx.setStorage({
      data: res.data.data,
      key: 'houseObject',
    })
    wx.navigateTo({
      url: '/pages/insertImage/insertImage',
    })
  }
})

},




  // 查找小区位置
  bindInput: function(e){
    this.setData({
      hidd:""
    })
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
        }
      }
    })
  },
  bindSearch: function(e){
    this.setData({
      hidd:"hidden"
    })
    this.setData({
      uptown:e.currentTarget.dataset.keywords.name
    })
    let location = e.currentTarget.dataset.keywords.location
    let index = location.indexOf(",")
    this.setData({
      longitude:location.substring(0,index)
      
    })

    this.setData({
      latitude :location.substring(index+1)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.package();
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