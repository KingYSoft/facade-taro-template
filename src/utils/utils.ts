import Taro from '@tarojs/taro'

const _formatNumber = (n: number): string => {
  const nStr = n.toString() // 1
  return nStr[1] ? nStr : '0' + n
}
/**
 * 格式化日期 2017-01-12
 * @method formatDate
 * @param {Date} date 日期
 */
export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // 2017-01-12
  return [year, month, day].map(_formatNumber).join('-')
}
/**
 * 给日期添加年份
 * @param {string} date 日期
 * @param {number} years 年份
 */
export const addYears = (date: Date, years: number) => {
  const newDate = new Date(date)
  newDate.setFullYear(newDate.getFullYear() + years)
  return newDate
}
/**
 * 比较版本号
 * @param newVersion 新版本号 1.10.1
 * @param oldVersion 老版本号 1.9.1
 * @returns 1:比老版本新,0:版本一样,-1:比老版本旧
 */
export const compareVersion = (
  newVersion: string,
  oldVersion: string,
): number => {
  const v1 = newVersion.split('.')
  const v2 = oldVersion.split('.')

  const len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])
    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}
/**
 * 将回调函数转成Promise
 * @param method 小程序 api 的方法名
 * ```tsx
 * // 转换 wx.getStorage()
 * const getStorage = myApi('getStorage')
 * // 使用
 * getStorage({ key: 'test' }).then(res=>{}).catch(err=>{})
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const myApi = (method: string) => (option?: any): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any>((resolve, reject) => {
    const s =
      process.env.TARO_ENV === 'alipay'
        ? // 忽略
          // @ts-ignore
          my
        : process.env.TARO_ENV === 'tt'
        ? // 忽略
          // @ts-ignore
          tt
        : // 忽略
          // @ts-ignore
          wx
    if (option) {
      s[method]({
        ...option,
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        },
      })
    } else {
      s[method]({
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        },
      })
    }
  })
}
/**
 * 微信环境下，小程序是否正式版本
 */
export const prod = (): boolean => {
  if (process.env.TARO_ENV === 'weapp') {
    const info = Taro.getSystemInfoSync()
    const acc = Taro.getAccountInfoSync()
    console.log(info, acc)
    const plat = info.platform === 'ios' || info.platform === 'android'
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const env = acc.miniProgram.envVersion === 'release'
    console.log(env)
    return plat && env
  } else {
    return false
  }
}
