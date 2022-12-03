import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View, StyleSheet } from 'react-native'
import React from 'react'

import type { MenuProps, ChildrenProps } from '../../types'
import {
  useScaledMenuLabelProtrusion,
} from '../../hooks'

export const MenuAccessOpen = ({
  isMenuStashed,
  isLabelHidden,
  stashPosition,
  openCloseMenu,
  children,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const scaledLabelProtrusion = useScaledMenuLabelProtrusion()

  const { style } = StyleSheet.create({
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      width: scaledLabelProtrusion,
    },
  })

  return (
    <TapGestureHandler>
      <View style={style}>
        <Animated.View>
          {children}
        </Animated.View>
      </View>
    </TapGestureHandler>
  )
}
