<<<<<<< HEAD:src/pages/index/index.tsx
import Taro from '@tarojs/taro';
import { View, Text, OpenData, Image } from '@tarojs/components';
=======
import Taro, { useReachBottom, usePullDownRefresh } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Skeleton from '../../components/Skeleton';
>>>>>>> 755657e4232aae276095e4f29cfd76059f9d0aa6:src/pages/Home/index.tsx
import { connect } from '@tarojs/redux';
import { getTest } from '../../actions/test';
import './index.less';

interface IProps {
  test: () => void;
  tests: string;
}

const Index = (props: IProps) => {
  const { } = props;

  usePullDownRefresh(() => {
    console.log('onPullDownRefresh')
  });

  useReachBottom(() => {
    console.log('onReachBottom')
  });

  return (
    <View className='index'>
<<<<<<< HEAD:src/pages/index/index.tsx
      <View><Text onClick={handleClick}>获取数据 </Text></View>
      {
        tests.length > 0 && tests.map(item => {
          return (
            <View key={item.id}>
              <Text>{item.name}</Text>
              <Image src={`http://101.200.191.21:3000${item.file.publicUrl}`} ></Image>
            </View>
          )
        })
      }
      <OpenData className='avatar' type='userAvatarUrl'></OpenData>
      <OpenData className='name' type='userNickName' lang='zh_CN'></OpenData>
=======
      <Skeleton />
>>>>>>> 755657e4232aae276095e4f29cfd76059f9d0aa6:src/pages/Home/index.tsx
    </View >
  )
}

const mapStateToProps = (state: any) => {
  const { test } = state;

  return {
    tests: test.test
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    test: () => {
      dispatch(getTest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);

