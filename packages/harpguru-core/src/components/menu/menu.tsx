import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'

import type { MenuProps, ChildrenProps } from '../../types'
import {
  useScaledMenuLabelProtrusion,
} from '../../hooks'

export const Menu = ({
  isMenuStashed,
  isLabelHidden,
  stashPosition,
  children,
}: MenuProps & ChildrenProps): React.ReactElement => {
  const scaledLabelProtrusion = useScaledMenuLabelProtrusion()

  const [dynamicSizes] = useGlobal('dynamicSizes')
  const { 9: borderRadius } = dynamicSizes
  const styles = StyleSheet.create({
    animated: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      left: scaledLabelProtrusion * -1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderRadius,
    },
  })

  return (
    <Animated.View
      style={[
        styles.animated,
        {
          // WARNING: the order these transforms are listed is
          // important. I think the size of the translations
          // will be reduced proportionally to the scaling if
          // the scaling is performed first. This is platform
          // independent.
        },
      ]}
    >
      <Animated.View
        style={[
          styles.overlay,
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  )
}
