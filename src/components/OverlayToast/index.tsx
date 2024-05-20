import React, { HTMLAttributes } from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

export interface OverlayToastInterface extends HTMLAttributes<HTMLDivElement> {
  i18n?: {
    overlay: string
    overlayModKey: string
    overlayKey: string
  }
}

export function OverlayToast({
  i18n = { overlay: 'Overlay', overlayModKey: 'Alt', overlayKey: 'X' },
  className,
  ...rest
}: OverlayToastInterface) {
  return (
    <div className={classNames('title-sm', styles.root, className)} {...rest}>
      <div>{`HyperPlay ${i18n.overlay}`}</div>
      <div className={classNames('eyebrow', styles.ctaText)}>
        {i18n.overlayModKey}
      </div>
      <div>{'+'}</div>
      <div className={classNames('eyebrow', styles.ctaText)}>
        {i18n.overlayKey}
      </div>
    </div>
  )
}
