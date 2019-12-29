import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';

const ClassSkeleton = () => {

    return (
        <View className='skeletonClassify'>
            <View className="lineOne skeleton"></View>
            <View className="lineTwo skeleton"></View>
            <View className="foods">
                {
                    Array.from({ length: 10 }, (k, v) => (v + 1)).map((item) => {
                        return <View key={item} className="food">
                            <View className="left skeleton"></View>
                            <View className="center1 skeleton"></View>
                            <View className="center2 skeleton"></View>
                            <View className="center3 skeleton"></View>
                            <View className="right skeleton"></View>
                        </View>
                    })
                }
            </View>
        </View >
    )
}

export default ClassSkeleton;

