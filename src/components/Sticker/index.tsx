import React, { HTMLProps } from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

export interface StickerProps extends HTMLProps<HTMLDivElement> {
  styleType: 'secondary'
}

export default function Sticker({
  styleType,
  className,
  ...props
}: StickerProps) {
  const divClasses: Record<string, boolean> = {}
  divClasses[styles.secondary] = styleType === 'secondary'
  return (
    <div
      {...props}
      className={classNames(styles.sticker, className, divClasses)}
    >
      {props.children}
    </div>
  )
}
