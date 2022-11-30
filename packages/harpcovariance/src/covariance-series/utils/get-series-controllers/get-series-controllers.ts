import { getPitchIds, isPitchId, getPozitionIds, isPozitionId } from 'harpparts'

import { getCovariantControllers } from '../get-covariant-controllers'
import type { CovariancePrimer } from '../../covariance-series-types'
import type { CovariantControllers } from '../../../covariant-set'

export const getSeriesControllers = (
  props: CovariancePrimer
): ReadonlyArray<CovariantControllers> => {
  const { variedValue } = props
  if (isPitchId(variedValue)) {
    const variedValues = getPitchIds(variedValue)
    return variedValues.map((nextVariedValue) => {
      return getCovariantControllers({
        ...props,
        variedValue: nextVariedValue,
      } as CovariancePrimer)
    })
  } else if (isPozitionId(variedValue)) {
    const variedValues = getPozitionIds(variedValue)
    return variedValues.map((nextVariedValue) => {
      return getCovariantControllers({
        ...props,
        variedValue: nextVariedValue,
      } as CovariancePrimer)
    })
  }

  const errorMessage = `
    Varied value expected to either be PitchIds or PozitionIds.

    Input: ${JSON.stringify(props)}

    The Covariants only consist of Pitches (harp key and root pitch) and Pozitions,
    so anything else entered here must be a mistake.
  `
  throw new Error(errorMessage)
}
