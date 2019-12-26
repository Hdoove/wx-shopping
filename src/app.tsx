import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux';
import rootSaga from './sagas';
import Index from './pages/index'
import configStore, { sagaMiddleware } from './store'
import './app.less';


const store = configStore();
sagaMiddleware.run(rootSaga);

class App extends Component {

  componentDidMount() { }

  config: Taro.Config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'wxapp',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页"
        },
        {
          pagePath: "pages/index/index",
          text: "分类"
        },
        {
          pagePath: "pages/index/index",
          text: "购物车"
        },
        {
          pagePath: "pages/index/index",
          text: "我的"
        }
      ]
    },
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
