import React from 'react'

import cn from 'classnames'

import { ChevronLeft } from '@/assets/images'

import styles from './BaseButton.module.scss'

export type CarouselButtonType = 'attached' | 'detached'

export interface BaseButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  carouselButtonType?: CarouselButtonType
  classNames?: {
    root?: string
    button?: string
  }
  isLeftButton: boolean
}

const BaseButton = ({
  onClick,
  carouselButtonType = 'detached',
  classNames,
  className,
  isLeftButton,
  ...props
}: BaseButtonProps) => {
  let chevronWidth = '9px'
  let chevronHeight = '15px'
  if (carouselButtonType === 'attached') {
    chevronWidth = '6px'
    chevronHeight = '10px'
  }
  return (
    <div
      className={cn(
        styles.root,
        {
          [styles.leftButton]: isLeftButton,
          [styles[`root-${carouselButtonType}`]]: true
        },
        classNames?.root
      )}
    >
      <button
        onClick={onClick}
        data-testid={`carousel-${isLeftButton ? 'left' : 'right'}-button`}
        className={cn(
          {
            [styles.leftButton]: isLeftButton,
            [styles[`button-${carouselButtonType}`]]: true
          },
          classNames?.button,
          className
        )}
        {...props}
      >
        <ChevronLeft width={chevronWidth} height={chevronHeight} />
      </button>
    </div>
  )
}

export default BaseButton
