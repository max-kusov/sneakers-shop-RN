import { View, Text, Image, StatusBar, TouchableOpacity, Animated, Dimensions } from 'react-native'
import React from 'react'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../../constants/Colors';


const Status = ({ navigation, route }: any) => {
  const { description } = route.params
  const { imgStatus } = route.params

  const [progress, setProgress] = React.useState(new Animated.Value(0))

  React.useEffect(() => {
    let timer = setTimeout(() => {
      navigation.goBack()
    }, 5000)

    Animated.timing(progress, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false
    }).start()
    return () => clearTimeout(timer)
  }, [])

  const progressAnimated = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%']
  })

  return (
    <View style={{
      backgroundColor: COLORS.black,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      <StatusBar backgroundColor='#000' barStyle='light-content' />
      <View style={{
        height: 4,
        width: '95%',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, .4)',
        position: 'absolute',
        top: 40,
        zIndex: 99
      }}>
        <Animated.View
          style={{
            backgroundColor: COLORS.white,
            width: progressAnimated,
            height: '100%'
          }}>

        </Animated.View>
      </View>

      <TouchableOpacity style={{
        position: 'absolute',
        right: 10,
        top: 60
      }} onPress={() => navigation.goBack()}>
        <MaterialIcons name="close" size={22} color='rgba(255, 255, 255, 0.75);' />
      </TouchableOpacity>
      <Image source={imgStatus}
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: 300,
        }}
      />
      <Text style={{
        fontSize: 30,
        position: 'absolute',
        top: 120,
        backgroundColor: 'orange',
        color: COLORS.white,
        borderRadius: 5,
        padding: 10,
        textAlign: 'center'
      }}>{description}</Text>
    </View>
  )
}

export default Status