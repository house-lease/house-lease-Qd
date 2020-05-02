// components/searcher/searcher.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      
  },

  /**
   * 组件的方法列表
   */
  methods: {
  // 单击搜索触发的事件
  open:function(){
   wx.navigateTo({
     url: '/pages/select/select',
   })
}
}


})
