import Animated from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { getColors } from '../../utils'
import { useOptionSizes } from '../../hooks'

import { useOptionStackPointerProperties } from './hooks'

export type OptionStackPointerProps = {
  readonly stackLength: number
  readonly direction: 'NEXT' | 'PREVIOUS'
}

export const OptionStackPointer = (
  props: OptionStackPointerProps
): React.ReactElement => {
  const {
    nextInStack,
    prevInStack,
  } = useOptionStackPointerProperties(props)
  const { largeFont } = useOptionSizes()

  const colors = getColors()

  const { direction } = props
  const onPress = direction === 'NEXT' ? nextInStack : prevInStack
  const icon = direction === 'NEXT' ? 'up' : 'down'

  return (
    <Animated.View>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name={icon} size={largeFont} color={colors.inertOutline} />
      </TouchableOpacity>
    </Animated.View>
  )
}
