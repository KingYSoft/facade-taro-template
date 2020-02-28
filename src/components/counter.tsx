import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../redux/actions/counter'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  onAdd: () => void
  onDec: () => void
  onAsyncAdd: () => void
}
/**
 * 组件的自定义props
 */
type PageOwnProps = {
  name: string
}

/**
 * 当前页面的State
 */
type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Counter {
  props: IProps
  state: PageState
}

const // 将 reducer 中的状态插入到组件的 props 中
  mapStateToProps = ({ counter }) => ({ counter })
// 将对应action 插入到组件的 props 中
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => ({
  onAdd() {
    dispatch(add())
  },
  onDec() {
    dispatch(minus())
  },
  onAsyncAdd() {
    dispatch(asyncAdd())
  },
})

@connect(mapStateToProps, mapDispatchToProps)
class Counter extends Component {
  componentWillReceiveProps(nextProps: IProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.onAdd}>
          +
        </Button>
        <Button className='dec_btn' onClick={this.props.onDec}>
          -
        </Button>
        <Button className='add_btn' onClick={this.props.onAsyncAdd}>
          async
        </Button>
        <View>
          <Text>{this.props.counter.num}</Text>
        </View>
        <View>
          <Text>你好，{this.props.name}！Hello, World</Text>
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Counter as ComponentClass<PageOwnProps, PageState>
