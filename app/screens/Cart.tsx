import React, { FC } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from 'react-native';

import CartProduct from '../components/layout/cartItem/CartItem';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux'
import { clearProduct, selectCart } from '../redux/slices/cartSlice';
import { COLORS } from '../constants/Colors';
import ModalPopup from '../components/layout/modalPopup/ModalPopup';
import { useAppDispatch } from '../redux/store';



const Cart: FC = ({ navigation }: any) => {
  const [visible, setVisible] = React.useState<boolean>(false)


  const { productCart, totalPrice } = useSelector(selectCart)
  const totalCount = productCart.reduce((sum: number, item) => sum + item.count, 0)


  const sendOrder = () => {
    setVisible(true)
    clearCart()

  }
  const showConfirmDialog = () => {
    return Alert.alert(
      "Вы уверены?",
      "Уверены что хотите очистить корзину?",
      [
        {
          text: "Да",
          onPress: () => {
            clearCart()
          },
        },
        {
          text: "Нет",
        },
      ]
    );
  };
  const dispatch = useAppDispatch()
  const clearCart = () => {
    dispatch(clearProduct())
  }
  const width = Dimensions.get('window').width


  return (
    <View style={{
      position: 'relative',
      height: '100%'
    }}>
      <ModalPopup visible={visible} setVisible={setVisible} />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}
          style={{
            width: 35,
            height: 35,
            elevation: 5,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            margin: 15,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Ionicons name="chevron-back" size={24} color={COLORS.gray} />
        </TouchableOpacity>
        <Text>
          Детали заказа
        </Text>
        <TouchableOpacity style={{
          width: 35,
          height: 35,
          elevation: 5,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          margin: 15,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: .9
        }}
          onPress={showConfirmDialog}>
          <MaterialCommunityIcons name="cart-off" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{
        maxHeight: '54%'
      }}
      >
        {productCart.length > 0 ? productCart.map((product, i) => {
          return (
            <CartProduct {...product} key={i} />
          )
        }) : <View style={{
          alignItems: 'center'
        }}>
          <Image source={require('../assets/img/ooops.png')}
            style={{
              width: Dimensions.get('window').width,
            }} />
          <Text style={{
            fontSize: 30,
            fontWeight: '700',
            color: 'rgba(0, 0, 0, .8)',
            marginVertical: 20
          }}>Ууупс</Text>
          <Text style={{
            fontSize: 18,
            color: 'rgba(0, 0, 0, .6)'
          }}>Ваша корзина пустая</Text>
        </View>
        }
      </ScrollView>

      <View style={{
        position: 'absolute',
        width: '100%',
        bottom: 20,
        alignItems: 'center'
      }}>
        <View style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: COLORS.white,
          borderRadius: 15,
          width: '90%',
          elevation: 5
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text>Количество товара:</Text>
            <Text>{totalCount}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text>Итоговая сумма:</Text>
            <Text>{totalPrice}</Text>
          </View>
        </View>
        <View style={{
          padding: 20,
          marginVertical: 10,
          backgroundColor: COLORS.white,
          borderRadius: 15,
          width: '90%',
          elevation: 5

        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Text>
              Способ получения:
            </Text>
            <Text style={{
              color: 'rgba(0, 0, 0, .7)'
            }}>
              Самовывоз
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10
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
        </View>
        <TouchableOpacity style={{
          width: '80%',
          alignItems: 'center',
          backgroundColor: COLORS.orange,
          borderRadius: 7,
          padding: 10,
          elevation: 5,
          opacity: productCart.length > 0 ? 1 : 0.5
        }}
          disabled={productCart.length > 0 ? false : true}
          onPress={sendOrder}
        >
          <Text style={{
            color: COLORS.white,
          }}>
            Оформить заказ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});

export default Cart