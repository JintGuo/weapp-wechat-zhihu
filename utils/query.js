import { LOG_ERR, LOG_INFO, logging } from 'query';


class QueryResult {
  constructor(success, data) {
    this.success = success;
    this.data = data;
  }
}


const HTTP_200_SUCCEED = 200;
const HTTP_201_CREATED = 201;


function query(url, method, header = null, data = null, enableCache = false, timeout = 500) {
  // var ret;
  // 标志改次访问是否真正成功 200/201
  // var success = false;
  var ret = QueryResult(false, null);

  wx.request({
    url: url,
    data: data,
    enableCache: enableCache,
    enableHttp2: true,
    enableQuic: true,
    header: header,
    method: method,
    responseType: responseType,
    timeout: timeout,
    success: (result) => {
      logging(LOG_INFO, `[网络请求成功] url: ${res.url}, method: ${res.method}, data: ${res.data}`);
      if (result.statusCode in [HTTP_200_SUCCEED, HTTP_201_CREATED]) {
        // success = true;
        ret.success = true;
      }
      ret.data = data;
    },
    fail: (res) => {
      logging(LOG_ERR, `[网络请求失败] url: ${res.url}, method: ${res.method}, data: ${res.data}`);

      // 异常处理
      wx.showToast({
        title: "网络请求失败",
        icon: 'error',
      })
    },
    complete: (res) => { },
  })
  return ret;
}

module.exports.query = query;
