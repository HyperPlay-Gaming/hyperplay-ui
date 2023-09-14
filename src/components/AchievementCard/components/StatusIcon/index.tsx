import React, { useMemo } from 'react'

import cn from 'classnames'

import * as Images from '@/assets/images'
import { ButtonProps } from '@/components/Button'
import CircularButton from '@/components/CircularButton'

import styles from './StatusIcon.module.scss'

export type StatusIconState = 'default' | 'active' | 'disabled' | 'update'
type StatusIconProps = ButtonProps & { state: StatusIconState }

const StatusIcon = ({ state, ...rest }: StatusIconProps) => {
  const icon = useMemo(() => {
    switch (state) {
      case 'active':
        return <Images.CheckmarkCircle height={24} width={24} />
      case 'update':
        return <Images.UpdateCircleOutline height={24} width={24} />
      default:
        return <Images.PlusCircleOutline height={24} width={24} />
    }
  }, [state])

  return (
    <CircularButton
      {...rest}
      className={cn(rest.className, styles.statusIcon, styles[state])}
    >
      {icon}
    </CircularButton>
  )
}

export default StatusIcon