'use client'

import React from 'react'

import cn from 'classnames'

import { TrashCan } from '@/assets/images'
import Button from '@/components/Button'

import styles from './index.module.scss'

export type TokenIdRowProps =
  | {
      status: 'DRAFT'
      tokenId: number
      error?: string
      onRemoveTap: () => void
    }
  | {
      status: 'PENDING'
      tokenId: number
      url: string
    }
  | {
      status: 'CONFIRMED'
      tokenId: number
      url: string
    }
  | {
      status: 'ERROR'
      tokenId: number
      error?: string
      onTryAgainTap: () => void
    }

export function TokenIdRow(props: TokenIdRowProps) {
  let content = null

  if (props.status === 'DRAFT') {
    const button = (
      <Button
        htmlType="button"
        aria-label="remove token"
        type="tertiary"
        onClick={props.onRemoveTap}
        rightIcon={<TrashCan fill="var(--color-neutral-400)" />}
        className={styles.removeButton}
      />
    )

    content = <div className={styles.singleButtonContainer}>{button}</div>

    if (props.error) {
      content = (
        <div className={cn(styles.container)}>
          {props.error && (
            <span className={cn('body-sm', styles.errorText)}>
              {props.error}
            </span>
          )}
          {button}
        </div>
      )
    }
  }

  if (props.status === 'PENDING') {
    content = (
      <div className={styles.container}>
        <span className={cn(styles.pill, styles.pending)}>Depositing</span>
        <a
          href={props.url}
          className={styles.link}
          target="_blank"
          rel="noreferrer"
        >
          View on Explorer
        </a>
      </div>
    )
  }

  if (props.status === 'CONFIRMED') {
    content = (
      <div className={styles.container}>
        <span className={cn(styles.pill, styles.success)}>Ready</span>
        <a
          href={props.url}
          className={styles.link}
          target="_blank"
          rel="noreferrer"
        >
          View on Explorer
        </a>
      </div>
    )
  }

  if (props.status === 'ERROR') {
    content = (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <span className={cn(styles.pill, styles.error)}>Deposit Failed</span>
          {props.error && (
            <span className={cn('body-sm', styles.errorText)}>
              {props.error}
            </span>
          )}
        </div>
        <button onClick={props.onTryAgainTap} className={styles.tryAgainButton}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className={styles.base}>
      <div
        className={cn(
          styles.detail,
          props.status === 'ERROR' && styles.errorText,
          props.status === 'DRAFT' && props.error && styles.errorText
        )}
      >
        {props.tokenId}
      </div>
      {content}
    </div>
  )
}
