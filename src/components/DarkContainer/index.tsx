import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

export function DarkContainer({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <div className={classNames(className, styles.container)} {...props}>
      {children}
    </div>
  )
}

export default DarkContainer
