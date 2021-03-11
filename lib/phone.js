import api from '../config'
import query from '../utils/query'



class Phone {
  static api_root = api + '/phone/'

  constructor (phone) {
    // 手机号码
    this.phone = phone;
    // 是否经过短信校验
    this.verified = false;
  }

  // 网络方法
  get_verify_code () {
    var ret = query(this.api_root+this.phone, method='GET');
    return [ret.success, ret.data];
  }

}