import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Map, Input, Image } from '@tarojs/components';
import QQMapWX from '../../asset/qqmap-wx-jssdk1/qqmap-wx-jssdk';
import localtionIcon from '../../asset/address.png';
import circleIcon from '../../asset/circle.png';
import './index.less';

let qqmapsdk;

let timer: any = null;

function debounce(fn: Function, text: string) {
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(text);
    }, 500);
  }
}

const My = () => {

  const [localtion, setLocaltion] = useState({ longitude: 0, latitude: 0 });
  const [markers, setMarkers] = useState<any>([]);
  const [pois, setPois] = useState<any>([]);
  const [suggest, setSuggest] = useState<any>([]);
  const [value, setValue] = useState<string>('');

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
    getPois(latitude, longitude);
  }

  function getPois(latitude, longitude) {
    setMarkers([{
      iconPath: localtionIcon,
      id: 0,
      latitude: latitude,
      longitude: longitude,
      width: 20,
      height: 30
    }]);
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
    setValue(e.target.value);
    let fn = debounce(getAddress, e.target.value);
    fn();
  }

  function getAddress(value: string) {
    qqmapsdk.getSuggestion({
      keyword: value,
      success: res => {
        setSuggest(res.data);
      }
    });
  }

  function handleSearch(item) {
    setValue(item.title);
    getPois(item.location.lat, item.location.lng);
    setSuggest([]);
    setLocaltion({ longitude: item.location.lng, latitude: item.location.lat });
  }

  function handleCancel() {
    setSuggest([]);
    setValue('');
  }

  return (
    <View className='address'>
      <View className='header'>
        <Input
          value={value}
          style={{ background: '#F6F7F8', width: '70vw', padding: '1vw', display: 'inline-block', borderRadius: '20px', fontSize: '3.5vw', paddingLeft: '4vw' }}
          placeholderClass='input-placeholder'
          type='text'
          placeholder='请输入您的收货地址'
          onInput={handleChangeSearch}
        />
        <Text style={{ display: suggest.length > 0 ? 'inline-block' : 'none', marginLeft: '5vw', color: '#e60000' }} onClick={handleCancel}>取消</Text>
      </View>
      <View style={{ display: suggest.length > 0 ? 'none' : 'block' }}>
        <Map onClick={onTap}
          style={{
            width: '100vw',
            height: '50vh'
          }}
          longitude={localtion.longitude}
          latitude={localtion.latitude}
          subkey='M5YBZ-QGNWF-TSEJU-NCRBO-3O32K-VCBEG'
          markers={markers}
        />
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
      </View>
      <View className='suggests' style={{ display: suggest.length > 0 ? 'block' : 'none' }}>
        {
          suggest.length > 0 && suggest.map(item => {
            const reg = new RegExp(value, 'g');
            const title = item.title.replace(reg, `<Text>${value}</Text>`);
            console.log(title);
            return (
              <View className='poi' key={item.id} onClick={() => handleSearch(item)}>
                <Image src={circleIcon} className='icon' />
                <Text className='title'>{item.title}</Text>
                <Text className='address'> {item.address} </Text>
                <Text className='distance'> {item._distance ? item._distance.toFixed(2) + '米' : ''} </Text>
              </View>
            )
          })
        }
      </View>
    </View >
  )
}

export default My;

