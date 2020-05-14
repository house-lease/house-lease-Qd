// pages/particulars/particulars.js
var amapFile = require('../../libs/amap-wx');
var config = require('../../libs/config');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        user:{},
        hi:"",
        hi1:"hidden",
        interval:2000,//自动切换时间间隔
        duration:1000,//滑动动画时长
        current:0,//图片数量
        houses:[
        
        ],
        markers:{}
        ,
        collect:{}
      },
      hidden(){
        
      }
      ,

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
  // 导航
daohang(){
  let this_ = this;
  wx.openLocation({
    latitude: this_.data.houses.latitude,
    longitude: this_.data.houses.longitude,
  })
},



// 地图
address(){
  var that = this;
  var key = config.Config.key;
  var myAmapFun = new amapFile.AMapWX({key: key});
  myAmapFun.getRegeo({
    iconPath: "../image/marker.png",
    iconWidth: 22,
    iconHeight: 32,
    success: function(data){
      console.info(data)
      data[0].latitude=that.data.houses.latitude
      data[0].longitude=that.data.houses.longitude
      var marker = [{
        id: data[0].id,
        latitude: data[0].latitude,
        longitude: data[0].longitude,
        iconPath: data[0].iconPath,
        width: data[0].width,
        height: data[0].height
      }]
      that.setData({
        markers: marker
      });
    },
    fail: function(info){
       wx.showModal({title:info.errMsg})
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

    // 判断是否收藏
    Collect(){
      if(app.globalData.userInfo.id!=null){
      let this_ = this;
      wx.getStorage({
        key: 'house',
        success:function(res){
            this_.setData({
              houses:res.data
            })
            wx.request({
              url: 'http://192.168.0.106:8080/house/collect/queryInfoByUserIdAndHouseId', 
              data:{
                  houseId:this_.data.houses.id,
                  userId:app.globalData.userInfo.id
              },
              success(res) {
                console.info(res.data.data);
                this_.setData({
                  collect:res.data.data
                })
                if(this_.data.collect==null){
                  this_.setData({
                    hi1:"hidden",
                    hi:""
                  })
                }else{
                  this_.setData({
                    hi1:"",
                    hi:"hidden"
                  })
                }
              }
            })
        }
      }) 
    }
    },
    // 收藏的方法
    attention(){
      if(app.globalData.userInfo.id!=null){
      let this_ = this;
      wx.getStorage({
        key: 'house',
        success:res =>{
            this_.setData({
              houses:res.data
            })
          wx.request({
            url: 'http://192.168.0.106:8080/house/collect/addCollectRecord', 
            data:{
                userId:app.globalData.userInfo.id,
                houseId:this_.data.houses.id
            },
            success:res => {
              console.info(res.data.data);
              if(res.data.data!=null){
                this_.setData({
                  hi1:"",
                  hi:"hidden"
                })
                this_.data.collect=res.data.data
              }
            }
          })
        }
   })
  }else{
    wx.showToast({
        title: '未登录',
        image:"/pages/image/jg.png",
       duration:2000
   })
  }
   } ,
  //  取消收藏
   cancel(){
    let this_ = this;
        wx.request({
          url: 'http://192.168.0.106:8080/house/collect/deleteInfo', 
          data:{
            collectId:this_.data.collect.id
          },
          success:res => {
            console.info(res.data.data);
            if(res.data.data==true){
              this_.setData({
                hi1:"hidden",
                hi:""
              })
            }
          }
        })
   },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function () {
    var this_=this;
    wx.getStorage({
      key: 'house',
      success:function(res){
          this_.setData({
            houses:res.data
          })
          console.info(this_.data.houses)
      }
    })
    this.address();
    this.Collect();
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