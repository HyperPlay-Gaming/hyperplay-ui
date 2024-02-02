import React, { HTMLProps, ReactElement } from 'react'

import cn from 'classnames'

import DarkContainer from '../DarkContainer'
import styles from './ContainerInteractive.module.scss'

export interface ContainerInteractiveProps extends HTMLProps<HTMLDivElement> {
  title: string
  icon: ReactElement
  classNames?: {
    root?: string
    header?: string
  }
}

export function ContainerInteractive({
  title,
  icon,
  classNames,
  children,
  className,
  ...props
}: ContainerInteractiveProps) {
  return (
    <DarkContainer
      className={cn(styles.container, className, classNames?.root)}
      {...props}
    >
      <div className={cn(styles.headerRow, classNames?.header)}>
        <div className="title">{title}</div>
        {icon}
      </div>
      {children}
    </DarkContainer>
  )
}
