import React, { HTMLProps } from 'react'

import cn from 'classnames'

import styles from './ProgressKey.module.scss'

interface ProgressKeyProps extends HTMLProps<HTMLDivElement> {
  /**
   * The total number of achievements minted
   */
  safeMintedCount: number
  /**
   * The total number of achievements that exist for this game
   */
  safeTotalCount: number
  /**
   * display as a row or column
   */
  direction?: 'row' | 'column'
}

export default function ProgressKey({
  safeMintedCount,
  safeTotalCount,
  direction = 'row',
  ...rest
}: ProgressKeyProps) {
  return (
    <div
      {...rest}
      className={cn(styles.keyContainer, styles[direction], rest.className)}
    >
      <div className={styles.keyRow}>
        <div className={cn(styles.circle, styles.minted)} />
        <div className="text--xs color-neutral-100">{`${safeMintedCount} minted`}</div>
      </div>
      <div className={styles.keyRow}>
        <div className={cn(styles.circle, styles.notMinted)} />
        <div className="text--xs color-neutral-100">{`${
          safeTotalCount > safeMintedCount
            ? safeTotalCount - safeMintedCount
            : 0
        } not minted`}</div>
      </div>
    </div>
  )
}
