import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../constants/Colors';
import { ProductType } from '../../../redux/slices/fetchSlice';


const isAvail = () => {
  return (
    <>
      <View style={{
        height: 7,
        width: 7,
        borderRadius: 7,
        backgroundColor: COLORS.orange,
      }} />
      <Text style={{
        color: COLORS.orange,
        marginLeft: 5,
        fontSize: 12
      }}>В наличии</Text>
    </>
  )
}

const ProductCard: FC<ProductType> = ({ productName, price, productImg, isAvailable, id }) => {
  const navigation = useNavigation<any>()

  const activeColor = isAvailable ? COLORS.orange : COLORS.red

  return (
    <TouchableOpacity
      onPress={() => navigation.push('ProductInfo', { productId: id })}
      activeOpacity={.6}
    >
      <View style={{
        backgroundColor: COLORS.white,
        padding: 10,
        minWidth: 180,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: 'rgba(0, 0, 0, .05)',
        borderWidth: 1,
        shadowColor: COLORS.orange,
        elevation: 5,
        alignItems: 'flex-start',
        marginRight: 10,
      }}>
        <View style={{
          alignItems: 'center',
          width: '100%'
        }}>
          <Image source={{ uri: productImg }}
            style={{
              width: 150,
              height: 150,
              opacity: isAvailable ? 1 : .5
            }} />
        </View>
        <View >
          <Text>
            {productName.length >= 25 ? productName.slice(0, 25) + '…' : productName}
          </Text>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <View style={{
              height: 7,
              width: 7,
              borderRadius: 7,
              backgroundColor: activeColor,
            }} />
            <Text style={{
              color: activeColor,
              marginLeft: 5,
              fontSize: 12
            }}>
              {isAvailable ? 'В наличии' : 'Товар закончился'}
            </Text>
          </View>
          <Text style={{
            opacity: .6
          }}>
            {price}₽
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard