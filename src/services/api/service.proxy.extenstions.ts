/* tslint:disable */
/* eslint-disable */

// import Taro from '@tarojs/taro'
import { ServiceProxy } from './service.proxy'
import { Response, RequestInit } from './models/service.proxy.utils'

export class ServiceProxyExtention extends ServiceProxy {
  // private _baseUrl?: string
  constructor(
    baseUrl?: string,
    http?: { fetch(url: string, init?: RequestInit): Promise<Response> },
  ) {
    super(baseUrl, http)
    // this._baseUrl = baseUrl
  }

  /** 这里可以扩展新的api方法 */
}
