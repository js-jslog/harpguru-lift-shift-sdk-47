import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default () => {
  const randomNumber = useSharedValue(100);

  const style = useAnimatedStyle(() => {
    return {
      width: withSpring(randomNumber.value),
      height: withSpring(randomNumber.value, { stiffness: 10 }),
    };
  });

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
          randomNumber.value = Math.random() * 350;
        }}
      >
        <Animated.Image
          source={require('./assets/icon.png')}
          resizeMode="contain"
          style={style}
        />
      </TouchableOpacity>
    </View>
  );
};
