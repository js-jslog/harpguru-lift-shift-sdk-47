import { useGlobal } from 'reactn'
import { StyleSheet } from 'react-native'
import type { ViewStyle } from 'react-native'

export const getBaseHarpCellStyles = (): ViewStyle => {
  const [dynamicSizes] = useGlobal('dynamicSizes')
  const { 6: borderRadius } = dynamicSizes
  const width = dynamicSizes['8'] + dynamicSizes['5']
  const height = dynamicSizes['8'] + dynamicSizes['5']
  const styles = StyleSheet.create({
    cell: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius,
      width,
      height,
    },
  })

  return styles.cell
}
