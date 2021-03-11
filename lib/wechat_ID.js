import config from '../config';
import query from 'query';

class WechatPhone {
  constructor(wechatId, phone) {
    this.wechatId = wechatId;
    this.phone = phone;
    this.bind = False;
  }
}