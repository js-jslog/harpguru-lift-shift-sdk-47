import type { PitchIds, PozitionIds } from 'harpparts'

export type CovariantSet = {
  readonly harpKeyId: PitchIds
  readonly pozitionId: PozitionIds
  readonly rootPitchId: PitchIds
}

export type HarpKeyControllers = {
  readonly rootPitchId: PitchIds
  readonly pozitionId: PozitionIds
}

export type PozitionControllers = {
  readonly rootPitchId: PitchIds
  readonly harpKeyId: PitchIds
}

export type RootPitchControllers = {
  readonly harpKeyId: PitchIds
  readonly pozitionId: PozitionIds
}

export type CovariantControllers =
  | HarpKeyControllers
  | RootPitchControllers
  | PozitionControllers
