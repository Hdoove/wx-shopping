import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getClassify } from '../../actions/classify';
import chevron from '../../asset/chevron.png';
import fruits from '../../asset/fruits.jpg';
import Skeleton from './Skeleton';
import './index.less';

interface IProps {
  classify: {
    id: number;
    name: string;
    classifys: { name: string, id: number }[];
  }[];
  loading: boolean;
  getClassifys: (str: string) => void;
}

const Classify = (props: IProps) => {

  const { getClassifys, classify, loading } = props;

  const [choose, setChoose] = useState<number>(0);
  const [type, setType] = useState<number>(0);
  const [isOpenType, setIsOpenType] = useState<boolean>(false);
  const [copy, setCopy] = useState<number>(0);

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
    setIsOpenType(false);
  }

  function handleSmallClick(index: number) {
    setType(index);
    setIsOpenType(false);
  }

  function handleOpenType() {
    setIsOpenType(!isOpenType);
  }

  console.log(classify.length);

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
            {/* <Skeleton /> */}
            <View className="rightHover" style={{ display: isOpenType ? 'block' : 'none' }}>
              <View style={{ background: '#fff', paddingTop: '2vw' }}>
                <Text className="allClassify">全部分类</Text>
                <Image onClick={handleOpenType} src={chevron} className='chevron'></Image>
                {
                  classify.length > 0 && classify[choose].classifys !== undefined && classify[choose].classifys.map((item, index) => {
                    return (
                      <Text className={`typeText ${index === type ? 'choose' : ''}`} key={item.id} onClick={() => handleSmallClick(index)}>{item.name}</Text>
                    )
                  })
                }
              </View>
            </View>
            <View className='type'>
              <View className='shadow'></View>
              <Image onClick={handleOpenType} src={chevron} className='chevron'></Image>
                {
                  classify.length > 0 && classify[choose].classifys.map((item, index) => {
                    return (
                      <Text className={`typeText ${index === type ? 'choose' : ''}`} key={item.id} onClick={() => handleSmallClick(index)}>{item.name}</Text>
                    )
                  })
                }
            </View>
            <View className="food">
              <Image src={fruits} className="image"></Image>
              <Text className="name">1212312313331111111111313</Text>
              <Text className="describe">1231111111111111111131231313311</Text>
              <View className="price">
                ￥
                <Text className="big">1.1</Text>
                <Text className="small">1.1</Text>
              </View>
              <View className="operation">
                <View style={{ visibility: copy > 0 ? 'visible' : 'hidden' }} className="subtraction" onClick={() => { setCopy(copy - 1) }}>-</View>
                <Text style={{ visibility: copy > 0 ? 'visible' : 'hidden', fontSize: '3.5vw' }}>{copy}</Text>
                <View className="add" onClick={() => { setCopy(copy + 1) }}>+</View>
              </View>
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

