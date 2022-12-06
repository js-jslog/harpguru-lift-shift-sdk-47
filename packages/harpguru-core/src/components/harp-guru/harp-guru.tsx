import { useWindowDimensions } from 'use-dimensions'
import { createProvider } from 'reactn'
import Animated, { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated'
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
  const page1YAnimationStyle = useAnimatedStyle(() => {
    // TODO: Make sure that 3 is far enough off the screen for there to
    // not be any spillover when things like the notification flashes are
    // in effect.
    // I've been struggling to get interpolation to work, and spring is
    // really simple and looks good so I don't want to waste time with
    // other functions I might not need anywhere else.
    const translateY = withSpring(pageOnDisplay.value === 1 ? 0 : offScreen * 3, {
      overshootClamping: true,
    })
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
