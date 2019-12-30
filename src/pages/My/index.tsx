import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Map, Input, Image } from '@tarojs/components';
import QQMapWX from '../../asset/qqmap-wx-jssdk1/qqmap-wx-jssdk';
import localtionIcon from '../../asset/address.png';
import circleIcon from '../../asset/circle.png';
import './index.less';

let qqmapsdk;

const My = () => {

  const [localtion, setLocaltion] = useState({ longitude: 0, latitude: 0 });
  const [markers, setMarkers] = useState<any>([]);
  const [pois, setPois] = useState<any>([]);

  useEffect(() => {
    qqmapsdk = new QQMapWX({
      key: 'M5YBZ-QGNWF-TSEJU-NCRBO-3O32K-VCBEG'
    });
    Taro.getLocation({
      success: res => {
        const { latitude, longitude } = res;
        setLocaltion({ longitude: longitude, latitude: latitude });
        setMarkers([{
          iconPath: localtionIcon,
          id: 0,
          latitude: res.latitude,
          longitude: res.longitude,
          width: 20,
          height: 30
        }]);
        getPois(latitude, longitude);
      }
    });
  }, []);

  // const [polyline, setpolyline] = useState([{
  //   points: [{
  //     longitude: 113.3245211,
  //     latitude: 23.10229
  //   }, {
  //     longitude: 113.324520,
  //     latitude: 23.21229
  //   }],
  //   color: "#FF0000DD",
  //   width: 2,
  //   dottedLine: true
  // }]);

  function onTap(e) {
    const { latitude, longitude } = e.detail;
    setMarkers([{
      iconPath: localtionIcon,
      id: 0,
      latitude: latitude,
      longitude: longitude,
      width: 20,
      height: 30
    }]);
  }

  function getPois(latitude, longitude) {
    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      get_poi: 1,
      success: function (res) {
        setPois(res.result.pois);
      }
    });
  }

  function handleChangeSearch(e) {
    qqmapsdk.getSuggestion({
      keyword: e.target.value,
      success: res => {
        if (res.data.length > 0) {
          const { lng, lat } = res.data[0].location;
          setPois(res.data);
          setLocaltion({ longitude: lng, latitude: lat });
          setMarkers([{
            iconPath: localtionIcon,
            id: 0,
            latitude: lat,
            longitude: lng,
            width: 20,
            height: 30
          }]);
        }
      }
    });
  }

  return (
    <View className='index'>
      <Input type='text' placeholder='请输入地点' onBlur={handleChangeSearch} />
      <Map
        onClick={onTap}
        style={{
          width: '100vw',
          height: '30vh'
        }}
        longitude={localtion.longitude}
        latitude={localtion.latitude}
        subkey='M5YBZ-QGNWF-TSEJU-NCRBO-3O32K-VCBEG'
        markers={markers}
      />
      {/* <OpenData className='avatar' type='userAvatarUrl'></OpenData>
      <OpenData className='name' type='userNickName' lang='zh_CN'></OpenData> */}
      {
        pois.map(item => {
          return (
            <View className='poi' key={item.id}>
              <Image src={circleIcon} className='icon' />
              <Text className='title'> {item.title} </Text>
              <Text className='address'> {item.address} </Text>
              <Text className='distance'> {`${item._distance && item._distance.toFixed(2)} 米`} </Text>
            </View>
          )
        })
      }
    </View >
  )
}

export default My;

