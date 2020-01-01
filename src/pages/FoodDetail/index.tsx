import Taro, { useRouter } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import cart from '../../asset/shoppingcard.png';
import { AtBadge } from 'taro-ui';
import './index.less';

const Cart = () => {
    const router = useRouter();
    const {
        name,
        describe,
        price,
        originPlace,
        details,
        storage,
        effectiveDate,
        sold,
        specs,
        packing,
        baozhuan,
        weight,
        images
    } = JSON.parse(router.params.query);

    const showDetail = {
        '产地': originPlace,
        '规格': specs,
        '重量': weight,
        '包装': baozhuan,
        '保质期': effectiveDate,
        '贮存方式': storage
    }

    console.log(name);

    return (
        <View className='foodDetail'>
            <View className='head'>
                <Image src={`http://101.200.191.21:3000${images.publicUrl}`} mode="aspectFit" className="image" />
                <Text className="order">1/1</Text>
            </View>
            <View className="foodInfo">
                <Text className="name displayB">{name}</Text>
                <Text className="dec displayB">{describe}</Text>
                <View className="price">
                    ￥
                    <Text className="big">{price}</Text>
                    <Text className="small">/{packing}</Text>
                    <Text className="sold">已售{sold}</Text>
                </View>
            </View>
            <View className='delivery'>
                <Text style={{ color: '#878789', marginRight: '2vw' }}>配送</Text>
                <Text style={{ color: '#1C1C1F' }}>{`预计今天${new Date().getHours()}:${new Date().getMinutes()}-${new Date().getHours() + 1 > 24 ? 0 : new Date().getHours() + 1}:${new Date().getMinutes()}送达，实付满39.9包邮`}</Text>
            </View>
            <View className="detail">
                <Text className="title">商品详情</Text>
                <View style={{ marginTop: '2vh' }}>
                    {
                        Object.keys(showDetail).map((item: string) => {
                            return <View key={item} className="keyValue">
                                <Text className="key"> {item} </Text>
                                <Text className="value"> {showDetail[item]} </Text>
                            </View>
                        })
                    }
                </View>
                <Text className="dec">{details}</Text>
            </View>
            <View className="footer">
                <AtBadge value={10} maxValue={99}>
                    <Image src={cart} className="img" />
                </AtBadge>
                <Text className="add">加入购物车</Text>
            </View>
        </View >
    )
}

export default Cart;

