// pages/particulars/particulars.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        interval:2000,//自动切换时间间隔
        duration:1000,//滑动动画时长
        current:0,//图片数量

        houses:[
            {
              id:"1",  
              houseName:"我的小家",
              houseType:"整租",
              price:"1000",
              address:"商丘",
              images:[
                "http://img.warting.com/uploads/2013/c0816/13L644M255350-DY23.jpg?touch=",
                "http://imgs.soufun.com/newshezuo/2013_10/17/778/34ee9ae577a1bcd57318246d5fd51bcd.jpeg",
                "http://img.pconline.com.cn/images/photoblog/1/0/8/7/10876399/20103/24/1269422597706.jpg"
              ]
            }
        ],
      },

 swiperChange: function (e) {
        var that = this;
          that.setData({
            current: e.detail.current
          })
      }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var that = this;
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