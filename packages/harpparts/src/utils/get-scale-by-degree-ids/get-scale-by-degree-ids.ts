import { doScalesMatch } from '../do-scales-match'
import type { Scale } from '../../scale'
import type { DegreeIds } from '../../degree'
import { getScaleIds, getScale } from '../../access-parts'

export const getScaleByDegreeIds = (
  degreeIds: ReadonlyArray<DegreeIds>
): Scale | undefined => {
  const matchingScales = getScaleIds().filter((scaleId) => {
    const scale = getScale(scaleId)
    return doScalesMatch(degreeIds, scale.degrees)
  })
  if (matchingScales.length === 0) return undefined
  return getScale(matchingScales[0])
}
