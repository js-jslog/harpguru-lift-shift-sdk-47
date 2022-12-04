import { interpolate, Easing, withTiming, useDerivedValue } from 'react-native-reanimated'

import { getWindowDimensions } from '../../../../packages/get-window-dimensions'
import { overlayOpacity } from '../../../../constants'

type FlashAnimationValues = [
  number,
  number,
  number,
  number,
]

export const useFlashAnimationValues = (
  shouldDisplay: boolean
): FlashAnimationValues => {
  const derivedValue = useDerivedValue(() => shouldDisplay ? 1 : 0)
  const timingValue = withTiming(derivedValue.value, {
    duration: 500,
    easing: Easing.inOut(Easing.ease),
  })

  const { longEdge } = getWindowDimensions()
  const guaranteeOffScreenWidth = longEdge

  const messageOpacity = interpolate(timingValue, [0, 1], [0, overlayOpacity])
  const explosionOpacity = shouldDisplay
    ? interpolate(timingValue, [0, 1], [overlayOpacity, 0])
    : interpolate(timingValue, [0, 1], [0, 0])
  const messageScale = shouldDisplay
    ? interpolate(timingValue, [0, 1], [1, 2])
    : interpolate(timingValue, [0, 1], [3, 2])
  const translateX = (timingValue > 0 ? 0 : guaranteeOffScreenWidth)
  return [translateX, messageScale, explosionOpacity, messageOpacity]
}
