/* tslint:disable */
/* eslint-disable */

export class Response {
  status: number
  headers: any
  data: string
  constructor(data: string, status: number, headers: any) {
    ;(this.data = data), (this.status = status), (this.headers = headers)
  }
  text() {
    return Promise.resolve(this.data)
  }
}
export class RequestInit {
  url: string
  body?: any
  headers?: any
  method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
}
