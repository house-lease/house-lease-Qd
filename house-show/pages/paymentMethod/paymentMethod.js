// pages/paymentMethod/paymentMethod.js
var app = getApp();
var liunxUrl=app.globalData.liunxUrl
var localUrl=app.globalData.localUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    payment:{},
    starts:[],
    startName:"",
    startIndex:'',
    start:{},
    first:'',
    residue:'',
    sum:''
  },
  // 更改起租时间触发的事件
  bindStart:function(e){
    console.log('picker发送选择改变，携带值为', e)
      this.data.startIndex= e.detail.value
      this.data.start=this.data.starts[this.data.startIndex],
    this.setData({
      startName:this.data.starts[this.data.startIndex].startName,
      start:this.data.starts[this.data.startIndex]
    })
    let money1 = this.data.payment.price+this.data.payment.price;
    let money3 = this.data.start.startValue * this.data.payment.price+this.data.payment.price;
    let money2 = money3-money1;
    this.data.first = money1;
    this.data.residue = money2;
    this.data.sum = money3;
    this.setData({
      first:money1,
      residue:money2,
      sum:money3
    })
    

  },
  // 获得租赁起租时间
getPayment(){
  wx.getStorage({
    key: 'payment',
    success:res=>{
      this.data.payment = res.data
      console.info(res.data)
      wx.request({
        url: liunxUrl+'house/start/queryByStartValue', 
        data:{
          starValue:res.data.startValue
        },
        success:res=> {
          console.info(res.data.data);
          this.data.starts = res.data.data
          this.setData({
            starts:res.data.data,
            startName:res.data.data[0].startName,
            start:res.data.data[0]
          })
          let money1 = this.data.payment.price+this.data.payment.price;
          let money3 = this.data.start.startValue * this.data.payment.price+this.data.payment.price;
          let money2 = money3-money1;
          this.data.first = money1;
          this.data.residue = money2;
          this.data.sum = money3;
          this.setData({
            first:money1,
            residue:money2,
            sum:money3
          })
        }
      })
    }
  })
},
payment(){
  wx.showModal({
    title: '支付提醒',
    content: '是否确定支付',
    success: res=> {
        if (res.confirm) {
          wx.showLoading({
            title: '交易中',
            mask: true,
          })
            wx.request({
              url: liunxUrl+'/house/record/save',
              header: { "content-type": "application/x-www-form-urlencoded" },
              data:{
                judge:0,
                payerUserId:app.globalData.userInfo.id,
                payeeUserId:this.data.payment.user.id,
                houseId:this.data.payment.id,
                sumMoney:this.data.sum,
                residueMoney:this.data.residue,
                startValue:this.data.start.startValue
              },
              success:res=>{
                wx.hideLoading({
                  complete: (res) => {},
                })
                console.info(res.data)
                if(res.data.data!=null){
                  if(res.data.data==0){
                    wx.showToast({
                      title: '交易完成',
                       duration: 2000
                    })
                    setTimeout(function () {
                      wx.navigateBack({
                        complete: (res) => {
                            console.info(res)
                        }
                      })
                    }, 2000)     
                  }else if(res.data.data==1){
                    wx.showToast({
                      title: '余额不足',
                        image:"/pages/image/jg.png",
                       duration: 2000
                    })
                  }else if(res.data.data==3){
                    wx.showToast({
                      title: '房间不足',
                        image:"/pages/image/jg.png",
                       duration: 2000
                    })
                    setTimeout(function () {
                      wx.switchTab({
                        url: '/pages/home/home',
                      })
                    }, 2000)     
                  }
                }
              }
            })
        } else{
          wx.showLoading({
            title: '交易中',
            mask: true,
          })
          wx.request({
            url: liunxUrl+'/house/record/save',
            header: { "content-type": "application/x-www-form-urlencoded" },
            data:{
              judge:1,
              payerUserId:app.globalData.userInfo.id,
              payeeUserId:this.data.payment.user.id,
              houseId:this.data.payment.id,
              sumMoney:this.data.sum,
              residueMoney:this.data.residue,
              startValue:this.data.start.startValue
            },
            success:res=>{
              wx.hideLoading({
                complete: (res) => {},
              })
                if(res.data.data==2){
                  wx.showToast({
                    title: '已保存订单',
                     duration: 2000
                  })
                }else if(res.data.data==3){
                  wx.showToast({
                    title: '房间不足',
                     image:"/pages/image/jg.png",
                     duration: 2000
                  })
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/home/home',
                    })
                  }, 2000)     
                }
            }
          })
        }
    }
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
    this.getPayment();
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