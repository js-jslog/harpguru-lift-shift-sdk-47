import { StyleSheet, View } from 'react-native'
import React from 'react'
import type { Pozition, Pitch } from 'harpparts'

import { TextWithoutOSScale } from '../text-without-os-scale'
import { getColors } from '../../utils'
import { useOptionSizes } from '../../hooks'

export type OptionValueProps = {
  readonly value: Pozition | Pitch | string
  readonly alignItems: 'flex-start' | 'center' | 'flex-end'
  readonly isHighlighted?: boolean
  readonly isLarge: boolean
  readonly twoColumns: boolean
}

export const OptionValue = ({
  value,
  alignItems,
  isLarge,
  isHighlighted = false,
  twoColumns,
}: OptionValueProps): React.ReactElement => {
  const colors = getColors()
  const {
    highlightOffset,
    highlightHeight,
    smallFont,
    itemWidth,
    largeFont,
    superscriptFont,
  } = useOptionSizes()
  const {
    textWrapperBase,
    highlightStyle,
    textStyle,
    largeStyle,
    twoColumnsStyle,
    superScriptStyle,
  } = StyleSheet.create({
    textWrapperBase: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: alignItems,
    },
    highlightStyle: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: highlightOffset,
      height: highlightHeight,
      backgroundColor: colors.harpguruPink,
    },
    textStyle: {
      fontSize: smallFont,
      color: colors.inertOutline,
    },
    largeStyle: {
      fontWeight: 'bold',
      fontSize: largeFont,
      color: colors.inertOutline,
    },
    twoColumnsStyle: {
      width: itemWidth,
    },
    superScriptStyle: {
      fontSize: superscriptFont,
    },
  })
  const extraHighlightStyle = isLarge ? [] : [{ bottom: 0 }]
  const highlightElement = isHighlighted ? (
    <View style={[highlightStyle, extraHighlightStyle]}></View>
  ) : (
    <></>
  )
  const isLargeStyle = isLarge ? [largeStyle] : []
  const isTwoColumnsStyle = twoColumns ? [twoColumnsStyle] : []
  const [regularscript, superscript] =
    typeof value !== 'string' ? value.simpleSplitValue : [value, '']
  const optionText = (
    <View style={{ width: '100%' }}>
      {highlightElement}
      <View style={[textWrapperBase, isTwoColumnsStyle]}>
        <TextWithoutOSScale style={[textStyle, isLargeStyle]}>
          {regularscript}
        </TextWithoutOSScale>
        <TextWithoutOSScale style={[textStyle, superScriptStyle]}>
          {superscript}
        </TextWithoutOSScale>
      </View>
    </View>
  )
  return optionText
}
