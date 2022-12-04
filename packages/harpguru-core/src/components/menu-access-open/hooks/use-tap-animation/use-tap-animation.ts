import { withTiming, Easing, useDerivedValue, interpolate } from 'react-native-reanimated'
import { State } from 'react-native-gesture-handler'
import type { TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler'
import React from 'react'

import { usePrevious } from '../../../../hooks'
import { tapAnimationDuration } from '../../../../constants'

type TapEventHandler = (arg0: TapGestureHandlerStateChangeEvent) => void

export const useTapAnimation = (
  openCloseMenu: () => void
): [number, TapEventHandler] => {
  const [isTapped, setIsTapped] = React.useState(false)
  const changedTap = isTapped !== usePrevious(isTapped, isTapped)
  const derivedValue = useDerivedValue(() => {
    return (changedTap ? 1 : 0)
  })
  const timingValue = withTiming(derivedValue.value, {
    duration: tapAnimationDuration,
    easing: Easing.inOut(Easing.circle),
  })
  const animationValue = interpolate(timingValue, [0, 1], isTapped ? [1, 5] : [1, 5])
  const handleTapStateChange = (event: TapGestureHandlerStateChangeEvent) => {
    const { nativeEvent } = event
    if (nativeEvent.state === State.BEGAN) setIsTapped(true)
    if ([State.FAILED, State.CANCELLED].includes(nativeEvent.state))
      setIsTapped(false)
    if (nativeEvent.state === State.END) setIsTapped(false)
  }

  React.useEffect(() => {
    const postAnimation = setTimeout(() => {
      if (changedTap === false) return
      setIsTapped(false)
      openCloseMenu()
    }, tapAnimationDuration)
    return () => {
      clearTimeout(postAnimation)
    }
  }, [changedTap, setIsTapped, openCloseMenu])

  return [animationValue, handleTapStateChange]
}
