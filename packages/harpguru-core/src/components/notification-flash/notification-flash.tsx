import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import React from 'react'
import type { ReactElement } from 'react'

import { getColors } from '../../utils'
import { ChildrenProps } from '../../types'

type NotificationFlashProps = ChildrenProps & {
  readonly shouldDisplay: boolean
}

export const NotificationFlash = ({
  shouldDisplay,
  children,
}: NotificationFlashProps): ReactElement => {

  const colors = getColors()

  const styles = StyleSheet.create({
    pinkExplosion: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 10,
      backgroundColor: colors.harpguruPink,
    },
    messageUnderlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 11,
      backgroundColor: colors.pageColor,
    },
    message: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 12,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  })

  return (
    <>
      <Animated.View
        style={[
          styles.pinkExplosion,
          {
            opacity: 0,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.messageUnderlay,
          {
            opacity: 0,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.message,
          {
            opacity: 0,
          },
        ]}
      >
        {children}
      </Animated.View>
    </>
  )
}
