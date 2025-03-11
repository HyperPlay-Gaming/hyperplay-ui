import React, { HTMLProps } from 'react'

import cn from 'classnames'

import styles from './index.module.scss'

export function ContainerIcons({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return <div className={cn(styles.root, className)} {...props} />
}
