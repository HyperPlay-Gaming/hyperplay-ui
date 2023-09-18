import React, { HTMLProps } from 'react'

import cn from 'classnames'

import styles from './ProgressKey.module.scss'

export interface ProgressKeyTextProps {
  i18n?: {
    /**
     * The label to display the word minted
     */
    mintedLabel?: string
    /**
     * The label to display the words not minted
     */
    notMintedLabel?: string
  }
}

interface ProgressKeyProps
  extends HTMLProps<HTMLDivElement>,
    ProgressKeyTextProps {
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
  i18n = {
    mintedLabel: 'minted',
    notMintedLabel: 'not minted'
  },
  ...rest
}: ProgressKeyProps) {
  return (
    <div
      {...rest}
      className={cn(styles.keyContainer, styles[direction], rest.className)}
    >
      <div className={styles.keyRow}>
        <div className={cn(styles.circle, styles.minted)} />
        <div className="text--xs color-neutral-100">{`${safeMintedCount} ${i18n.mintedLabel}`}</div>
      </div>
      <div className={styles.keyRow}>
        <div className={cn(styles.circle, styles.notMinted)} />
        <div className="text--xs color-neutral-100">{`${
          safeTotalCount > safeMintedCount
            ? safeTotalCount - safeMintedCount
            : 0
        } ${i18n.notMintedLabel}`}</div>
      </div>
    </div>
  )
}
