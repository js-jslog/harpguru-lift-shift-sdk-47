import { useGlobal } from 'reactn'
import Animated from 'react-native-reanimated'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { getColors } from '../../utils'
import type { MenuProps } from '../../types'

export const MenuAccessClose = ({
  openCloseMenu,
}: Pick<MenuProps, 'openCloseMenu'>): React.ReactElement => {
  const [staticSizes] = useGlobal('staticSizes')

  return (
    <TapGestureHandler>
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: staticSizes['6'],
          height: staticSizes['10'],
        }}
      >
        <Animated.View
        >
          <AntDesign
            name="close"
            size={staticSizes['9']}
            color={getColors().inertOutline}
          />
        </Animated.View>
      </View>
    </TapGestureHandler>
  )
}
