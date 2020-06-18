export default class SpeechService {
  /**
   * 文字转语音
   * @param text 文字
   */
  speak = (text: string): void => {
    const d = new SpeechSynthesisUtterance(text)
    d.lang = 'zh-CN'
    d.rate = 0.6 // 语速
    d.pitch = 1 // 音调
    d.volume = 1 // 音量
    speechSynthesis.speak(d)
  }
}
