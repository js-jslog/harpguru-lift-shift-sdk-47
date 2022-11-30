import { PozitionIds } from 'harpparts'
import type { PitchIds } from 'harpparts'

import type { RootPitchCovariancePrimer } from '../../covariance-series-types'
import { CovariantMembers } from '../../covariance-series-types'
import type { RootPitchControllers } from '../../../covariant-set'

export const getRootPitchControllers = (
  props: RootPitchCovariancePrimer
): RootPitchControllers => {
  const { lockedType, lockedValue, variedValue } = props

  if (lockedType === CovariantMembers.Pozition) {
    const harpKeyId = variedValue as PitchIds
    const pozitionId = lockedValue as PozitionIds
    const rootPitchControllers: RootPitchControllers = { harpKeyId, pozitionId }
    return rootPitchControllers
  } else {
    const harpKeyId = lockedValue as PitchIds
    const pozitionId = variedValue as PozitionIds
    const rootPitchControllers: RootPitchControllers = { harpKeyId, pozitionId }
    return rootPitchControllers
  }
}
