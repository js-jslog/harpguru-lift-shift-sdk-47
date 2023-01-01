import { useGlobal } from 'reactn'

import { useToggleFragmentHarpFace } from './use-toggle-fragment-harpface'

jest.mock('reactn')
const mockUseGlobal = useGlobal as jest.Mock

test('sets the opposite harpface fragmentation when fragmentation is true', () => {
  const setFragmentHarpFace = jest.fn()
  mockUseGlobal.mockReturnValue([true, setFragmentHarpFace])

  const toggleFragmentHarpFace = useToggleFragmentHarpFace()
  toggleFragmentHarpFace()

  expect(setFragmentHarpFace.mock.calls[0][0]).toBeFalsy()
})

test('sets the opposite harpface fragmentation when fragmentation is false', () => {
  const setFragmentHarpFace = jest.fn()
  mockUseGlobal.mockReturnValue([false, setFragmentHarpFace])

  const toggleFragmentHarpFace = useToggleFragmentHarpFace()
  toggleFragmentHarpFace()

  expect(setFragmentHarpFace.mock.calls[0][0]).toBeTruthy()
})
