// pages/home/home.js

var amapFile = require('../../libs/amap-wx');
var config = require('../../libs/config');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    keywords:'',
      user:{},
      address_:"",
      addressList:[],
      index:"",
      houseName:"",
      price:"",
      startValue:"",
      images:['https://img.meituan.net/iphoenix/fae12ad6cb45735f4835276ada9cb062167115.jpg.webp@3840w_720h_80Q_1e_1c',
      'https://p0.meituan.net/scarlett/082bc697bf06e8475b738bec094607a9434582.jpg.webp@3840w_720h_80Q_1e_1c'
    ],
    houses:[
  
  ]
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value
    })
    this.setData({
      address_:this.data.addressList[this.data.index].address.substring(0,2)
    })
    this.getHouseList();
  },
  // 获取父级位置的方法
  getaddressList(){

    let this_ = this;
    wx.request({
      url: 'http://192.168.0.106:8080/house/address/queryByParent', 
      success(res) {
        console.info(res.data.data);
        this_.setData({
          addressList:res.data.data
        })
      }
    })
  }
  ,
  // 点击查询方法
  look:function(e){
    console.info(e.currentTarget.dataset.id);
    var this_ = this;
    wx.request({
      url: 'http://192.168.0.106:8080/house/house/queryByHouseId', 
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
          url: '/pages/particulars/particulars',
        })
        
      }
    })
  },

      // 获得地理位置的方法
      getAddress(){
        var that = this;
        var key = config.Config.key;
        var myAmapFun = new amapFile.AMapWX({key: key});
        myAmapFun.getRegeo({
          success: function(data){
            var marker = [{
              id: data[0].id,
              latitude: data[0].latitude,
              longitude: data[0].longitude,
              iconPath: data[0].iconPath,
              width: data[0].width,
              height: data[0].height
            }]
            that.setData({
              address_:data[0].name.substring(0,2)
            })
            that.getHouseList();
          }
        })
      },
   // 定义一个函数：作用是查询所有的房屋信息，返回的结果是json格式
   getHouseList: function(){
     var this_ = this;
    wx.request({
      url: 'http://192.168.0.106:8080/house/house/queryHouse', 
      data: {
        address: this_.data.address_,
        houseLeaseName:this_.data.houseName,
        price:this_.data.price,
        startValue:this_.data.startValue
      },
      success(res) {
        console.info(res.data);
        this_.setData({
          "houses": res.data.data
        });
      }
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getaddressList();
    this.getAddress();
    // var this_=this;
    // wx.getStorage({
    //   key: 'ticket',
    //   success:function(res){
    //     console.info(res.data)
    //       this_.setData({
    //         user:res.data
    //       })
    //       console.info(this_.data.user)
    //   }
    // })
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
  
// 调用查询房屋的信息
    if(this.data.address_!=""){
    console.info("到我了")
    this.getHouseList();
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