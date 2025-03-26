import React from 'react'

import classNames from 'classnames'

import styles from './Wrapper.module.scss'

export type WrapperProps = {
  children: React.ReactNode
  center?: boolean
  style?: React.CSSProperties
}

export function Wrapper({ children, center, style }: WrapperProps) {
  return (
    <div
      className={classNames(styles.Wrapper, center && styles.center)}
      style={style}
    >
      {children}
    </div>
  )
}
