import React from 'react'

import { OptionTitleStack } from '../option-title-stack'
import type { OptionTitleProps } from '../option-title'
import { OptionStackPointer } from '../option-stack-pointer'
import { OptionListStack } from '../option-list-stack'
import type { OptionListProps } from '../option-list'

import { areOptionStacksEqual } from './utils'

type OptionProps = Omit<OptionTitleProps, 'transitionValue'> &
  Omit<OptionListProps, 'transitionValue'>

export type OptionStackProps = {
  readonly optionPropsz: ReadonlyArray<OptionProps>
}

export const OptionStack = (props: OptionStackProps): React.ReactElement => {
  const {
    optionPropsz: { length: stackLength },
  } = props

  const titleStack = (
    <OptionTitleStack {...props} />
  )
  const listStack = (
    <OptionListStack {...props} />
  )

  return (
    <>
      {titleStack}
      {listStack}
      <OptionStackPointer
        stackLength={stackLength}
        direction={'NEXT'}
      />
      <OptionStackPointer
        stackLength={stackLength}
        direction={'PREVIOUS'}
      />
    </>
  )
}

export const MemoOptionStack = React.memo(OptionStack, areOptionStacksEqual)
