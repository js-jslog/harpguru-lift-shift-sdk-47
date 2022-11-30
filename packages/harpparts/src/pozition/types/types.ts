import { HarpPartTypes } from '../../types'
import type { HalfstepIndex } from '../../types'

export enum PozitionIds {
  First = '1st',
  Second = '2nd',
  Third = '3rd',
  Fourth = '4th',
  Fifth = '5th',
  Sixth = '6th',
  Seventh = '7th',
  Eighth = '8th',
  Ninth = '9th',
  Tenth = '10th',
  Eleventh = '11th',
  Twelfth = '12th',
}

export type Pozition = {
  readonly type: HarpPartTypes.Pozition
  readonly id: PozitionIds
  readonly rootOffset: HalfstepIndex
  readonly simpleSplitValue: [string, string]
}
