// pages/register/register.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:60,
     phone:"",
     verification:"",
     userVerification:"",
     hi:"",
     hi1:"hidden"
  },

  // 获取手机号
phone(e){
  this.data.phone=e.detail.value;
},
userVerification(e){
  this.data.userVerification=e.detail.value;
},
// 获取验证码
verification(){
  let re = /^1(3|4|5|7|8)\d{9}$/;
  if(re.test(this.data.phone)){
    wx.request({
      url:liunxUrl+ '/house/user/phoneVerification',
      data:{
        phone:this.data.phone
      },
      success:res=>{
        this.data.verification = res.data.data
        this.setData({
          hi:"hidden",
          hi1:""
        })
        let this_ = this;
        // 定时器任务
        let num = 60;
        let  setInter=setInterval(function get(){
          this_.data.num = --num;
          this_.setData({
            num:this_.data.num
          })
            if(this_.data.num==0){
              this_.data.num = 60
              this_.setData({
                hi:"",
                hi1:"hidden"
              })
              clearInterval(setInter);
            }
        },1000)
      }
    })
  }else{
    wx.showToast({
      title:"手机号有误",
      image:'/pages/image/jg.png',
      duration: 2000
    })
  }
},

// 绑定手机号的方法
login(){
  let re = /^1(3|4|5|7|8)\d{9}$/;
  // 判断手机号是否有误
  if(re.test(this.data.phone)){
    // 判断输入的验证码是否和接收的验证码一致
    if(Number.parseInt(this.data.verification)==Number.parseInt(this.data.userVerification)){
      wx.request({
        url: liunxUrl+'/house/user/bindingPhone',
        data:{
          userId:app.globalData.userInfo.id,
          phone:this.data.phone
        },
        success:res=>{
          app.globalData.userInfo = res.data.data
          if(res.data.data.id!=null){
            wx.showToast({
              title:"绑定成功~",
              duration: 2000
            })
            // 返回上级页面
            setTimeout(function(){
              wx.navigateBack({
                complete: (res) => {
                    console.info(res)
                }
              })
            },2000)
          }
        }
      })
    }else{
      wx.showToast({
        title:"验证码有误",
        image:'/pages/image/jg.png',
        duration: 2000
      })
    }
  }else{
    wx.showToast({
      title:"手机号有误",
      image:'/pages/image/jg.png',
      duration: 2000
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