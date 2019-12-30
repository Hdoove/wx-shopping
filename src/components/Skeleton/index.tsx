import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';

const Skeleton = () => {

    return (
        <View className='skeletonIndex'>
            <View className='header'>
                <View className='left skeleton'></View>
                <View className='right skeleton' />
            </View>
            <View className='banners skeleton'></View>
            <View className='btns'>
                {
                    Array.from({ length: 10 }, (k, v) => (v + 1)).map((item) => {
                        return <View key={item} className='btn'></View>
                    })
                }
            </View>
            <View className='content1 skeleton'></View>
            <View className='foods'>
                {
                    Array.from({ length: 6 }, (k, v) => (v + 1)).map((item) => {
                        return <View key={item} className='food'>
                            <View className='image skeleton'></View>
                            <View className='text skeleton'></View>
                        </View>
                    })
                }
            </View>
        </View >
    )
}

export default Skeleton;

