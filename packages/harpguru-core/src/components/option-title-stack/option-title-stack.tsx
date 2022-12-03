import React from 'react'

import { OptionTitle } from '../option-title'
import type { OptionStackProps } from '../option-stack'

export const OptionTitleStack = ({
  optionPropsz,
}: OptionStackProps): React.ReactElement => {
  const titleStack = optionPropsz.map((optionProps, index, array) => {
    return (
      <OptionTitle
        useTitle={optionProps.useTitle}
        key={index}
      />
    )
  })

  return <>{titleStack}</>
}
