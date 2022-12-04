import { Easing, interpolate, withTiming, useDerivedValue } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'

import { tapAnimationDuration } from '../../../../constants'

export const useTapAnimationValue = (isTapped: boolean): SharedValue<number> => {
  const animationValue = useDerivedValue(() => {
    const timingValue = withTiming((isTapped ? 1 : 0), {
      duration: tapAnimationDuration,
      easing: Easing.inOut(Easing.circle)
    })
    return interpolate(timingValue, [0, 1], isTapped ? [0.5, 1] : [1, 1])
  })

  return animationValue
}
