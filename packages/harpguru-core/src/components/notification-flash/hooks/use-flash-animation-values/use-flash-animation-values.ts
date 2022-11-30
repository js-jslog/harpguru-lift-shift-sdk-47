import { useTimingTransition } from 'react-native-redash'
import { greaterThan, cond, interpolate, Easing } from 'react-native-reanimated'
import type Animation from 'react-native-reanimated'

import { getWindowDimensions } from '../../../../packages/get-window-dimensions'
import { overlayOpacity } from '../../../../constants'

type FlashAnimationValues = [
  Animation.Node<number>,
  Animation.Node<number>,
  Animation.Node<number>,
  Animation.Node<number>
]

export const useFlashAnimationValues = (
  shouldDisplay: boolean
): FlashAnimationValues => {
  const flashAnimationValue = useTimingTransition(shouldDisplay, {
    duration: 500,
    easing: Easing.inOut(Easing.ease),
  })

  const { longEdge } = getWindowDimensions()
  const guaranteeOffScreenWidth = longEdge

  const messageOpacity = interpolate(flashAnimationValue, {
    inputRange: [0, 1],
    outputRange: [0, overlayOpacity],
  })
  const explosionOpacity = shouldDisplay
    ? interpolate(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [overlayOpacity, 0],
    })
    : interpolate(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [0, 0],
    })
  const messageScale = shouldDisplay
    ? interpolate(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [1, 2],
    })
    : interpolate(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [3, 2],
    })
  const translateX = cond(
    greaterThan(flashAnimationValue, 0),
    0,
    guaranteeOffScreenWidth
  )
  return [translateX, messageScale, explosionOpacity, messageOpacity]
}
