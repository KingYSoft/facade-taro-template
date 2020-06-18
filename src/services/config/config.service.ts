export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://www.xxx.com'
    : 'http://39.98.48.213:8001/pims'
export const SOCKET_BASE_URL = BASE_URL + '/signalr'

export default class ConfigService {
  public BASE_URL = BASE_URL
  public SOCKET_BASE_URL = SOCKET_BASE_URL
}
