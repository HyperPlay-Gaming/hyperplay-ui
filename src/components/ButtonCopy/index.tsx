'use client'

import React, { HTMLAttributes } from 'react'

import { useClipboard } from '@mantine/hooks'
import classNames from 'classnames'

import { Checkmark, Copy } from '@/assets/images'

import Button from '../Button'
import styles from './ButtonCopy.module.scss'

export interface ButtonCopyProps extends HTMLAttributes<HTMLButtonElement> {
  text: string
  i18n?: {
    copy?: string
    copied?: string
  }
}

export function ButtonCopy({
  text,
  className,
  i18n = { copy: 'Copy', copied: 'Copied' },
  ...props
}: ButtonCopyProps) {
  const clipboard = useClipboard()
  let copyButton = <Copy className={styles.copyButton} />

  let copyText = i18n.copy

  if (clipboard.copied) {
    copyButton = <Checkmark className={styles.copiedCheckmark} />
    copyText = i18n.copied
  }

  const rootClassNames: Record<string, boolean> = {}
  rootClassNames[styles.copied] = clipboard.copied

  return (
    <Button
      size="small"
      type="tertiary"
      rightIcon={copyButton}
      onClick={() => clipboard.copy(text)}
      className={classNames(styles.root, rootClassNames, className)}
      {...props}
    >
      {copyText}
    </Button>
  )
}
