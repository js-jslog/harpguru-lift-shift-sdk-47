import { pivotReedArray } from '../pivot-reed-array'
import { mapReedPairToHole } from '../map-reed-pair-to-hole'
import { mapHoleToIncludeValvebends } from '../map-hole-to-include-valvebends'
import { mapHoleToIncludeOverbends } from '../map-hole-to-include-overbends'
import { mapHoleToIncludeBends } from '../map-hole-to-include-bends'
import { mapHoleToFilterOverbends } from '../map-hole-to-filter-overbends'
import { mapHoleTierToInteractionid } from '../map-hole-tier-to-interactionid'
import { mapHoleTierToHalfstepindex } from '../map-hole-tier-to-halstepindex'
import { getHoleArrayErrorMessages } from '../get-hole-array-error-messages'
import { deriveMatrixSpecs } from '../derive-matrix-specs'
import type { HoleArray } from '../../types'
import { ValvingIds } from '../../../valving'
import type { HarpFaceMatrix, HalfstepIndex } from '../../../types'
import type { TuningIds, ReedArray } from '../../../tuning'
import { Interaction } from '../../../interaction'

type ApparatusMatrices = {
  readonly halfstepIndexMatrix: HarpFaceMatrix<HalfstepIndex>
  readonly interactionMatrix: HarpFaceMatrix<Interaction>
}

export const reedArrayToMatrices = (
  reedArray: ReedArray,
  tuningId: TuningIds,
  valvingId: ValvingIds
): ApparatusMatrices => {
  const holeArray = (pivotReedArray(reedArray)
    .map(mapReedPairToHole)
    .map(mapHoleToIncludeBends)
    .map(mapHoleToIncludeOverbends.bind(undefined, valvingId))
    .map(mapHoleToIncludeValvebends.bind(undefined, valvingId))
    .map(mapHoleToFilterOverbends) as unknown) as HoleArray
  // The types being used here are tuples. Typescript does not
  // attempt to preserve tuple length on `map` calls so we have
  // to use this quite extreme 2 step type assertion.
  // https://stackoverflow.com/a/57913509/4402041

  const holeErrorMessages = getHoleArrayErrorMessages(holeArray)
  if (holeErrorMessages.length > 0)
    throw new Error(`
    The following issues with the hole array
    produced for ${tuningId} were detected:

    ${JSON.stringify(holeErrorMessages)}
  `)

  const matrixSpecs = deriveMatrixSpecs(holeArray)

  const matrixPrimer = new Array(matrixSpecs.height).fill(undefined)

  const halfstepIndexMatrix = matrixPrimer.map((_, index) =>
    holeArray.map(
      mapHoleTierToHalfstepindex.bind(undefined, matrixSpecs, index)
    )
  )
  const interactionMatrix = matrixPrimer.map((_, index) =>
    holeArray.map(
      mapHoleTierToInteractionid.bind(undefined, matrixSpecs, index)
    )
  )
  return {
    halfstepIndexMatrix,
    interactionMatrix,
  }
}
