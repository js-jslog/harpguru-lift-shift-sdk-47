import { useGlobal } from 'reactn'
import type { DegreeIds } from 'harpparts'

type BufferToggleFunction = (arg0: DegreeIds) => void

export const useAddBufferedActivityToggle = (): BufferToggleFunction => {
  const [bufferedActivityToggles, setBufferedActivityToggles] = useGlobal(
    'bufferedActivityToggles'
  )

  return (toggleToBuffer) => {
    if (bufferedActivityToggles.includes(toggleToBuffer)) {
      setBufferedActivityToggles([...bufferedActivityToggles])
    } else {
      setBufferedActivityToggles([...bufferedActivityToggles, toggleToBuffer])
    }
  }
}
