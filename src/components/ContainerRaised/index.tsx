import React, { HTMLProps } from 'react'

import cn from 'classnames'

import styles from './index.module.scss'

export interface ContainerRaisedProps extends HTMLProps<HTMLDivElement> {
  useGradientBorder?: boolean
  classNames?: {
    root?: string
    container?: string
  }
}

export function ContainerRaised({
  useGradientBorder,
  className,
  classNames,
  children,
  ...props
}: ContainerRaisedProps) {
  return (
    <div
      className={cn(
        { gradientBorder: useGradientBorder },
        styles.root,
        classNames?.root,
        className
      )}
      {...props}
    >
      <div className={cn(styles.container, classNames?.container)}>
        {children}
      </div>
    </div>
  )
}
