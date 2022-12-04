import { Easing, interpolate, withTiming, useDerivedValue, useSharedValue  } from 'react-native-reanimated'

import { tapAnimationDuration } from '../../../../constants'

export const useTapAnimationValue = (isTapped: boolean): number => {
  const sharedValue = useSharedValue(isTapped)
  const derivedValue = useDerivedValue(() => {
    return (sharedValue ? 1 : 0)
  })
  const timingValue = withTiming(derivedValue.value, {
    duration: tapAnimationDuration,
    easing: Easing.inOut(Easing.circle)
  })
  const animationValue = interpolate(timingValue, [0, 1], isTapped ? [0.5, 1] : [1, 1])

  return animationValue
}
