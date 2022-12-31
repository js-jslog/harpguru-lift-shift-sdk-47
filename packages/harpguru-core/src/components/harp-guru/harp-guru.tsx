import { useWindowDimensions } from 'use-dimensions'
import { createProvider } from 'reactn'
import Animated, { useSharedValue, useAnimatedStyle, interpolate, useDerivedValue, withTiming } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { HarpGuruPage } from '../harp-guru-page'
import type { PageNumber } from '../../types'
import { getWindowDimensions } from '../../packages/get-window-dimensions'

import { getInitialGlobalState } from './utils'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

const Provider1 = createProvider(getInitialGlobalState(1))
const Provider2 = createProvider(getInitialGlobalState(2))

export const HarpGuru = (): ReactElement => {
  useWindowDimensions()

  const { shortEdge: offScreen } = getWindowDimensions()

  const pageOnDisplay = useSharedValue<PageNumber>(1)
  const pageDropTimingValue = useDerivedValue(() => withTiming(pageOnDisplay.value))
  const page1YAnimationStyle = useAnimatedStyle(() => {
    const translateY = interpolate(pageDropTimingValue.value, [1, 1.9, 2], [0, offScreen, offScreen * 10])
    return { transform: [{ translateY }]}
  })

  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <>
      <Provider2>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
          ]}
        >
          <HarpGuruPage pageOnDisplay={pageOnDisplay} thisPage={2} />
        </Animated.View>
      </Provider2>
      <Provider1>
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            page1YAnimationStyle
          ]}
        >
          <HarpGuruPage pageOnDisplay={pageOnDisplay} thisPage={1} />
        </Animated.View>
      </Provider1>
    </>
    </GestureHandlerRootView>
  )
}
