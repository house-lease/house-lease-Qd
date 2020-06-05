// pages/search/search.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"你想住哪里？",
    latitude:"",
    longitude:"",
    houses:[
    ],
    user:{},
    houseLeases:[],
    starts:[],
    startValue:"",
    houseLeaseName: "",
    maxPrice: "",
    minPrice:"",
},
// 获得筛选条件
package(){
  var this_ = this;
  wx.request({
    url: liunxUrl+'house/houseTypeLease/lease', 
    success(res) {
      this_.setData({
        houseLeases:res.data.data
      })
    }
  })

  wx.request({
    url: liunxUrl+'house/start/queryAll', 
    success(res) {
      this_.setData({
        starts:res.data.data
      })
    }
  })
}
,

// 筛选条件
start(){
  let item = ["不限"]
  this.data.starts.forEach(function(value,index){
      item.push(value.startName+"起")
  })
  wx.showActionSheet({
    itemList: item,
    success: (res)=> {
      if(res.tapIndex!=0){
        this.data.startValue = this.data.starts[res.tapIndex-1].startValue
        this.getHouse()
      }else{
        this.data.startValue = " "
        this.getHouse()
      }
      
    }
  })
},
// 筛选条件
houseLease(){
let item = ["不限"]
this.data.houseLeases.forEach(function(value,index){
    item.push(value.leaseType)
})
wx.showActionSheet({
  itemList: item,
  success: (res)=> {
    if(res.tapIndex!=0){
      this.data.houseLeaseName = this.data.houseLeases[res.tapIndex-1].leaseType
      this.getHouse()
    }else{
      this.data.houseLeaseName = " "
      this.getHouse()
    }
  }
})
},
// 价格
price(){
  let item = ["不限","0-1000","1000-2000","2000-4000","4000-8000","8000-"]
  wx.showActionSheet({
    itemList: item,
    success: (res)=> {
      if(res.tapIndex!=0){
        let price =item[res.tapIndex]
        let index = price.indexOf("-")
        this.data.minPrice = price.substring(0,index)
        this.data.maxPrice = price.substring(index+1)
        this.getHouse()
      }else{
        this.data.minPrice = ""
        this.data.maxPrice=""
        this.getHouse()
      }
    }
  })
}
,
  // 单击搜索触发的事件
  open:function(){
    wx.navigateTo({
      url: '/pages/select/select',
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
    this.data.user=app.globalData.userInfo;
      wx.getStorage({
        key: 'addressName',
        success: res=>{
          this.setData({
            address:res.data
          })
        }
      })
      this.getHouse();
      this.package();
  },
  // 获取房屋
getHouse(){
  // 获取房屋
  wx.request({
    url: liunxUrl+'house/house/rim',
    data:{
      latitude:app.globalData.latitude,
      longitude:app.globalData.longitude,
      houseLeaseName:this.data.houseLeaseName,
      maxPrice: this.data.maxPrice,
      minPrice:this.data.minPrice,
      startValue:this.data.startValue    
    }, 
    success:(res)=> {
      console.info(res.data.data);
        this.setData({
          houses:res.data.data
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