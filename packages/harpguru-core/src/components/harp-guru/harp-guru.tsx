import 'react-native-gesture-handler'

import { useWindowDimensions } from 'use-dimensions'
import { createProvider } from 'reactn'
import { StyleSheet, View } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { HarpGuruPage } from '../harp-guru-page'

import { getInitialGlobalState } from './utils'

const Provider1 = createProvider(getInitialGlobalState(1))
const Provider2 = createProvider(getInitialGlobalState(2))

export const HarpGuru = (): ReactElement => {
  useWindowDimensions()

  // The strange decimal stopoff on the way to the next integer
  // in each of these is to allow the animation to appear to
  // take the page just barely out of frame, but to then take
  // it a great distance away at the end. This means the animation
  // is as smooth as possible, but the page is well out of the
  // way in case any animated objects move outside of it's page
  // frame towards interferring with the next page.

  return (
    <>
      <Provider2>
        <View
          style={[
            { ...StyleSheet.absoluteFillObject },
          ]}
        >
          <HarpGuruPage pageOnDisplay={false} thisPage={2} />
        </View>
      </Provider2>
      <Provider1>
        <View
          style={[
            { ...StyleSheet.absoluteFillObject },
          ]}
        >
          <HarpGuruPage pageOnDisplay={true} thisPage={1} />
        </View>
      </Provider1>
    </>
  )
}
