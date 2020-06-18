export default class UtilsService {
  /**
   * 格式化日期 2017-01-12
   * @method formatDate 将日期格式化成 yyyy-MM-dd
   * @param {Date} date 日期
   */
  public formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    // 2017-01-12
    return [year, month, day]
      .map((n: number) => {
        return n < 10 ? '0' + n : '' + n
      })
      .join('-')
  }

  /**
   * 给日期添加年份
   * @param {string} date 日期
   * @param {number} years 年份
   */
  public addYears = (date: Date, years: number): Date => {
    const newDate = new Date(date)
    newDate.setFullYear(newDate.getFullYear() + years)
    return newDate
  }

  /**
   * 将给定的字符文本（str），查找并替换一个字符串（search）为另一个字符串（replacement）。
   * Example:
   * replaceAll('This is a test string', 'is', 'X') = 'ThX X a test string'
   * @param str 文本
   * @param search 被替换的字符串
   * @param replacement 替换后的字符串
   */
  public replaceAll = (
    str: string,
    search: string,
    replacement: string,
  ): string => {
    const fix = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return str.replace(new RegExp(fix, 'g'), replacement)
  }
  /**
   * 格式化一个字符串文本
   * Example:
   * formatString('Hello {0}','Tuana') = 'Hello Tuana'
   * @param str 文本
   * @param args 格式化参数
   */
  public formatString = (str: string, ...args: string[]): string => {
    if (args.length < 1) {
      return str
    }
    for (let i = 1; i < args.length; i++) {
      const placeHolder = '{' + (i - 1) + '}'
      str = this.replaceAll(str, placeHolder, args[i])
    }
    return str
  }
  /**
   * 将文本转成 PascalCase
   * Example:
   * toPascalCase('hello') = 'Hello'
   * @param str 文本
   */
  public toPascalCase = (str: string): string => {
    if (str) {
      if (str.length === 1) {
        return str.charAt(0).toUpperCase()
      }

      return str.charAt(0).toUpperCase() + str.substr(1)
    } else {
      return str
    }
  }
  /**
   * 将文本转成 CamelCase
   * Example:
   * toPascalCase('Hello') = 'hello'
   * @param str 文本
   */
  public toCamelCase = (str: string): string => {
    if (str) {
      if (str.length === 1) {
        return str.charAt(0).toLowerCase()
      }

      return str.charAt(0).toLowerCase() + str.substr(1)
    } else {
      return str
    }
  }

  /**
   * 比较版本号
   * @param newVersion 新版本号 1.10.1
   * @param oldVersion 老版本号 1.9.1
   * @returns 1:比老版本新,0:版本一样,-1:比老版本旧
   */
  public compareVersion = (newVersion: string, oldVersion: string): number => {
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
  public myApi = (method: string) => (option?: any): Promise<any> => {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          success: (res: any) => {
            resolve(res)
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fail: (err: any) => {
            reject(err)
          },
        })
      } else {
        s[method]({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          success: (res: any) => {
            resolve(res)
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fail: (err: any) => {
            reject(err)
          },
        })
      }
    })
  }
  /**
   * 微信环境下，小程序是否正式版本
   */
  public prod = (): boolean => {
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
}
