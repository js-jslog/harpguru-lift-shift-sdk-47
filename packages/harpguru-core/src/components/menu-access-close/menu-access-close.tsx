import { useGlobal } from 'reactn'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { getColors } from '../../utils'
import type { MenuProps } from '../../types'
import { useScaleAndCallbackOnTap } from '../../hooks'

export const MenuAccessClose = ({
  openCloseMenu,
}: Pick<MenuProps, 'openCloseMenu'>): React.ReactElement => {
  const [staticSizes] = useGlobal('staticSizes')

  const [tapAnimationValue, gestureHandler] = useScaleAndCallbackOnTap(
    openCloseMenu,
  )
  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: tapAnimationValue.value }]}
  })

  return (
    <TapGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: staticSizes['6'],
          height: staticSizes['10'],
        }}
      >
        <Animated.View
          style={[
            animatedStyle
          ]}
        >
          <AntDesign
            name="close"
            size={staticSizes['9']}
            color={getColors().inertOutline}
          />
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  )
}
