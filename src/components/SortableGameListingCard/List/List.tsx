import React, { forwardRef } from 'react'

import classNames from 'classnames'

import styles from './List.module.scss'

export type ListProps = {
  children: React.ReactNode
  columns?: number
  style?: React.CSSProperties
  horizontal?: boolean
}

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ children, columns = 1, horizontal, style }: ListProps, ref) => {
    return (
      <ul
        ref={ref}
        style={
          {
            ...style,
            '--columns': columns
          } as React.CSSProperties
        }
        className={classNames(styles.List, horizontal && styles.horizontal)}
      >
        {children}
      </ul>
    )
  }
)

List.displayName = 'List'
