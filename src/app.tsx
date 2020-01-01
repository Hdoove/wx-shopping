import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import rootSaga from './sagas';
import Index from './pages/Home/index'
import configStore, { sagaMiddleware } from './store';
import './app.less';


const store = configStore();
sagaMiddleware.run(rootSaga);

class App extends Component {

  componentDidMount() { }

  config: Taro.Config = {
    pages: [
      'pages/Classify/index',
      'pages/FoodDetail/index',
      'pages/Home/index',
      'pages/Cart/index',
      'pages/My/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'wxapp',
      navigationBarTextStyle: 'black',
      // enablePullDownRefresh: true,
      onReachBottomDistance: 50
    },
    tabBar: {
      borderStyle: "white",
      selectedColor: "#E60000",
      backgroundColor: "#ffffff",
      color: "#bfbfbf",
      list: [
        {
          pagePath: "pages/Home/index",
          text: "首页",
          selectedIconPath: "./asset/homeSelect.png",
          iconPath: "./asset/home.png"

        },
        {
          pagePath: "pages/Classify/index",
          text: "分类",
          selectedIconPath: "./asset/classifySelect.png",
          iconPath: "./asset/classify.png"
        },
        {
          pagePath: "pages/Cart/index",
          text: "购物车",
          selectedIconPath: "./asset/cartSelect.png",
          iconPath: "./asset/cart.png"
        },
        {
          pagePath: "pages/My/index",
          text: "我的",
          selectedIconPath: "./asset/mySelect.png",
          iconPath: "./asset/my.png"
        }
      ]
    },
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
