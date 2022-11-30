import { TuningIds } from '../../tuning'
import {
  MAJOR_DIATONIC,
  COUNTRY,
  NATURAL_MINOR,
  HARMONIC_MINOR,
  MELODY_MAKER,
  EASY_DIATONIC,
  TWELVE_HOLE_CHROMATIC,
  SIXTEEN_HOLE_CHROMATIC,
  DIMINISHED_CHROMATIC,
  WILDE,
  WILDE_MINOR,
  CIRCULAR,
  ORCHESTRA_S,
  PENTA_HARP,
  POWER_BENDER,
  POWER_DRAW,
  PADDY_RICHTER,
  LUCKY_13_RICHTER,
  LUCKY_13_POWER_CHROMATIC,
  BLUES_ONE,
  BLUES_TWO,
  BLUES_THREE,
  CHORD,
  RICHTER_IONIAN,
  RICHTER_MIXOLYDIAN,
  RICHTER_DORIAN,
  RICHTER_AEOLIAN,
  RICHTER_PHRYGIAN,
  RICHTER_LOCRIAN,
  RICHTER_LYDIAN,
  SPIRAL_IONIAN,
  SPIRAL_MIXOLYDIAN,
  SPIRAL_DORIAN,
  SPIRAL_AEOLIAN,
  SPIRAL_PHRYGIAN,
  SPIRAL_LOCRIAN,
  SPIRAL_LYDIAN,
  WHOLE_TONE,
  DIMINISHED,
  AUGMENTED_SPANISH,
  BAGPIPE,
  EASY_THIRD,
  WILL_SCARLETT,
  WOOZLE_MINOR,
  BABY_FAT,
  TWELVE_HOLE_SOLO,
  SIXTEEN_HOLE_SOLO,
} from '../../tuning'
import type { Tuning } from '../../tuning'

export const orderedTunings = new Map<TuningIds, Tuning>()
orderedTunings.set(TuningIds.MajorDiatonic, MAJOR_DIATONIC)
orderedTunings.set(TuningIds.Country, COUNTRY)
orderedTunings.set(TuningIds.NaturalMinor, NATURAL_MINOR)
orderedTunings.set(TuningIds.HarmonicMinor, HARMONIC_MINOR)
orderedTunings.set(TuningIds.MelodyMaker, MELODY_MAKER)
orderedTunings.set(TuningIds.EasyDiatonic, EASY_DIATONIC)
orderedTunings.set(TuningIds.TwelveHoleChromatic, TWELVE_HOLE_CHROMATIC)
orderedTunings.set(TuningIds.SixteenHoleChromatic, SIXTEEN_HOLE_CHROMATIC)
orderedTunings.set(TuningIds.DiminishedChromatic, DIMINISHED_CHROMATIC)
orderedTunings.set(TuningIds.Wilde, WILDE)
orderedTunings.set(TuningIds.WildeMinor, WILDE_MINOR)
orderedTunings.set(TuningIds.Circular, CIRCULAR)
orderedTunings.set(TuningIds.OrchestraS, ORCHESTRA_S)
orderedTunings.set(TuningIds.PentaHarp, PENTA_HARP)
orderedTunings.set(TuningIds.PowerBender, POWER_BENDER)
orderedTunings.set(TuningIds.PowerDraw, POWER_DRAW)
orderedTunings.set(TuningIds.PaddyRichter, PADDY_RICHTER)
orderedTunings.set(TuningIds.Lucky13Richter, LUCKY_13_RICHTER)
orderedTunings.set(TuningIds.Lucky13PowerChromatic, LUCKY_13_POWER_CHROMATIC)
orderedTunings.set(TuningIds.BluesOne, BLUES_ONE)
orderedTunings.set(TuningIds.BluesTwo, BLUES_TWO)
orderedTunings.set(TuningIds.BluesThree, BLUES_THREE)
orderedTunings.set(TuningIds.Chord, CHORD)
orderedTunings.set(TuningIds.RichterIonian, RICHTER_IONIAN)
orderedTunings.set(TuningIds.RichterMixolydian, RICHTER_MIXOLYDIAN)
orderedTunings.set(TuningIds.RichterDorian, RICHTER_DORIAN)
orderedTunings.set(TuningIds.RichterAeolian, RICHTER_AEOLIAN)
orderedTunings.set(TuningIds.RichterPhrygian, RICHTER_PHRYGIAN)
orderedTunings.set(TuningIds.RichterLocrian, RICHTER_LOCRIAN)
orderedTunings.set(TuningIds.RichterLydian, RICHTER_LYDIAN)
orderedTunings.set(TuningIds.SpiralIonian, SPIRAL_IONIAN)
orderedTunings.set(TuningIds.SpiralMixolydian, SPIRAL_MIXOLYDIAN)
orderedTunings.set(TuningIds.SpiralDorian, SPIRAL_DORIAN)
orderedTunings.set(TuningIds.SpiralAeolian, SPIRAL_AEOLIAN)
orderedTunings.set(TuningIds.SpiralPhrygian, SPIRAL_PHRYGIAN)
orderedTunings.set(TuningIds.SpiralLocrian, SPIRAL_LOCRIAN)
orderedTunings.set(TuningIds.SpiralLydian, SPIRAL_LYDIAN)
orderedTunings.set(TuningIds.WholeTone, WHOLE_TONE)
orderedTunings.set(TuningIds.Diminished, DIMINISHED)
orderedTunings.set(TuningIds.AugmentedSpanish, AUGMENTED_SPANISH)
orderedTunings.set(TuningIds.Bagpipe, BAGPIPE)
orderedTunings.set(TuningIds.EasyThird, EASY_THIRD)
orderedTunings.set(TuningIds.WillScarlett, WILL_SCARLETT)
orderedTunings.set(TuningIds.WoozleMinor, WOOZLE_MINOR)
orderedTunings.set(TuningIds.BabyFat, BABY_FAT)
orderedTunings.set(TuningIds.TwelveHoleSolo, TWELVE_HOLE_SOLO)
orderedTunings.set(TuningIds.SixteenHoleSolo, SIXTEEN_HOLE_SOLO)
