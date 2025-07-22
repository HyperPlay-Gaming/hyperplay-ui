import React from 'react'

import cn from 'classnames'

import { ArrowTop } from '@/assets/images'

import styles from './index.module.scss'

export interface BaseButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  classNames?: {
    root?: string
    button?: string
  }
  isLeftButton: boolean
}

const BaseButton = ({
  onClick,
  classNames,
  className,
  isLeftButton,
  ...props
}: BaseButtonProps) => {
  return (
    <button
      onClick={onClick}
      data-testid={`carousel-${isLeftButton ? 'left' : 'right'}-button`}
      className={cn(
        {
          [styles.leftButton]: isLeftButton,
          [styles[`button-detached`]]: true
        },
        classNames?.button,
        className
      )}
      {...props}
    >
      <ArrowTop width={24} height={24} />
    </button>
  )
}

export default BaseButton
