import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Text, ScrollView, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getClassify } from '../../actions/classify';
import chevron from '../../asset/chevron.png';
import Skeleton from './Skeleton';
import './index.less';

interface IProps {
  classify: {
    id: number,
    name: string,
    classifys: { name: string, id: number }[]
  }[];
  loading: boolean;
  getClassifys: (str: string) => void;
}

const Classify = (props: IProps) => {

  const { getClassifys, classify, loading } = props;

  const [choose, setChoose] = useState<number>(0);
  const [type, setType] = useState<number>(0);
  const [isOpenType, setIsOpenType] = useState<boolean>(false);

  useEffect(() => {
    const get_classify = `query {
      allClassifies {
        id,
        name,
        imageUrl {
          filename
        },
        classifys {
          id,
          name
        }
      }
    }`;
    getClassifys(get_classify);
  }, []);

  function handleClick(index: number) {
    setChoose(index);
    setType(0);
  }

  function handleSmallClick(index: number) {
    setType(index);
  }

  function handleOpenType() {
    setIsOpenType(!isOpenType);
  }

  return (
    <View className='classify'>
      {
        loading ? <Skeleton /> : <View>
          <View className='leftContent'>
            {
              classify.length && classify.map((item, index) => {
                return (
                  <Text className={`classifyText ${index === choose ? 'choose' : ''}`} key={item.id} onClick={() => handleClick(index)}>{item.name}</Text>
                )
              })
            }
          </View>
          <View className='rightContent'>
            <View className='type'>
              {/* <Image onClick={handleOpenType} src={chevron} className='chevron' style={{ transform: `rotate(${isOpenType ? 180 : 0}deg)` }}></Image> */}
              {
                classify[choose] && classify[choose].classifys !== undefined && classify[choose].classifys.map((item, index) => {
                  return (
                    <Text className={`typeText ${index === type ? 'choose' : ''}`} key={item.id} onClick={() => handleSmallClick(index)}>{item.name}</Text>
                  )
                })
              }
            </View>
          </View>
        </View>
      }

    </View >
  )
}

const mapStateToProps = (state: any) => {
  const { classify } = state;

  return {
    classify: classify.classify,
    loading: classify.loading
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getClassifys: (str: string) => {
      dispatch(getClassify(str));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classify);

