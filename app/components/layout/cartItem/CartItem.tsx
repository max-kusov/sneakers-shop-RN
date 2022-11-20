import React, { FC } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { Feather, MaterialIcons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux'
import { addProduct, removeProduct, minusProduct, selectCartItemById, CartItem } from '../../../redux/slices/cartSlice';
import { useAppDispatch } from '../../../redux/store';


const CartProduct: FC<CartItem> = ({ productName, price, productImg, id }) => {
  const { count }: any = useSelector(selectCartItemById(id))

  const dispatch = useAppDispatch()

  const onPressPlus = () => {
    dispatch(addProduct({ id } as CartItem))
  }
  const onPressMinus = () => {
    if (count <= 1) {
      dispatch(removeProduct(id))
    } else {
      dispatch(minusProduct(id))
    }
  }
  const onPressDelete = () => {
    dispatch(removeProduct(id))
  }

  return (
    <View style={{
      flexDirection: 'row',
      paddingHorizontal: 25,
      marginVertical: 5,

    }}>
      <Image source={{ uri: productImg }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10
        }} />
      <View style={{
        paddingHorizontal: 10,
        width: '75%',
        height: 100
      }}>
        <View style={{
          height: '60%'
        }}>
          <Text style={{
            fontSize: 14,
          }}>
            {productName}
          </Text>
          <Text style={{
            opacity: .7,
            fontSize: 16
          }}>
            {price * count} ₽
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // marginTop: 20
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <TouchableOpacity onPress={onPressMinus}>
              <Feather name="minus-circle" size={30} color="#d8784d" />
            </TouchableOpacity>
            <Text style={{
              marginHorizontal: 10,
              fontSize: 20
            }}>{count}</Text>
            <TouchableOpacity onPress={onPressPlus}>
              <Feather name="plus-circle" size={30} color="#d8784d" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onPressDelete}>
            <MaterialIcons name="delete-forever" size={26} color="rgba(0, 0, 0, .3)" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default CartProduct