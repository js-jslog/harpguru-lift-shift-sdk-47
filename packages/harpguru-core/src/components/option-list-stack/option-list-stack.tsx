import React from 'react'

import type { OptionStackProps } from '../option-stack'
import { OptionList } from '../option-list'

export const OptionListStack = ({
  optionPropsz,
}: OptionStackProps): React.ReactElement => {
  const listStack = optionPropsz.map((optionProps, index, array) => {
    return (
      <OptionList
        useItems={optionProps.useItems}
        twoColumns={optionProps.twoColumns}
        useLeftColumnLabel={optionProps.useLeftColumnLabel}
        useRightColumnLabel={optionProps.useRightColumnLabel}
        key={index}
      />
    )
  })

  return <>{listStack}</>
}
