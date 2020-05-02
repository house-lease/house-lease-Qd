// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address_:"郑州",
      houseName:"",
      price:"",
      startValue:"",
      images:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586408829082&di=920ecb05f8383a12e79143a6452c2c10&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3f26a959c3a3f5fbb55903a0e1551a0377e94c5013ab9-ipKmXi_fw658',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586408829082&di=920ecb05f8383a12e79143a6452c2c10&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3f26a959c3a3f5fbb55903a0e1551a0377e94c5013ab9-ipKmXi_fw658'
    ],
    houses:[
  
  ]
  },
  // 自动有方法
  look:function(e){
    console.info(e.currentTarget.dataset.id);

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
          "houses": res.data
        });
      }
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用查询房屋的信息
    this.getHouseList();
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