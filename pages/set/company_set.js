// pages/set/company_set.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    province: '',
    city: '',
    district: '',
    provinceIndex: 0,
    cityIndex: 0,
    districtIndex: 0,
    provinceCode: '',
    cityCode: '',
    districtCode: '',
    company:"晋江信泰鞋服有限公司",
    name:"阿卡什",
    phone:"1334253525",
    pickerHidden: true,
    chosen: ''
  },
  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  ////////
  // 自定义函数
  ////////
  action_save(){
    util.trace_print("action_save");
    wx.showToast({
      title: '未开发敬请期待',
    })
  },

  action_change_phone(){
    util.trace_print("action_change_phone");
    wx.showToast({
      title: '未开发敬请期待',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var header = {'content-type' : 'application/json'} 
    wx.request({
      url: 'http://8.133.189.213:8888/province/', //查询省信息parentId为空
      method: 'GET',
      header: header,
      success: function (provinceRes) {
        console.log( provinceRes.data);
        var proRespCode = provinceRes.data.result
        if (proRespCode == 500) {
          wx.showToast({
            title: '服务器繁忙!',
            icon: 'loading',
            duration: 1500,
          })
        } else if (proRespCode == 200) {
          var provinceArray = []
          var provinceCodeArray = []
          var cityParentId = provinceRes.data.areacodeInfoList[0].areacode //省编码，用于默认级联查询
          for (var iprovince = 0; iprovince < provinceRes.data.areacodeInfoList.length; iprovince++) {
            provinceArray[iprovince] = provinceRes.data.areacodeInfoList[iprovince].areaname
            provinceCodeArray[iprovince] = provinceRes.data.areacodeInfoList[iprovince].areacode
          }
          that.setData({
            province: provinceArray,
            provinceCode: provinceCodeArray,
          })
          wx.request({
            url: 'https://yourserver?parentId=' + cityParentId,
            method: 'POST',
            header: header,
            success: function (cityRes) {
              var cityRespCode = cityRes.data.result
              if (cityRespCode == 200) {
                var cityArray = []
                var cityCodeArray = []
                var districtParentId = cityRes.data.areacodeInfoList[0].areacode //市编码，用于默认级联查询
                for (var icity = 0; icity < cityRes.data.areacodeInfoList.length; icity++) {
                  cityArray[icity] = cityRes.data.areacodeInfoList[icity].areaname
                  cityCodeArray[icity] = cityRes.data.areacodeInfoList[icity].areacode
                }
                that.setData({
                  city: cityArray,
                  cityCode: cityCodeArray
                })
                wx.request({
                  url: 'https://yourserver?parentId=' + districtParentId,
                  method: 'POST',
                  header: header,
                  success: function (districtRes) {
                    var districtRespCode = districtRes.data.result
                    if (districtRespCode == 200) {
                      var districtArray = []
                      var districtCodeArray = []
                      var streetParentId = districtRes.data.areacodeInfoList[0].areacode //区编码 用于默认级联查询
                      for (var idistrict = 0; idistrict < districtRes.data.areacodeInfoList.length; idistrict++) {
                        districtArray[idistrict] = districtRes.data.areacodeInfoList[idistrict].areaname
                        districtCodeArray[idistrict] = districtRes.data.areacodeInfoList[idistrict].areacode
                      }
                      that.setData({
                        district: districtArray,
                        districtCode: districtCodeArray
                      })
                    } else {
                      wx.showToast({
                        title: '服务器繁忙!',
                        icon: 'loading',
                        duration: 1500,
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '服务器繁忙!',
            icon: 'loading',
            duration: 1500,
          })
        }
      }
    })
  },
  provincePicker: function (e) {
    var that = this
    var header = { 'content-type': 'application/json' }
    //改变index值，通过setData()方法重绘界面
    var currentProIndex = e.detail.value
    var currentProCode = e.currentTarget.dataset.procode[currentProIndex] //当前省代表的Code,当做查询级联市的parentid
    that.setData({
      provinceIndex: currentProIndex,
      cityIndex: 0,
      districtIndex: 0,
    })
    wx.request({
      url: 'https://yourserver?parentId=' + currentProCode,
      method: 'POST',
      header: header,
      success: function (cityRes) {
        var cityRespCode = cityRes.data.result
        if (cityRespCode == 200) {
          var cityArray = []
          var cityCodeArray = []
          var districtParentId = cityRes.data.areacodeInfoList[0].areacode //市编码，用于默认级联查询
          for (var icity = 0; icity < cityRes.data.areacodeInfoList.length; icity++) {
            cityArray[icity] = cityRes.data.areacodeInfoList[icity].areaname
            cityCodeArray[icity] = cityRes.data.areacodeInfoList[icity].areacode
          }
          that.setData({
            city: cityArray,
            cityCode: cityCodeArray
          })
          wx.request({
            url: 'https://yourserver?parentId=' + districtParentId,
            method: 'POST',
            header: header,
            success: function (districtRes) {
              var districtRespCode = districtRes.data.result
              if (districtRespCode == 200) {
                var districtArray = []
                var districtCodeArray = []
                var streetParentId = districtRes.data.areacodeInfoList[0].areacode //区编码 用于默认级联查询
                for (var idistrict = 0; idistrict < districtRes.data.areacodeInfoList.length; idistrict++) {
                  districtArray[idistrict] = districtRes.data.areacodeInfoList[idistrict].areaname
                  districtCodeArray[idistrict] = districtRes.data.areacodeInfoList[idistrict].areacode
                }
                that.setData({
                  district: districtArray,
                  districtCode: districtCodeArray
                })
              } else {
                wx.showToast({
                  title: '服务器繁忙!',
                  icon: 'loading',
                  duration: 1500,
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '服务器繁忙!',
            icon: 'loading',
            duration: 1500,
          })
        }
      }
    })
  },
  cityPicker: function (e) {
    var that = this
    var header = {'content-type' : 'application/json'}
    //改变index值，通过setData()方法重绘界面
    var currentCityIndex = e.detail.value
    var currentCityCode = e.currentTarget.dataset.citycode[currentCityIndex] //当前市代表的Code,当做查询级联区的parentid
    that.setData({
      cityIndex: currentCityIndex,
      districtIndex: 0,
    })
    wx.request({
      url: 'https://yourserver?parentId=' + currentCityCode,
      method: 'POST',
      header: header,
      success: function (districtRes) {
        var districtRespCode = districtRes.data.result
        if (districtRespCode == 200) {
          var districtArray = []
          var districtCodeArray = []
          var streetParentId = districtRes.data.areacodeInfoList[0].areacode //区编码 用于默认级联查询
          for (var idistrict = 0; idistrict < districtRes.data.areacodeInfoList.length; idistrict++) {
            districtArray[idistrict] = districtRes.data.areacodeInfoList[idistrict].areaname
            districtCodeArray[idistrict] = districtRes.data.areacodeInfoList[idistrict].areacode
          }
          that.setData({
            district: districtArray,
            districtCode: districtCodeArray
          })
        } else {
          wx.showToast({
            title: '服务器繁忙!',
            icon: 'loading',
            duration: 1500,
          })
        }
      }
    })
  },
  districtPicker: function (e) {
    var that = this
    //改变index值，通过setData()方法重绘界面
    var currentdistrictIndex = e.detail.value
    var currentdistrictCode = e.currentTarget.dataset.councode[currentdistrictIndex] //当前区代表的Code,当做查询级联街道的parentid
    that.setData({
      districtIndex: currentdistrictIndex,
    })
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