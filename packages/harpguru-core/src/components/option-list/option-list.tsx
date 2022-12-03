import Animated, { interpolateNode } from 'react-native-reanimated'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, View } from 'react-native'
import React from 'react'

import type { OptionLabelProps } from '../option-label'
import type { WithTransition } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import { useOptionSizes } from '../../hooks'

export type OptionListProps = WithTransition & {
  readonly useItems: () => ReadonlyArray<React.ReactElement>
  readonly twoColumns?: boolean
  readonly useLeftColumnLabel?: () => React.ReactElement<OptionLabelProps>
  readonly useRightColumnLabel?: () => React.ReactElement<OptionLabelProps>
}

export const OptionList = ({
  useItems,
  twoColumns = false,
  useLeftColumnLabel = () => <></>,
  useRightColumnLabel = () => <></>,
  transitionValue,
}: OptionListProps): React.ReactElement => {
  const { largeGutter, itemWidth, internalGutter } = useOptionSizes()
  const { longEdge } = getWindowDimensions()
  const { common, left, right } = StyleSheet.create({
    common: {
      position: 'absolute',
      height: '100%',
      justifyContent: 'center',
    },
    left: {
      right: largeGutter + itemWidth * 2 + internalGutter,
      alignItems: 'flex-end',
    },
    right: {
      left: longEdge - largeGutter + internalGutter,
      alignItems: 'flex-start',
    },
  })

  const leftColumnLabel = useLeftColumnLabel()
  const rightColumnLabel = useRightColumnLabel()

  const translateX = interpolateNode(transitionValue, {
    inputRange: [0, 1],
    outputRange: [longEdge, 0],
  })

  return (
    <Animated.View
      style={{
        ...StyleSheet.absoluteFillObject,
        transform: [
          {
            translateX: translateX,
          },
        ],
        opacity: transitionValue,
      }}
    >
      <View style={[common, left]}>{leftColumnLabel}</View>
      <View style={[common, right]}>{rightColumnLabel}</View>
      <FlatList
        contentContainerStyle={{
          alignItems: 'flex-end',
          paddingRight: largeGutter,
        }}
        data={useItems()}
        numColumns={twoColumns ? 2 : 1}
        renderItem={({ item }) => <>{item}</>}
        keyExtractor={(_item, index) => `${index}`}
      />
    </Animated.View>
  )
}
