import React, { FC } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux'
import { fetchItems, selectProducts, Status } from '../redux/slices/fetchSlice';

import Stories from '../components/layout/stories/Stories';
import BlockItems from '../components/layout/blockItems/BlockItems';
import { COLORS } from '../constants/Colors';
import { selectCart } from '../redux/slices/cartSlice';
import { useAppDispatch } from '../redux/store';


const Home: FC = () => {
  const navigation = useNavigation<any>()

  const dispatch = useAppDispatch()
  const fetchProducts = () => {
    dispatch(fetchItems())
  }

  const { productCart } = useSelector(selectCart)
  const { products, status } = useSelector(selectProducts)

  React.useEffect(fetchProducts, [])
  // redux ????
  const totalCount = productCart.reduce((sum: number, item) => sum + item.count, 0)

  const err = () => Alert.alert('Ошибка', 'Не удалось получить товары')

  const loadingView = () => {
    return (
      <View style={{
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ActivityIndicator size='large' />
        <Text>Загрузка</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1 }}
      refreshControl={<RefreshControl refreshing={status === 'loading'} onRefresh={fetchProducts} />}>
      <View style={{
        marginTop: 35,
        width: '100%',
        alignItems: 'flex-end'
      }}>
        <TouchableOpacity onPress={() => navigation.push('Cart')}
          style={{
            width: 35,
            height: 35,
            elevation: 5,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {totalCount <= 0 ? false :
            <View style={{
              backgroundColor: 'orange',
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
      <Stories />

      <>
        {status === Status.ERROR ? err() :
          <View style={{
            width: '100%',
            marginBottom: 30
          }}>
            {status === Status.LOADING ? loadingView() :
              <View>
                <BlockItems category={'product'} items={products} title={'Кроссовки'} />
                <BlockItems category={'accessories'} items={products} title={'Аксессуары'} />
              </View>
            }
          </View>
        }
      </>
    </ ScrollView>
  );
}

export default Home


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });