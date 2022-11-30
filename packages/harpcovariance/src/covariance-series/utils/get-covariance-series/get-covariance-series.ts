import { getSeriesControllers } from '../get-series-controllers'
import type {
  CovarianceSeries,
  CovariancePrimer,
} from '../../covariance-series-types'
import { getCovariantSet } from '../../../covariant-set'

export const getCovarianceSeries = (
  props: CovariancePrimer
): CovarianceSeries => {
  const seriesControllers = getSeriesControllers(props)

  return seriesControllers.map((covariantControllers) => {
    return getCovariantSet(covariantControllers)
  })
}
