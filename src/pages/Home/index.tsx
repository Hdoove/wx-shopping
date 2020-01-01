import Taro, { useReachBottom, usePullDownRefresh } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import Skeleton from '../../components/Skeleton';
import { connect } from '@tarojs/redux';
import { getTest } from '../../actions/test';
import aa from '../../asset/111.jpg';
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
      {/* <Skeleton /> */}
      <View className="foods">
        {
          [1, 2, 3, 4, 5, 6].map(item => {
            return (
              <View className="food" key={item}>
                <Image className="img" src={aa} />
                <View className="info">
                  <Text className="name">爱媛果冻橙4粒/袋 合计480g起</Text>
                  <Text className="describe">汁水超多 竟然能用吸管吸</Text>
                </View>
                <View className="price">
                    ￥
                    <Text className="big">9.9</Text>
                    <Text className="small">￥19.9</Text>
                </View>
                  <View className="add">+</View>
              </View>
            )
          })
        }
      </View>
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

