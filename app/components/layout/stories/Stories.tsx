import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ItemStories from './ItemStories';



const saleStories = [
  {
    img: require('./img/sale.jpg'),
    imgStatus: require('./img/sale.jpg'),
    title: 'Распродажа 50%',
    description: 'Распродажа летней коллекции'
  },
  {
    img: require('./img/friday.jpg'),
    imgStatus: require('./img/friday.jpg'),
    title: 'Черная пятница',
    description: 'Скидки на новую коллекцию'
  },
  {
    img: require('./img/delivery.jpg'),
    imgStatus: require('./img/delivery.jpg'),
    title: 'Бесплатная доставка',
    description: 'Бесплатная доставка при заказе от 5000руб'
  }
]

const Stories = () => {

  return (
    <View style={{
      width: '100%',
      paddingLeft: 20,
    }}>
      <Text style={{
        fontSize: 20,
        opacity: .8
      }}>
        Акции
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          flexDirection: 'row',
          marginTop: 10,
          overflow: 'hidden',
        }}>

        {
          saleStories.map((item, i) => {
            return (
              <ItemStories key={i} img={item.img} imgStatus={item.imgStatus} title={item.title} description={item.description} />
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default Stories