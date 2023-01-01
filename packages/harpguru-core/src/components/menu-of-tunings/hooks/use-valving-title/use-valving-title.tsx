import React from 'react'

import { OptionLabel } from '../../../option-label'
import type { OptionLabelProps } from '../../../option-label'
import type { UseGlobal } from '../../../../types'

export const useValvingTitle = (
  useGlobal: UseGlobal
): React.ReactElement<OptionLabelProps> => {
  const [valvingId] = useGlobal('valvingId')
  return (
    <OptionLabel
      title={'Valving'}
      isLargeTitle={true}
      value={valvingId}
      alignItems={'flex-start'}
    />
  )
}
