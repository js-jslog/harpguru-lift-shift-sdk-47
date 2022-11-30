import { getWithGestureOffset } from './get-withgesture-offset'

test('minimum offset following gesture is 0', () => {
  const slideLength = 10
  const trackLength = 20

  const prevOffset_1 = 0
  const translationY_1 = 0
  expect(
    getWithGestureOffset(prevOffset_1, translationY_1, slideLength, trackLength)
  ).toBe(0)

  const prevOffset_2 = 0
  const translationY_2 = -10
  expect(
    getWithGestureOffset(prevOffset_2, translationY_2, slideLength, trackLength)
  ).toBe(0)

  const prevOffset_3 = 100
  const translationY_3 = -100
  expect(
    getWithGestureOffset(prevOffset_3, translationY_3, slideLength, trackLength)
  ).toBe(0)

  const prevOffset_4 = 100
  const translationY_4 = -200
  expect(
    getWithGestureOffset(prevOffset_4, translationY_4, slideLength, trackLength)
  ).toBe(0)
})

test('maximum offset following gesture takes slider to end of track', () => {
  const slideLength = 10
  const trackLength = 20

  const prevOffset_1 = 10
  const translationY_1 = 0
  expect(
    getWithGestureOffset(prevOffset_1, translationY_1, slideLength, trackLength)
  ).toBe(10)

  const prevOffset_2 = 0
  const translationY_2 = 10
  expect(
    getWithGestureOffset(prevOffset_2, translationY_2, slideLength, trackLength)
  ).toBe(10)

  const prevOffset_3 = 0
  const translationY_3 = 100
  expect(
    getWithGestureOffset(prevOffset_3, translationY_3, slideLength, trackLength)
  ).toBe(10)

  const prevOffset_4 = 100
  const translationY_4 = 1
  expect(
    getWithGestureOffset(prevOffset_4, translationY_4, slideLength, trackLength)
  ).toBe(10)
})

test('inter-track offset following gesture is calculated correctly', () => {
  const slideLength = 10
  const trackLength = 20

  const prevOffset_1 = 3
  const translationY_1 = 5
  expect(
    getWithGestureOffset(prevOffset_1, translationY_1, slideLength, trackLength)
  ).toBe(8)

  const prevOffset_2 = 3
  const translationY_2 = -2
  expect(
    getWithGestureOffset(prevOffset_2, translationY_2, slideLength, trackLength)
  ).toBe(1)

  const prevOffset_3 = 50
  const translationY_3 = -45
  expect(
    getWithGestureOffset(prevOffset_3, translationY_3, slideLength, trackLength)
  ).toBe(5)

  const prevOffset_4 = -50
  const translationY_4 = 53
  expect(
    getWithGestureOffset(prevOffset_4, translationY_4, slideLength, trackLength)
  ).toBe(3)
})
