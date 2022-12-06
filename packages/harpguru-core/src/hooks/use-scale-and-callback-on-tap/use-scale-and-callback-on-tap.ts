import { useDerivedValue, useAnimatedGestureHandler, runOnJS, withSpring } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import type { GestureEvent, TapGestureHandlerEventPayload } from 'react-native-gesture-handler'
import React from 'react'

type GestureHandler = (arg0: GestureEvent<TapGestureHandlerEventPayload>) => void

export const useScaleAndCallbackOnTap = (
  callback: () => void,
  // TODO: Consider putting the scale in & scale out
  // params back. These might still be useful for the
  // menu close component.
): [SharedValue<number>, GestureHandler] => {
  const [isTapped, setIsTapped] = React.useState(false)
  const setIsTappedWrapper = (isTapped: boolean) => {
    setIsTapped(isTapped)
  }
  const animationValue = useDerivedValue(() => {
    const timingValue = withSpring((isTapped ? 50 : 1))
    return timingValue
  }, [isTapped])

  const gestureHandler = useAnimatedGestureHandler<GestureEvent<TapGestureHandlerEventPayload>>({
    onStart: () => {
      runOnJS(setIsTappedWrapper)(true)
    },
    onCancel: () => {
      runOnJS(setIsTappedWrapper)(false)
    },
    onFail: () => {
      runOnJS(setIsTappedWrapper)(false)
    },
    onEnd: () => {
      runOnJS(setIsTappedWrapper)(false)
      runOnJS(callback)()
    },
    onFinish: () => {
      runOnJS(setIsTappedWrapper)(false)
    }
  }, [setIsTappedWrapper])

  return [animationValue, gestureHandler]
}
