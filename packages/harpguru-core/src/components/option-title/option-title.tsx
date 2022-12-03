import Animated from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import React from 'react'

import { useOptionSizes } from '../../hooks'

export type OptionTitleProps = {
  readonly useTitle: () => React.ReactElement
}

export const OptionTitle = ({
  useTitle,
}: OptionTitleProps): React.ReactElement => {
  const title = useTitle()

  const styles = useOptionSizes()
  const { wrapper, gutterSpacer } = StyleSheet.create({
    wrapper: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    gutterSpacer: {
      position: 'absolute',
      left: styles.smallGutter,
    },
  })
  return (
    <Animated.View style={[wrapper, { opacity: 0 }]}>
      <View style={gutterSpacer}>{title}</View>
    </Animated.View>
  )
}
