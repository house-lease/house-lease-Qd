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
    houses:[

		{
       address: "商丘市民权县",
        houseImages:[
        {
        imageUrl: "http://182.92.168.223:8080/house/image/tmp_e2bcb96a9bc3e3057f5c0e29deb34386dabda0634ee13612.jpg"
        }
        ],
        houseLeaseName: "合租",
        houseName: "恒嘉世锦",
        houseTypeName: "两室一厅",
        narrate: "100m  8楼",
        price: 2000,
        startName: "三个月",
        }
    ]

},

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
      wx.getStorage({
        key: 'rimHouses',
        success:res =>{
          this.setData({
            houses:res.data
          })
        }
      })
      wx.getStorage({
        key: 'addressName',
        success: res=>{
          this.setData({
            address:res.data
          })
        }
      })
  },

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