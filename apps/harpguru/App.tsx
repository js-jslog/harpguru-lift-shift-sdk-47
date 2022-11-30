import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { greetingagain } from 'cool-package2'
import { greeting } from 'cool-package'

export default () => {
  const randomNumber = useSharedValue(100)

  const style = useAnimatedStyle(() => {
    return {
      width: withSpring(randomNumber.value),
      height: withSpring(randomNumber.value, { stiffness: 10 }),
    }
  })

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#7CA1B4',
      }}
    >
      <TouchableOpacity
        onPress={() => {
          randomNumber.value = Math.random() * 350
        }}
      >
        <Animated.Image
          source={require('./assets/icon.png')}
          resizeMode="contain"
          style={style}
        />
      </TouchableOpacity>
      <Text>{greeting}</Text>
      <Text>{greetingagain}</Text>
    </View>
  )
}
