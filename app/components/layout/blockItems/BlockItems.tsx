import React, { FC } from 'react'
import { View, Text, ScrollView } from 'react-native'

import ProductCard from '../productCart/ProductCard'
import { COLORS } from '../../../constants/Colors'
import { ProductType } from '../../../redux/slices/fetchSlice'

interface IBlockItems {
  category: string
  items: ProductType[]
  title: string
}

const BlockItems: FC<IBlockItems> = ({ category, items, title }) => {

  return (
    <View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 20
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 18,
            color: 'rgba(0, 0, 0, .8)'
          }}>
            {title}
          </Text>
          <Text style={{
            fontSize: 18,
            color: 'rgba(0, 0, 0, .5)',
            marginLeft: 10
          }}>
            4
          </Text>
        </View>
        <Text style={{
          color: COLORS.orange,
        }}>
          Все
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          flexDirection: 'row',
          marginTop: 15,
          paddingLeft: 20
        }}>
        {items.map((item) => {
          if (item.category === category) {
            return (
              <ProductCard key={item.id} {...item} />
            )
          }
        })}
      </ScrollView>
    </View>
  )
}

export default BlockItems