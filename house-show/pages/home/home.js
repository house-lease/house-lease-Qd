// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      images:['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586408829082&di=920ecb05f8383a12e79143a6452c2c10&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3f26a959c3a3f5fbb55903a0e1551a0377e94c5013ab9-ipKmXi_fw658',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586408829082&di=920ecb05f8383a12e79143a6452c2c10&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3f26a959c3a3f5fbb55903a0e1551a0377e94c5013ab9-ipKmXi_fw658'
    ],
    houses:[
      {
      id:"1",  
      houseName:"我的小家",
      houseType:"整租",
      price:"1000",
      address:"商丘",
      image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588043426099&di=4e34b9d49a73a122e052c5a09eb68ea6&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2Fd31b0ef41bd5ad6ed985964c8acb39dbb6fd3c13.jpg"
    },
    {
      id:"2",  
      houseName:"我的小家",
    houseType:"整租",
    price:"1000",
    address:"商丘",
    image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588043426099&di=4e34b9d49a73a122e052c5a09eb68ea6&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2Fd31b0ef41bd5ad6ed985964c8acb39dbb6fd3c13.jpg"
    },
    {
    id:"3",  
    houseName:"我的小家",
    houseType:"整租",
    price:"1000",
    address:"商丘",
    image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588043426099&di=4e34b9d49a73a122e052c5a09eb68ea6&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2Fd31b0ef41bd5ad6ed985964c8acb39dbb6fd3c13.jpg"
    },
    {
    id:"4",
    houseName:"我的小家",
    houseType:"整租",
    price:"1000",
    address:"商丘",
    image:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588043426099&di=4e34b9d49a73a122e052c5a09eb68ea6&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Fnuomi%2Fpic%2Fitem%2Fd31b0ef41bd5ad6ed985964c8acb39dbb6fd3c13.jpg"
    }
  ]
  },
  // 自动有方法
  look:function(e){
    console.info(e.currentTarget.dataset.id);

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