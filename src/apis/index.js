import Taro from '@tarojs/taro'
import {
  HTTP_STATUS
} from './status'
import {
  logError
} from './logError';

const base = 'http://101.200.191.21:1337'
export default {
  baseOptions(params, method = 'GET') {
    let {
      url,
      data
    } = params;
    const option = {
      url: base + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      success(res) {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.GATEWAY_TIMEOUT) {
          return logError('api', '连接超时')
        } else if (res.statusCode === HTTP_STATUS.SERVER_ERROR) {
          return logError('api', '500')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }
    return Taro.request(option)
  },
  get(url) {
    let option = {
      url
    }
    return this.baseOptions(option)
  },
  post: function (url, data) {
    let params = {
      url,
      data
    }
    return this.baseOptions(params, 'POST')
  }
}
