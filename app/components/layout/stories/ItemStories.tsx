import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/native';

interface IItemStories {
  img: any,
  imgStatus: any,
  title: string,
  description: string
}

const ItemStories: FC<IItemStories> = ({ img, imgStatus, title, description }) => {
  const navigation = useNavigation<any>()

  return (
    <TouchableOpacity
      onPress={() => navigation.push('Status', {
        imgStatus: imgStatus,
        description: description
      })}
      style={{
        marginRight: 10,
        alignItems: 'center',
      }}>
      <Image
        source={img}
        style={{
          width: 150,
          height: 150,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: 'rgba(0, 0, 0, .2)'
        }} />
      <Text>
        {title.length >= 20 ? title.slice(0, 20) + '…' : title}
      </Text>
    </TouchableOpacity>
  )
}

export default ItemStories