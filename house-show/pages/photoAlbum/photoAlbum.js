// pages/photoAlbum/photoAlbum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bedroomhidden:false,
    toilethidden:true,
    saloonhidden:true,
    bedroomphotos:["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588498980551&di=55d8d757d8f935afba8ea8ed65661d99&imgtype=0&src=http%3A%2F%2Fpic.to8to.com%2Fcase%2F2003%2F20%2F20200320_0f687e185da73a1668f422nolay824nh.jpg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588500987342&di=1eb63130fb4b638fc3515e753e4ceba5&imgtype=0&src=http%3A%2F%2Fimg1n.soufunimg.com%2Fviewimage%2Fzxb%2F2014_07%2F28%2F75%2F71%2Fpic%2F003192974600%2F770x1500.jpg","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588500987342&di=3b7dfaacc28d7c1b62e38f6179dfe74c&imgtype=0&src=http%3A%2F%2Fpic.to8to.com%2Fcase%2F1208%2F25%2F20120825_e05b989cc3e2c8930d0dKJ19poaek8mc.jpg"],
    toiletphotos:[
      "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3847627911,2716215845&fm=11&gp=0.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588503500990&di=106bcdd8bf1266250ddd0ad5f3a8a406&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_match%2F0%2F6854160576%2F0.jpg"
    ],
    saloonphotos:[
      "http://img5.imgtn.bdimg.com/it/u=3233469387,2934585984&fm=26&gp=0.jpg",
      "http://img2.imgtn.bdimg.com/it/u=1410120524,716855100&fm=26&gp=0.jpg"
    ]
  },
  click1:function(e){
    this.setData({
      bedroomhidden:this.data.bedroomhidden = false,
      toilethidden:this.data.toilethidden = true,
      saloonhidden:this.data.saloonhidden = true
    })
  },
  click2:function(e){
    this.setData({
      bedroomhidden:this.data.bedroomhidden = true,
      toilethidden:this.data.toilethidden = false,
      saloonhidden:this.data.saloonhidden = true
    })
  },
  click3:function(e){
    this.setData({
      bedroomhidden:this.data.bedroomhidden = true,
      toilethidden:this.data.toilethidden = true,
      saloonhidden:this.data.saloonhidden = false
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