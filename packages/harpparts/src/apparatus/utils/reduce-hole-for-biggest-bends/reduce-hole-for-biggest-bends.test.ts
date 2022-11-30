import type { Hole } from '../../types'

import { reduceHoleForBiggestBends } from './reduce-hole-for-biggest-bends'

test('reduceHoleForBiggestBends returns accumulator when no bends', () => {
  const accumulator = {
    biggestBlow: 5,
    biggestDraw: 5,
  }
  const currentValue: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const output = reduceHoleForBiggestBends(accumulator, currentValue)

  expect(output).toStrictEqual(accumulator)
})

test('reduceHoleForBiggestBends returns accumulator when all bends are smaller than accumulator', () => {
  const accumulator = {
    biggestBlow: 5,
    biggestDraw: 5,
  }
  const currentValue: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const output = reduceHoleForBiggestBends(accumulator, currentValue)

  expect(output).toStrictEqual(accumulator)
})

test('reduceHoleForBiggestBends adds new biggestBlow when blowbends are bigger', () => {
  const accumulator = {
    biggestBlow: 1,
    biggestDraw: 4,
  }
  const currentValue: Hole = {
    blow: 12,
    draw: 9,
    blowbends: [10, 11],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedOutput = {
    biggestBlow: 2,
    biggestDraw: 4,
  }

  const output = reduceHoleForBiggestBends(accumulator, currentValue)

  expect(output).toStrictEqual(expectedOutput)
})

test('reduceHoleForBiggestBends adds new biggestBlow when overblows are bigger', () => {
  const accumulator = {
    biggestBlow: 0,
    biggestDraw: 0,
  }
  const currentValue: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
    overblows: [11],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedOutput = {
    biggestBlow: 1,
    biggestDraw: 0,
  }

  const output = reduceHoleForBiggestBends(accumulator, currentValue)

  expect(output).toStrictEqual(expectedOutput)
})

test('reduceHoleForBiggestBends adds new biggestDraw when bends are bigger', () => {
  const accumulator = {
    biggestBlow: 4,
    biggestDraw: 1,
  }
  const currentValue: Hole = {
    blow: 8,
    draw: 12,
    blowbends: [],
    drawbends: [9, 10, 11],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedOutput = {
    biggestBlow: 4,
    biggestDraw: 3,
  }

  const output = reduceHoleForBiggestBends(accumulator, currentValue)

  expect(output).toStrictEqual(expectedOutput)
})

test('reduceHoleForBiggestBends adds new biggestDraw when overdraws are bigger', () => {
  const accumulator = {
    biggestBlow: 0,
    biggestDraw: 0,
  }
  const currentValue: Hole = {
    blow: 10,
    draw: 9,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [11],
    valvedblows: [],
    valveddraws: [],
  }

  const expectedOutput = {
    biggestBlow: 0,
    biggestDraw: 1,
  }

  const output = reduceHoleForBiggestBends(accumulator, currentValue)

  expect(output).toStrictEqual(expectedOutput)
})

test('reduceHoleForBiggestBends adds new biggestBlow when valved blows are bigger', () => {
  const accumulator = {
    biggestBlow: 0,
    biggestDraw: 0,
  }
  const currentValue: Hole = {
    blow: 9,
    draw: 10,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [8],
    valveddraws: [],
  }

  const expectedOutput = {
    biggestBlow: 1,
    biggestDraw: 0,
  }

  const output = reduceHoleForBiggestBends(accumulator, currentValue)

  expect(output).toStrictEqual(expectedOutput)
})

test('reduceHoleForBiggestBends adds new biggestDraw when valved draws are bigger', () => {
  const accumulator = {
    biggestBlow: 0,
    biggestDraw: 0,
  }
  const currentValue: Hole = {
    blow: 10,
    draw: 9,
    blowbends: [],
    drawbends: [],
    overblows: [],
    overdraws: [],
    valvedblows: [],
    valveddraws: [8],
  }

  const expectedOutput = {
    biggestBlow: 0,
    biggestDraw: 1,
  }

  const output = reduceHoleForBiggestBends(accumulator, currentValue)

  expect(output).toStrictEqual(expectedOutput)
})
