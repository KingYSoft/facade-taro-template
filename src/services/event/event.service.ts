import { ICallback } from '../../models/callback.type'

interface EventCallback {
  [key: string]: ICallback[]
}

export default class EventService {
  private callbacks: EventCallback
  constructor() {
    this.callbacks = {}
  }
  /**
   * 注册监听事件
   * @param {string} eventName 事件名称
   * @param {ICallback} callback 回调函数
   */
  on = (eventName: string, callback: ICallback): void => {
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = []
    }

    this.callbacks[eventName].push(callback)
  }
  /**
   * 关闭监听事件
   * @param {string} eventName 事件名称
   * @param {ICallback} callback 回调函数
   */
  off = (eventName: string, callback: ICallback): void => {
    const events = this.callbacks[eventName]
    if (!events) {
      return
    }

    let index = -1
    for (let i = 0; i < events.length; i++) {
      if (events[i] === callback) {
        index = i
        break
      }
    }

    if (index < 0) {
      return
    }

    this.callbacks[eventName].splice(index, 1)
  }
  /**
   * 触发事件
   * @param {string} eventName 事件名称
   * @param {T} ts 事件入参
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger = (eventName: string, ...args: any[]): void => {
    const events = this.callbacks[eventName]
    if (!events || !events.length) {
      return
    }

    for (const callback of events) {
      callback.apply(this, args)
    }
  }
}
