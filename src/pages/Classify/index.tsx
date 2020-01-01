import Taro, { useEffect, useState, useRef, useDidHide } from '@tarojs/taro';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import { useDispatch, useSelector } from '@tarojs/redux';
import { getClassify, getFoods } from '../../actions/classify';
import chevron from '../../asset/chevron.png';
import Skeleton from './Skeleton';
import { createSelector } from 'reselect';
import './index.less';

const Classify = () => {

  const dispatch = useDispatch();
  const selectNumOfDoneTodos = createSelector(data => data.classify, datas => datas);
  const state: any = useSelector(selectNumOfDoneTodos);
  const { classify, loading, foods } = state;

  const [choose, setChoose] = useState<number>(0);
  const [type, setType] = useState<number>(0);
  const [isOpenType, setIsOpenType] = useState<boolean>(false);
  const [copy, setCopy] = useState<number>(0);
  const [isFixedBar, setFixedBar] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [chooseObj, setChooseObj] = useState({ big: '', small: '' });

  const rightRef = useRef(null);

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
    const get_foods = `query{
      allFoods {
        id,
        name,
        describe,
        price,
        actualPrive,
        originPlace,
        details,
        storage,
        effectiveDate,
        sold,
        specs,
        packing,
        baozhuan,
        weight,
        images {
          publicUrl
        }
      }
    }`;
    dispatch(getClassify(get_classify));
  }, []);

  useEffect(() => {
    if (classify[0].id !== undefined) {
      setChooseObj({ ...chooseObj, big: classify[0].id });
      const get_foods = `query{
        allFoods (where: 
          { bigClassifyId: { 
              id: "${classify[0].id}"
            }
          }
        ) {
          id,
          name,
          describe,
          price,
          actualPrive,
          originPlace,
          details,
          storage,
          effectiveDate,
          sold,
          specs,
          packing,
          baozhuan,
          weight,
          images {
            publicUrl
          }
        }
      }`;
      dispatch(getFoods(get_foods));
    }

  }, [classify])

  function handleClick(index: number, id: string) {
    setChoose(index);
    setType(0);
    setIsOpenType(false);
    setChange(true);
    setTimeout(() => { setChange(false); }, 1000);
    setChooseObj({ ...chooseObj, big: id });
    const smallSearch = `query {
      allFoods(where: 
        { bigClassifyId: { 
            id: "${id}"
          }
        }
      ) {
        id,
        name,
        describe,
        price,
        actualPrive,
        originPlace,
        details,
        storage,
        effectiveDate,
        sold,
        specs,
        packing,
        baozhuan,
        weight,
        images {
          publicUrl
        }
      }
    }`;

    dispatch(getFoods(smallSearch));
  }

  function handleSmallClick(index: number, id: string) {
    setType(index);
    setIsOpenType(false);
    setChooseObj({ ...chooseObj, small: id });
    const smallSearch = `query {
      allFoods(where: 
        { bigClassifyId: { 
            id: "${chooseObj.big}"
          }, 
          smallClassifyId:{
            id: "${id}"
          }
        }
      ) {
        id,
        name,
        describe,
        price,
        actualPrive,
        originPlace,
        details,
        storage,
        effectiveDate,
        sold,
        specs,
        packing,
        baozhuan,
        weight,
        images {
          publicUrl
        }
      }
    }`;

    dispatch(getFoods(smallSearch));
  }

  function handleOpenType() {
    setIsOpenType(!isOpenType);
  }

  function handleScroll(e) {
    const { detail } = e;
    const height = Taro.getSystemInfoSync().windowHeight;
    setFixedBar(isFixedBar !== (detail.scrollTop > height * 0.24) ? detail.scrollTop > height * 0.24 : isFixedBar);
  }

  function handleGotoDetail(item) {
    Taro.navigateTo({
      url: `../FoodDetail/index?query=${JSON.stringify(item)}`
    });
  }

  useDidHide(() => {
    console.log(11);
    Taro.catch
  });

  return (
    <View className='classify'>
      {
        loading ? <Skeleton /> : <View>
          <View className='leftContent'>
            {
              classify.length > 0 && classify.map((item, index) => {
                return (
                  <Text className={`classifyText ${index === choose ? 'choose' : ''}`} key={item.id} onClick={() => handleClick(index, item.id)}>{item.name}</Text>
                )
              })
            }
          </View>
          <ScrollView className='rightContent' scroll-y={!isOpenType} onScroll={handleScroll} ref={rightRef}>
            {
              change ? <Skeleton /> : <View>
                <View className="rightHover" style={{ display: isOpenType ? 'block' : 'none' }}>
                  <View style={{ background: '#fff', padding: '2vw 0 4vw 1vw' }}>
                    <Text className="allClassify">全部分类</Text>
                    <Image onClick={handleOpenType} src={chevron} className='chevron'></Image>
                    {
                      classify.length > 0 && classify[choose].classifys !== undefined && classify[choose].classifys.map((item, index) => {
                        return (
                          <Text className={`typeText ${index === type ? 'choose' : ''}`} key={item.id} onClick={() => handleSmallClick(index, item.id)}>{item.name}</Text>
                        )
                      })
                    }
                  </View>
                </View>
                <View className="imageShow"></View>
                <View className={` ${isFixedBar ? 'fixed' : 'type'}`} style={{ display: isOpenType ? 'none' : '' }}>
                  <View className='shadow'></View>
                  <Image onClick={handleOpenType} src={chevron} className='chevron'></Image>
                  {
                    classify.length > 0 && classify[choose].classifys.map((item, index) => {
                      return (
                        <Text className={`typeText ${index === type ? 'choose' : ''}`} key={item.id} onClick={() => handleSmallClick(index, item.id)}>{item.name}</Text>
                      )
                    })
                  }
                </View>
                <View style={{ marginTop: isFixedBar ? '8vh' : '0' }}>
                  {
                    foods.length > 0 ? foods.map(item => {
                      return (
                        <View className="food" key={item.id} onClick={() => handleGotoDetail(item)}>
                          <Image src={`http://101.200.191.21:3000${item.images.publicUrl}`} className="image" />
                          <Text className="name">{item.name}</Text>
                          <Text className="describe">{item.describe}</Text>
                          <View className="price">
                            ￥
                            <Text className="big">{item.price}</Text>
                            <Text className="small">{item.actualPrive}</Text>
                          </View>
                          <View className="operation">
                            <View style={{ visibility: copy > 0 ? 'visible' : 'hidden' }} className="subtraction" onClick={e => { e.stopPropagation(); setCopy(copy - 1) }}>-</View>
                            <Text style={{ visibility: copy > 0 ? 'visible' : 'hidden', fontSize: '3.5vw' }}>{copy}</Text>
                            <View className="add" onClick={(e) => { e.stopPropagation(); setCopy(copy + 1) }}>+</View>
                          </View>
                        </View>
                      )
                    }) : <View className="noneData">笔者疯狂增加数据中...</View>
                  }
                </View>
              </View>
            }
          </ScrollView>
        </View>
      }
    </View >
  )
}

export default Classify;
