'use client'

import React, { HTMLAttributes } from 'react'

import { useClipboard } from '@mantine/hooks'
import classNames from 'classnames'

import { Checkmark, Copy } from '@/assets/images'

import styles from './index.module.scss'

export interface ButtonCopyProps extends HTMLAttributes<HTMLButtonElement> {
  text: string
}

export function ButtonCopy({ text, className, ...props }: ButtonCopyProps) {
  const clipboard = useClipboard()
  const copyButton = (
    <button
      onClick={() => clipboard.copy(text)}
      className={classNames('center', className)}
      {...props}
    >
      <Copy className={styles.copyButton} />
    </button>
  )

  const copiedElement = (
    <div>
      <Checkmark className={styles.copiedCheckmark} />
    </div>
  )

  return clipboard.copied ? copiedElement : copyButton
}
