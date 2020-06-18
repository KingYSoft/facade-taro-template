import * as signalR from '@aspnet/signalr'
import { ICallback } from '../../models/callback.type'
import { facade, IFacade } from '../'

export default class SignalrService {
  private pingTimer: NodeJS.Timeout | undefined
  private connection: signalR.HubConnection | undefined
  constructor() {
    this.pingTimer = undefined
    this.connection = undefined
  }

  /**
   * 连接websocket，返回websocket的Promise连接
   * @param {string} baseUrl 连接 websocket 地址
   * @param {string} queryString 地址的拼接参数，可空，如：id=xxx&name=xxxx；
   */
  public connect = (
    baseUrl: string,
    queryString: string,
  ): Promise<signalR.HubConnection> => {
    if (queryString) {
      baseUrl += (baseUrl.indexOf('?') === -1 ? '?' : '&') + queryString
    }

    const start = async (
      transport: signalR.HttpTransportType,
      facade_: IFacade,
    ): Promise<signalR.HubConnection> => {
      console.log(
        'Starting connection using ' +
          signalR.HttpTransportType[transport] +
          ' transport',
      )

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(baseUrl, transport)
        .build()

      // 配置
      // Reconnect if hub disconnects
      connection.onclose((e) => {
        if (e) {
          console.log('Connection closed with error: ' + e)
        } else {
          console.log('Disconnected')
        }
        // 尝试重新连接
        this.reconnect()
      })

      // Register to get notifications
      connection.on('getNotification', (notification) => {
        facade_.event.trigger('facade.notifications.received', notification)
      })
      try {
        await connection.start()
        this.connection = connection
        console.log('Connected to SignalR server!')
        // Call the Register method on the hub.
        connection.invoke('register').then(() => {
          console.log('Registered to the SignalR server!')
        })
        facade_.event.trigger('facade.socket.connected', connection)
        return connection
      } catch (error) {
        console.log(
          'Cannot start the connection using ' +
            signalR.HttpTransportType[transport] +
            ' transport. ' +
            error.message,
        )
        if (transport !== signalR.HttpTransportType.LongPolling) {
          return start(transport + 1, facade_)
        }
        return Promise.reject(error)
      }
    }

    return start(signalR.HttpTransportType.WebSockets, facade)
  }

  /**
   * 发送消息
   * @param {string} methodName 发送的方法名
   * @param {any} request 发送的请求参数
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sendMessage = (methodName: string, request: any): Promise<any> => {
    if (this.connection) {
      return this.connection.invoke(methodName, request)
    } else {
      return Promise.reject('websocket 还未连接')
    }
  }
  /**
   * 接受消息
   * @param {string} methodName 接受消息的方法名
   * @param {ICallback} callback 回调函数
   */
  public receiveMessage = (methodName: string, callback: ICallback): void => {
    if (this.connection) {
      this.connection.on(methodName, callback)
    } else {
      console.log('websocket 还未连接')
    }
  }

  /**
   * 重新连接
   */
  private reconnect = (): void => {
    this.pingTimer = setTimeout(() => {
      if (this.connection) {
        this.connection
          .start()
          .then(() => {
            if (this.pingTimer) {
              clearTimeout(this.pingTimer)
            }
          })
          .catch((error) => {
            console.log(error)
            this.reconnect()
          })
      } else {
        console.log('websocket 还未连接')
      }
    }, 5000)
  }
}
