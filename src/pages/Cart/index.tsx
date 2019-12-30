import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import fruits from '../../asset/fruits.jpg';
import './index.less';

const Cart = () => {

  return (
    <View className='index'>
      <View><Text>购物车</Text></View>
      <Image src={fruits} className="image"/>
    </View >
  )
}

export default Cart;

