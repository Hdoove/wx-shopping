import Taro from '@tarojs/taro';
import { View, Text, OpenData } from '@tarojs/components';

const My = () => {

  return (
    <View className='index'>
      <View><Text>我的</Text></View>
      <OpenData className='avatar' type='userAvatarUrl'></OpenData>
      <OpenData className='name' type='userNickName' lang='zh_CN'></OpenData>
    </View >
  )
}

export default My;

