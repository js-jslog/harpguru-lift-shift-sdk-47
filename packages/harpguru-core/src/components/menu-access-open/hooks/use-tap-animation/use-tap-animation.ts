import React from 'react'

import { usePrevious } from '../../../../hooks'
import { tapAnimationDuration } from '../../../../constants'

export const useTapAnimation = (
  openCloseMenu: () => void
) => {
  const [isTapped, setIsTapped] = React.useState(false)
  const changedTap = isTapped !== usePrevious(isTapped, isTapped)

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

  return
}
