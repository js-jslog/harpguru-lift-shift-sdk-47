import type { OptionStackPointerProps } from '../../option-stack-pointer'

type PointerProperties = {
  readonly prevInStack: () => void
  readonly nextInStack: () => void
}

export const useOptionStackPointerProperties = (
  props: OptionStackPointerProps
): PointerProperties => {
  const prevInStack = (): void => {}
  const nextInStack = (): void => {}

  return {
    prevInStack,
    nextInStack,
  }
}
