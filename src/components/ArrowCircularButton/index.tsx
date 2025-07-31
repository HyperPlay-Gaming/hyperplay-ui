import React from 'react'

import cn from 'classnames'

import { ChevronLeft } from '@/assets/images'

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
    <div
      className={cn(
        styles.root,
        {
          [styles[`root-detached`]]: true
        },
        classNames?.root
      )}
    >
      <button
        onClick={onClick}
        data-testid={`carousel-${isLeftButton ? 'left' : 'right'}-button`}
        className={cn(
          {
            [styles[`button-detached`]]: true
          },
          classNames?.button,
          className
        )}
        {...props}
      >
        <ChevronLeft width={'9px'} height={'15px'} />
      </button>
    </div>
  )
}

export default BaseButton
