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
// 跳转付款页面
      payment(e){
        if(app.globalData.userInfo.id!=null){
          if(e.currentTarget.dataset.id!=app.globalData.userInfo.id){
            if(app.globalData.userInfo.idcard!=null&&app.globalData.userInfo.phone!=null){
              wx.getStorage({
                key: 'house',
                success:function(res){
                  wx.setStorage({
                    data: res.data,
                    key: 'payment',
                  })
                  wx.navigateTo({
                    url: '/pages/paymentMethod/paymentMethod',
                  })
                }
              })
            }else{
              wx.showToast({
                  title: '请完善个人信息',
                  image:"/pages/image/jg.png",
                 duration:2000
             })
            }
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
 swiperChange: function (e) {
        var that = this;
          that.setData({
            current: e.detail.current
          })
      }, 

      // 获取周边房子
      nearby(){
        wx.getStorage({
          key: 'house',
          success:res=>{
            wx.request({
              url: liunxUrl+'house/house/rim',
              data:{
                latitude:res.data.latitude,
                longitude:res.data.longitude,
                houseLeaseName:"",
                maxPrice: "",
                minPrice:"",
                startValue:""    
              }, 
              success:(res)=> {
                console.info(res.data.data);
                this.setData({
                  nearby:res.data.data
                })
              }
            })
          }
        })
      },
       // 点击查询的方法
  look:function(e){
    
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
        wx.navigateTo({
          url: '/pages/particulars/particulars',
        })
        
      }
    })
  },
      // 跳转到相册页面
    showImage(){
      wx.navigateTo({
        url: '/pages/photoAlbum/photoAlbum',
      })
    },
    weizhi_(){
      
      this.setData({
        qie:"",
        qie1:"hidden",
        color1:"",
        color0:"font-size: 35rpx;font-weight: 800",
      })
    },
    zhou(){
      this.setData({
        color0:"",
        color1:"font-size: 35rpx;font-weight: 800",
        qie:"hidden",
        qie1:""
      })
    },
    xuan(e){
      if(e.currentTarget.dataset.state==1){
        this.setData({
          c1:"font-weight: 800",
          c2:"",
          c3:"",
          c4:"",
          c5:"",
        })
      }else if(e.currentTarget.dataset.state==2){
        this.setData({
          c2:"font-weight: 800",
          c1:"",
          c3:"",
          c4:"",
          c5:"",
        })
      }else if(e.currentTarget.dataset.state==3){
        this.setData({
          c3:"font-weight: 800",
          c2:"",
          c1:"",
          c4:"",
          c5:"",
        })
      }else if(e.currentTarget.dataset.state==4){
        this.setData({
          c4:"font-weight: 800",
          c2:"",
          c3:"",
          c1:"",
          c5:"",
        })
      }else{
        this.setData({
          c5:"font-weight: 800",
          c2:"",
          c3:"",
          c4:"",
          c1:"",
        })
      }
      
      this.rim(e.currentTarget.dataset.name);
    }
    ,
    
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
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  var that = this;
  var key = config.Config.key;
  var myAmapFun = new amapFile.AMapWX({key: key});
  myAmapFun.getRegeo({
    iconPath: "/pages/image/marker.png",
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
      wx.hideLoading({
        complete: (res) => {},
      })
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
              url: liunxUrl+'house/collect/queryInfoByUserIdAndHouseId', 
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
            url: liunxUrl+'house/collect/addCollectRecord', 
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
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
   } ,
  //  取消收藏
   cancel(){
    let this_ = this;
        wx.request({
          url: liunxUrl+'house/collect/deleteInfo', 
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

// 点击地理位置
   makertap: function(e) {
     var id = e.markerId;
     var that = this;
     that.showMarkerInfo(markersData,id);
     that.changeMarkerColor(markersData,id);
   },
  //  获取周边
rim(querykeywords){
  
  querykeywords = querykeywords!=null?querykeywords:"餐饮"
  var that = this;
  wx.getStorage({
    key: 'house',
    success:function(res){
        that.data.houses = res.data
        var key = config.Config.key;
        var myAmapFun = new amapFile.AMapWX({key: key});
        let location = that.data.houses.latitude+","+that.data.houses.longitude;
    var params = {
      iconPathSelected: '/pages/image/marker_checked.png',
      iconPath: '/pages/image/marker.png',
      querykeywords:querykeywords,
      location:location,
      success: function(data){
        console.info(data)
        markersData = data.markers;
        var poisData = data.poisData;
        var markers_new = [
            {id: 1,
            latitude: that.data.houses.latitude,
            longitude: that.data.houses.longitude,
            iconPath: "/pages/image/mapicon_navi_s.png",
            width: 22,
            height: 32
          }
        ];
        markersData.forEach(function(item,index){
          markers_new.push({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: item.iconPath,
            width: item.width,
            height: item.height
          })
        })
        if(markersData.length > 0){
          that.setData({
            markerss: markers_new
          });
          that.setData({
            city: poisData[0].cityname || ''
          });
          that.setData({
            latitude: markersData[0].latitude
          });
          that.setData({
            longitude: markersData[0].longitude
          });
          that.showMarkerInfo(markersData,0);
        }
      },
      fail: function(info){
        // wx.showModal({title:info.errMsg})
      }
    }
    myAmapFun.getPoiAround(params)
  },
  showMarkerInfo: function(data,i){
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
    }
  })
    
},
showMarkerInfo: function(data,i){
  var that = this;
  that.setData({
    textData: {
      name: data[i].name,
      desc: data[i].address
    }
  });
},
changeMarkerColor: function(data,i){
  var that = this;
  var markers = [];
  for(var j = 0; j < data.length; j++){
    if(j==i){
      data[j].iconPath = "/pages/image/marker_checked.png";
    }else{
      data[j].iconPath = "/pages/image/marker.png";
    }
    markers.push({
      id: data[j].id,
      latitude: data[j].latitude,
      longitude: data[j].longitude,
      iconPath: data[j].iconPath,
      width: data[j].width,
      height: data[j].height
    })
  }
  that.setData({
    markerss: markers
  });
},
getUser(){
  wx.getStorage({
    key: 'login',
    success:res=>{
        app.globalData.userInfo=res.data
      // 获取用户是否登录
      this.setData({
        user:app.globalData.userInfo
      })
      this.Collect();
     
    }, fail:res=>{
      app.globalData.userInfo={}
      this.setData({
        user: null
      })
     }
  })
}
,
addBrowse(){
  if(app.globalData.userInfo.id!=null){
    // 添加浏览记录
wx.request({
  url:liunxUrl + 'house/browse/addInfo',
  data:{
    userId:app.globalData.userInfo.id,
    houseId:this.data.houses.id
  },
  success:res=>{
    console.info(res.data.message)
  }
})
}
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
          // 添加浏览记录
          this.addBrowse()
      }
    })
    this.address();
    this.rim();
    this.nearby();
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

