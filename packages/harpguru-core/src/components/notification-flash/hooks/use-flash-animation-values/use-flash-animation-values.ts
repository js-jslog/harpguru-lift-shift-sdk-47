import { useTimingTransition } from 'react-native-redash'
import { greaterThan, cond, interpolateNode, EasingNode } from 'react-native-reanimated'
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
    easing: EasingNode.inOut(EasingNode.ease),
  })

  const { longEdge } = getWindowDimensions()
  const guaranteeOffScreenWidth = longEdge

  const messageOpacity = interpolateNode(flashAnimationValue, {
    inputRange: [0, 1],
    outputRange: [0, overlayOpacity],
  })
  const explosionOpacity = shouldDisplay
    ? interpolateNode(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [overlayOpacity, 0],
    })
    : interpolateNode(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [0, 0],
    })
  const messageScale = shouldDisplay
    ? interpolateNode(flashAnimationValue, {
      inputRange: [0, 1],
      outputRange: [1, 2],
    })
    : interpolateNode(flashAnimationValue, {
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
