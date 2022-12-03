import { useTimingTransition } from 'react-native-redash'
import {
  EasingNode,
  interpolateNode,
  interpolateColors,
  sub,
  multiply,
  add,
  divide,
} from 'react-native-reanimated'
import type { Node } from 'react-native-reanimated'

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
  readonly slideX: Node<number>
  readonly slideY: Node<number>
  readonly scale: Node<number>
  readonly backgroundColor: Node<number>
  readonly opacity: Node<number>
  readonly labelCounterScale: Node<number>
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
  const stashMenuTiming = useTimingTransition(isMenuStashed, {
    duration: animationDuration,
    easing: EasingNode.inOut(EasingNode.ease),
  })
  const hideLabelTiming = useTimingTransition(isLabelHidden, {
    duration: animationDuration,
    easing: EasingNode.inOut(EasingNode.ease),
  })

  const scaledFullX = multiply(longEdge, menuScaleTranslationFactor)
  const stashedX = sub(longEdge, scaledFullX)
  const stashXVector = multiply(stashedX, stashXDirection)
  const stashXValue = interpolateNode(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [0, stashXVector],
  })
  const stashedY = multiply(shortEdge, menuStashedYOffsetFactor)
  const scaledStashedY = multiply(stashedY, menuScaleTranslationFactor)
  const stashedYVector = multiply(scaledStashedY, stashYDirection)
  const stashYValue = interpolateNode(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [0, stashedYVector],
  })
  const hideLabelVector = multiply(
    useScaledMenuLabelProtrusion(),
    stashXDirection
  )
  const hideXValue = interpolateNode(hideLabelTiming, {
    inputRange: [0, 1],
    outputRange: [0, hideLabelVector],
  })
  const slideX = add(stashXValue, hideXValue)
  const slideY = stashYValue
  const scale = interpolateNode(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [1, menuStashedScale],
  })
  const backgroundColor = interpolateColors(stashMenuTiming, {
    inputRange: [0, 1],
    outputColorRange: [colors.pageColor, colors.inertOutline],
  })
  const opacity = interpolateNode(stashMenuTiming, {
    inputRange: [0, 1],
    outputRange: [overlayOpacity, 1],
  })

  const labelCounterScale = interpolateNode(scale, {
    inputRange: [menuStashedScale, 1],
    outputRange: [divide(1, menuStashedScale), 0],
  })

  return {
    slideX,
    slideY,
    scale,
    backgroundColor,
    opacity,
    labelCounterScale,
  }
}
