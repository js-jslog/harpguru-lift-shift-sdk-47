import { useTimingTransition } from 'react-native-redash'
import { EasingNode, interpolateNode, Node } from 'react-native-reanimated'

import { tapAnimationDuration } from '../../../../constants'

export const useTapAnimationValue = (isTapped: boolean): Node<number> => {
  const timingValue = useTimingTransition(isTapped, {
    duration: tapAnimationDuration,
    easing: EasingNode.inOut(EasingNode.circle),
  })
  const animationValue = interpolateNode(timingValue, {
    inputRange: [0, 1],
    outputRange: isTapped ? [0.5, 1] : [1, 1],
  })

  return animationValue
}
