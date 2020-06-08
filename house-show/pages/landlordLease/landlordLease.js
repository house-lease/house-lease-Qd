// pages/lease/lease.js

var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
      lease:{},
      chatS:[]
  },
  // 返回上层
  fanHui(){
    wx.navigateBack({
      complete: (res) => {},
    })
  }
  ,
  // 点击查询方法
look (e) {
  wx.request({
    url: liunxUrl + 'house/house/queryByHouseId',
    data: {
      houseId: e.currentTarget.dataset.id
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
// 缴费
pay(e){
  wx.showModal({
    title: '提示',
    content: '是否确认缴费',
    success: res => {
        if (res.confirm) {
          wx.showLoading({
            title: '交易中',
            mask: true,
          })
          wx.request({
            url: liunxUrl+'/house/record/pay',
            data:{
              id:e.currentTarget.dataset.id
            },
            success:re=>{
              wx.hideLoading({
                complete: (res) => {},
              })
             if(re.data.data!=null){
                if(re.data.data==0){
                  wx.showToast({
                    title: '交易失败',
                     image:"/pages/image/jg.png",
                     duration: 2000
                  })
                }else{
                  this.setData({
                    lease:re.data.data
                  })
                  wx.showToast({
                    title: '交易完成',
                     duration: 2000
                  })
                }
             }else{
              wx.showToast({
                title: '余额不足',
                 image:"/pages/image/jg.png",
                 duration: 2000
              })
             }
            }
          })
        } 
    }
})
}
,
// 获取订单信息
  getLease(){
      wx.getStorage({
        key: 'lease',
        success:res=>{
          console.info(res.data)
          this.data.lease = res.data
          this.setData({
            lease:res.data
          })
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
    // 退还押金
    return(e){
      wx.showModal({
        title: '提示',
        content: '是否确认缴费',
        success: res => {
            if (res.confirm) {
              wx.request({
                url: liunxUrl+'/house/record/returnMoney',
                data:{
                  id:e.currentTarget.dataset.id
                },
                success:re=>{
                 if(re.data.data!=null){
                    if(re.data.data==0){
                      wx.showToast({
                        title: '交易失败',
                         image:"/pages/image/jg.png",
                         duration: 2000
                      })
                    }else{
                      this.setData({
                        lease:re.data.data
                      })
                      wx.showToast({
                        title: '交易完成',
                         duration: 2000
                      })
                    }
                 }else{
                  wx.showToast({
                    title: '余额不足',
                     image:"/pages/image/jg.png",
                     duration: 2000
                  })
                 }
                }
              })
            } 
        }
    })
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
      }
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
    this.getLease();
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