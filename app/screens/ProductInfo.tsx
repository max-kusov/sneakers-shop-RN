import React, { FC } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, Animated, Dimensions, ListRenderItem } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { addProduct, selectCart, CartItem } from '../redux/slices/cartSlice';

import { COLORS } from '../constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ProductType, selectProducts } from '../redux/slices/fetchSlice';
import { AppDispatch, useAppDispatch } from '../redux/store';




const ProductInfo: FC = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch()
  const onClickAdd = () => dispatch(addProduct(product))

  const { productId } = route.params

  const { productCart } = useSelector(selectCart)
  const { products } = useSelector(selectProducts)

  const [product, setProduct] = React.useState({} as CartItem)

  const getDataFromDB = () => {
    products.forEach(async (item: any) => {
      if (item.id === productId) {
        await setProduct(item)
        return
      }
    });
  }

  // redux ?????
  const totalCount = productCart.reduce((sum: number, item) => sum + item.count, 0)

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB()
    });
    return unsubscribe;
  }, [navigation]);

  const scrollX = new Animated.Value(0)
  const width = Dimensions.get('window').width
  let position = Animated.divide(scrollX, width)

  const renderProduct: ListRenderItem<string | undefined> = ({ item }) => {
    return (
      <View style={{
        width: width,
        height: 370,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image
          source={{ uri: item }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
          }} />
      </View>
    )
  }

  return (
    <View style={{
      position: 'relative',
      height: '100%'
    }}>
      <View style={{
        position: 'absolute',
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 50,
        zIndex: 99
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}
          style={{
            width: 35,
            height: 35,
            elevation: 5,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons name="chevron-back" size={24} color={COLORS.gray} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.push('Cart')}
          style={{
            width: 35,
            height: 35,
            elevation: 5,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {productCart.length <= 0 ? false :
            <View style={{
              backgroundColor: COLORS.orange,
              height: 20,
              width: 20,
              borderRadius: 20,
              zIndex: 2,
              position: 'absolute',
              top: -5,
              right: -7,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                color: COLORS.white,
                fontSize: 10
              }}>
                {totalCount}
              </Text>
            </View>}
          <Ionicons name="cart" size={24} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <View style={{
        position: 'relative'
      }}>
        <FlatList data={product.productImgList ? product.productImgList : null}
          horizontal
          renderItem={renderProduct}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
        <View style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 15
        }}>
          {product.productImgList && product.productImgList.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.2, 1, 0.2],
              extrapolate: 'clamp'
            })
            return (
              <Animated.View style={{
                width: '15%',
                height: 4,
                backgroundColor: COLORS.darkOrange,
                opacity,
                marginHorizontal: 5,
                borderRadius: 5
              }} key={i}>

              </Animated.View>
            )
          })}
        </View>
      </View>
      <Text style={{
        paddingHorizontal: 20,
        marginTop: 10,
        fontSize: 24,
        textTransform: 'uppercase'
      }}>{product.productName}</Text>
      <Text style={{
        paddingHorizontal: 20,
        marginTop: 15,
        fontSize: 12,
        letterSpacing: .7,
        opacity: .5,
        lineHeight: 20
      }}>
        {product.description}
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20
      }}>
        <View style={{
          width: 50,
          height: 50,
          backgroundColor: 'rgba(0, 0, 0, .1)',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          marginRight: 10

        }}>
          <MaterialIcons name="place" size={24} color={COLORS.darkOrange} />
        </View>
        <Text style={{
          color: 'rgba(0, 0, 0, .5)'
        }}>
          Самара Южное шоссе 5,{'\n'} ТК 'АМБАР'
        </Text>

      </View>

      <Text style={{
        paddingHorizontal: 35,

        paddingVertical: 20,
        fontSize: 18,
        opacity: .8,
        borderTopColor: '#cccccc',
        borderTopWidth: 1,
        fontWeight: '500'
      }}>
        {product.price} ₽
      </Text>
      <View style={{
        position: 'absolute',
        width: '100%',
        bottom: 20,
        alignItems: 'center'
      }}>
        <TouchableOpacity style={{
          width: '80%',
          alignItems: 'center',
          backgroundColor: COLORS.darkOrange,
          borderRadius: 7,
          padding: 10,
          opacity: product.isAvailable ? 1 : 0.5
        }}
          disabled={!product.isAvailable}
          onPress={onClickAdd}
        >
          <Text style={{
            color: COLORS.white,
          }}>
            В Корзину
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}

export default ProductInfo