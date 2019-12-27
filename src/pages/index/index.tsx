import Taro from '@tarojs/taro';
import { View, Text, OpenData, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getTest } from '../../actions/test';
import './index.less';
// import api from "../../apis/index";

interface IProps {
  test: () => void;
  tests: string;
}

const Index = (props: IProps) => {
  const { test, tests } = props;

  function handleClick() {
    test();
  }

  return (
    <View className='index'>
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

