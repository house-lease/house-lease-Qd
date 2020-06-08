// pages/photoAlbum/photoAlbum.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseObject:{},
    bedroomhidden:false,
    toilethidden:true,
    saloonhidden:true,
    bedroomphotos:[],
    toiletphotos:[
       ],
    saloonphotos:[
  
    ],
    wo:"",
    wei:"",
    ke:""
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
  // 为页面上的"选择照片"绑定一个事件处理函数
  selectImage: function(e){
    console.info(e)
    this.setData({
      wo:e.currentTarget.dataset.id
    })
    var this_ = this;
    // 调用"选择项目"的api
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        this_.setData({
          bedroomphotos : res.tempFilePaths
        });
      }
    })
},
// 为页面上的"选择照片"绑定一个事件处理函数
selectImage1: function(e){
  this.setData({
    wei:e.currentTarget.dataset.id
  })
  var this_ = this;
  // 调用"选择项目"的api
  wx.chooseImage({
    count: 6,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      this_.setData({
        toiletphotos : res.tempFilePaths
      });
    }
  })
},
// 为页面上的"选择照片"绑定一个事件处理函数
selectImage2: function(e){
  this.setData({
    ke:e.currentTarget.dataset.id
  })
  var this_ = this;
  // 调用"选择项目"的api
  wx.chooseImage({
    count: 6,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      this_.setData({
        saloonphotos : res.tempFilePaths
      });
    }
  })
},


// 上传图片
uploadImage(){
  wx.showLoading({
    title: '上传中',
    mask: true,
  })
  //上传卧室
  for(let i=0;i<this.data.bedroomphotos.length;i++){
    wx.uploadFile({
      url: liunxUrl+'house/upload/image', //仅为示例，非真实的接口地址
      formData:{
        houseId:this.data.houseObject.id,
        imagePlaceId:this.data.wo
      },
      filePath:this.data.bedroomphotos[i],
      name: 'image',
      headers: {
        'Content-Type': 'form-data'
      },
      success: function (res) {
        
      }
    })   
  }
    // 查询卫生间
    for(let i=0;i<this.data.toiletphotos.length;i++){
      wx.uploadFile({
        url: liunxUrl+'house/upload/image', //仅为示例，非真实的接口地址
        formData:{
          houseId:this.data.houseObject.id,
          imagePlaceId:this.data.wei
        },
        filePath:this.data.toiletphotos[i],
        name: 'image',
        headers: {
          'Content-Type': 'form-data'
        },
        success: function (res) { 
        }
      })
  }
// 上传客厅
  for(let i=0;i<this.data.saloonphotos.length;i++){
    wx.uploadFile({
      url: liunxUrl+'house/upload/image', //仅为示例，非真实的接口地址
      formData:{
        houseId:this.data.houseObject.id,
        imagePlaceId:this.data.ke
      },
      filePath:this.data.saloonphotos[i],
      name: 'image',
      headers: {
        'Content-Type': 'form-data'
      },
      success: function (res) {
        wx.showToast({
            title: '上传完成',
            icon: 'success',
           duration: 2000
       })
      wx.hideLoading({
        complete: (res) => {},
      })
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/personalCenter/personalCenter',
        })
      }, 2000)      
      }
      
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    let this_ = this;
  // 获得本地缓存中的房屋数据
  wx.getStorage({
    key: 'houseObject',
    success: res=>{
        this_.setData({
          houseObject:res.data
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