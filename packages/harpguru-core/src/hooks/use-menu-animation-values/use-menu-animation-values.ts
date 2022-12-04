import {
  withTiming,
  Easing,
  interpolate,
  interpolateColors,
  useDerivedValue,
} from 'react-native-reanimated'

import { useScaledMenuLabelProtrusion } from '../use-scaled-menu-label-protrusion'
import { getColors } from '../../utils'
import { MenuStashPosition } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'
import {
  menuStashedScale,
  menuScaleTranslationFactor,
  menuStashedYOffsetFactor,
  overlayOpacity,
} from '../../constants'

type MenuAnimationValues = {
  readonly slideX: number
  readonly slideY: number
  readonly scale: number
  readonly backgroundColor: string,
  readonly opacity: number
  readonly labelCounterScale: number
}

export const useMenuAnimationValues = (
  isMenuStashed: boolean,
  isLabelHidden: boolean,
  stashPosition: MenuStashPosition
): MenuAnimationValues => {
  const colors = getColors()
  const RIGHT = 1
  const UP1 = -3
  const UP2 = -2
  const UP3 = -1
  const MIDDLE = 0
  const DOWN1 = 1
  const DOWN2 = 2
  const DOWN3 = 3
  const stashXDirection = RIGHT
  const stashMap: Record<
    MenuStashPosition,
    | typeof UP1
    | typeof UP2
    | typeof UP3
    | typeof MIDDLE
    | typeof DOWN1
    | typeof DOWN2
    | typeof DOWN3
  > = {
    [MenuStashPosition.First]: UP1,
    [MenuStashPosition.Second]: UP2,
    [MenuStashPosition.Third]: UP3,
    [MenuStashPosition.Fourth]: MIDDLE,
    [MenuStashPosition.Fifth]: DOWN1,
    [MenuStashPosition.Sixth]: DOWN2,
    [MenuStashPosition.Seventh]: DOWN3,
  }
  const { [stashPosition]: stashYDirection } = stashMap

  const { shortEdge, longEdge } = getWindowDimensions()
  const animationDuration = 300
  const isMenuStashedDerived = useDerivedValue(() => isMenuStashed ? 1 : 0)
  const stashMenuTiming = withTiming(isMenuStashedDerived.value, {
    duration: animationDuration,
    easing: Easing.inOut(Easing.ease),
  })
  const hideLabelDerived = useDerivedValue(() => isLabelHidden ? 1 : 0)
  const hideLabelTiming = withTiming(hideLabelDerived.value, {
    duration: animationDuration,
    easing: Easing.inOut(Easing.ease),
  })

  const scaledFullX = longEdge * menuScaleTranslationFactor
  const stashedX = longEdge - scaledFullX
  const stashXVector = stashedX * stashXDirection
  const stashXValue = interpolate(stashMenuTiming, [0, 1], [0, stashXVector])
  const stashedY = shortEdge * menuStashedYOffsetFactor
  const scaledStashedY = stashedY * menuScaleTranslationFactor
  const stashedYVector = scaledStashedY * stashYDirection
  const stashYValue = interpolate(stashMenuTiming, [0, 1], [0, stashedYVector])
  const hideLabelVector = useScaledMenuLabelProtrusion() * stashXDirection
  const hideXValue = interpolate(hideLabelTiming, [0, 1], [0, hideLabelVector])
  const slideX = stashXValue + hideXValue
  const slideY = stashYValue
  const scale = interpolate(stashMenuTiming, [0, 1], [1, menuStashedScale])
  const backgroundColor = interpolateColors(stashMenuTiming, {
    inputRange: [0, 1],
    outputColorRange: [colors.pageColor, colors.inertOutline],
  })
  const opacity = interpolate(stashMenuTiming, [0, 1], [overlayOpacity, 1])

  const labelCounterScale = interpolate(scale, [menuStashedScale, 1], [1 / menuStashedScale, 0])

  return {
    slideX,
    slideY,
    scale,
    backgroundColor,
    opacity,
    labelCounterScale,
  }
}
