import Taro from '@tarojs/taro'
import { ServiceProxyExtention } from './service.proxy.extenstions'
import { Response, RequestInit } from './models/service.proxy.utils'
import { BASE_URL } from './config'
import { ACCESS_TOKEN } from '../utils/const'

export default class ApiService {
  /**
   * 提取方法
   */
  public fetch: ServiceProxyExtention
  constructor() {
    this.fetch = new ServiceProxyExtention(BASE_URL, {
      fetch: async (url: string, init: RequestInit) => {
        try {
          const token = Taro.getStorageSync(ACCESS_TOKEN)
          const header = init.headers
            ? Object.assign(init.headers, {
                Env: process.env.TARO_ENV,
                Authorization: 'Bearer ' + token,
              })
            : {
                Env: process.env.TARO_ENV,
                Authorization: 'Bearer ' + token,
              }

          const res = await Taro.request({
            url: url,
            data: init.body,
            header: header,
            method: init.method,
          })
          // console.log(res)
          const resp = new Response(
            JSON.stringify(res.data),
            res.statusCode,
            res.header,
          )
          if (res.statusCode === 401) {
            // this.fetch.login()
          }
          return Promise.resolve(resp)
        } catch (err) {
          return Promise.reject(err)
        }
      },
    })
  }
}
