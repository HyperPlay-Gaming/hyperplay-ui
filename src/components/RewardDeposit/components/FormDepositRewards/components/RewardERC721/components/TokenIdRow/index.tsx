'use client'

import React from 'react'

import { TrashCan } from '@/assets/images'
import Button from '@/components/Button'

import styles from './index.module.scss'

interface TokenIdRowInputProps {
  tokenId: number
  onClick: () => void
}

export function TokenIdRow({ tokenId, onClick }: TokenIdRowInputProps) {
  return (
    <div className={styles.root}>
      <div className={styles.detail}>{tokenId}</div>
      <Button
        type="tertiary"
        onClick={onClick}
        rightIcon={<TrashCan fill="var(--color-neutral-400)" />}
        className={styles.removeButton}
      />
    </div>
  )
}
