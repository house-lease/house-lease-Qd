// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user:{},
      address_:"郑州",
      houseName:"",
      price:"",
      startValue:"",
      images:['https://img.meituan.net/iphoenix/fae12ad6cb45735f4835276ada9cb062167115.jpg.webp@3840w_720h_80Q_1e_1c',
      'https://p0.meituan.net/scarlett/082bc697bf06e8475b738bec094607a9434582.jpg.webp@3840w_720h_80Q_1e_1c'
    ],
    houses:[
  
  ]
  },
  // 点击查询方法
  look:function(e){
    console.info(e.currentTarget.dataset.id);
    var this_ = this;
    wx.request({
      url: 'http://localhost:8080/house/house/queryByHouseId', 
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
   // 定义一个函数：作用是查询所有的房屋信息，返回的结果是json格式
   getHouseList: function(){
     var this_ = this;
    wx.request({
      url: 'http://localhost:8080/house/house/queryHouse', 
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
this.getHouseList();
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