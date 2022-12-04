import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'

import { TapAnimationTypes } from '../../types'
import type { MenuProps, ChildrenProps } from '../../types'
import {
  useScaleAndCallbackOnTap,
  useMenuAnimationValues,
  useScaledMenuLabelProtrusion,
} from '../../hooks'

export const MenuAccessOpen = ({
  isMenuStashed,
  isLabelHidden,
  stashPosition,
  openCloseMenu,
  children,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const { labelCounterScale } = useMenuAnimationValues(
    isMenuStashed,
    isLabelHidden,
    stashPosition
  )
  const scaledLabelProtrusion = useScaledMenuLabelProtrusion()

  const { style } = StyleSheet.create({
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      width: scaledLabelProtrusion,
    },
  })

  const [tapAnimationValue, handleTapStateChange] = useScaleAndCallbackOnTap(
    openCloseMenu,
    [1, 5],
    [1, 5],
    TapAnimationTypes.Unsafe
  )
  const animatedStyle = useAnimatedStyle(() => {
    const totalScaleValue = tapAnimationValue.value + labelCounterScale.value
    return {transform: [{ scale: totalScaleValue}]}
  })

  return (
    <TapGestureHandler onHandlerStateChange={handleTapStateChange}>
      <View style={style}>
        <Animated.View
          style={[
            animatedStyle
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </TapGestureHandler>
  )
}
