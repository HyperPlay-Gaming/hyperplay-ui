import React, { HTMLProps, ReactElement } from 'react'

import cn from 'classnames'

import DarkContainer from '../DarkContainer'
import styles from './ContainerInteractive.module.scss'

export interface ContainerInteractiveProps extends HTMLProps<HTMLDivElement> {
  title: string
  tag?: ReactElement
  icon?: ReactElement
  classNames?: {
    root?: string
    header?: string
    titleContainer?: string
  }
}

export function ContainerInteractive({
  title,
  icon,
  classNames,
  children,
  className,
  tag,
  ...props
}: ContainerInteractiveProps) {
  return (
    <DarkContainer
      className={cn(styles.container, className, classNames?.root)}
      {...props}
    >
      <div className={cn(styles.headerRow, classNames?.header)}>
        <div className={cn(styles.titleContainer, classNames?.titleContainer)}>
          <div className="title">{title}</div>
          {tag ?? null}
        </div>
        {icon ?? null}
      </div>
      {children}
    </DarkContainer>
  )
}
