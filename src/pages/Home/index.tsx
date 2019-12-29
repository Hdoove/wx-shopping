import Taro, { useReachBottom, usePullDownRefresh } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Skeleton from '../../components/Skeleton';
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
      <Skeleton />
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

