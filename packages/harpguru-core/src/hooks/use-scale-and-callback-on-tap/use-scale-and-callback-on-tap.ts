import { Easing, interpolate, useDerivedValue, withTiming } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { State } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import React from 'react'

import { TapAnimationTypes } from '../../types'
import { tapAnimationDuration } from '../../constants'

type TapEventHandler = (arg0: TapGestureHandlerStateChangeEvent) => void

export const useScaleAndCallbackOnTap = (
  callback: () => void,
  scaleIn: [number, number],
  scaleOut: [number, number],
  tapAnimationType: TapAnimationTypes
): [SharedValue<number>, TapEventHandler] => {
  const [isTapped, setIsTapped] = React.useState(false)
  const [isTimeForCallback, setIsTimeForCallback] = React.useState(false)
  const shouldAnimateOut = tapAnimationType === TapAnimationTypes.Unsafe
  const animationValue = useDerivedValue(() => {
    const timingValue = withTiming((isTapped ? 1 : 0), {
      duration: tapAnimationDuration,
      easing: Easing.inOut(Easing.circle),
    })
    return interpolate(timingValue, [0, 1], (isTapped ? scaleIn : scaleOut))
  })
  const handleTapStateChange = (event: TapGestureHandlerStateChangeEvent) => {
    const {
      nativeEvent: { state },
    } = event
    const tapStart = state === State.BEGAN
    const tapFail = [
      State.FAILED,
      State.CANCELLED,
      State.UNDETERMINED,
    ].includes(state)
    const tapEnd = state === State.END
    if (tapStart) setIsTapped(true)
    if (tapFail) setIsTapped(false)
    if (!tapEnd || shouldAnimateOut) return
    setIsTapped(false)
    callback()
  }

  React.useEffect(() => {
    const returnToOriginalScale = setTimeout(() => {
      if (isTapped === false || !shouldAnimateOut) return
      setIsTapped(false)
      setIsTimeForCallback(true)
    }, tapAnimationDuration)
    return () => {
      clearTimeout(returnToOriginalScale)
    }
  }, [isTapped, setIsTapped, shouldAnimateOut, setIsTimeForCallback])

  React.useEffect(() => {
    const runCallback = setTimeout(() => {
      if (isTimeForCallback === false || !shouldAnimateOut) return
      setIsTimeForCallback(false)
      callback()
    }, tapAnimationDuration)
    return () => {
      clearTimeout(runCallback)
    }
  }, [isTimeForCallback, setIsTimeForCallback, shouldAnimateOut, callback])

  return [animationValue, handleTapStateChange]
}
