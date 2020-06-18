export default class CookieService {
  /**
   * 根据key获取cookie值
   * @param key cookie key
   */
  getCookieValue = (key: string): string | null => {
    const equalities = document.cookie.split('; ')
    for (let i = 0; i < equalities.length; i++) {
      if (!equalities[i]) {
        continue
      }
      const splitted = equalities[i].split('=')
      if (splitted.length !== 2) {
        continue
      }
      if (decodeURIComponent(splitted[0]) === key) {
        return decodeURIComponent(splitted[1] || '')
      }
    }
    return null
  }
  /**
   * 设置cookie
   * @param key cookie key
   * @param value cookie 值
   * @param expireDate cookie 过期时间
   * @param path cookie 路径
   */
  setCookieValue = (
    key: string,
    value: string,
    expireDate?: Date,
    path?: string,
  ): void => {
    let cookieValue = encodeURIComponent(key) + '='
    if (value) {
      cookieValue = cookieValue + encodeURIComponent(value)
    }
    if (expireDate) {
      cookieValue = cookieValue + '; expires=' + expireDate.toUTCString()
    }
    if (path) {
      cookieValue = cookieValue + '; path=' + path
    }
    // if (domain) {
    //   cookieValue = cookieValue + '; domain=' + domain;
    // }
    document.cookie = cookieValue
  }
  /**
   * 根据 cookie key 和 cookie 路径，删除 cookie
   * @param key cookie key
   * @param path cookie 路径
   */
  deleteCookie = (key: string, path?: string): void => {
    let cookieValue = encodeURIComponent(key) + '='
    cookieValue =
      cookieValue +
      '; expires=' +
      new Date(new Date().getTime() - 86400000).toUTCString()
    if (path) {
      cookieValue = cookieValue + '; path=' + path
    }
    document.cookie = cookieValue
  }
}
