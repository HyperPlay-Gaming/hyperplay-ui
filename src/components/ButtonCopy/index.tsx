import React, { HTMLAttributes } from 'react'

import { Tooltip, TooltipProps } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { IconCopy, IconProps } from '@tabler/icons-react'
import cn from 'classnames'

import styles from './ButtonCopy.module.scss'

export interface ButtonCopyProps extends HTMLAttributes<HTMLButtonElement> {
  tooltipProps?: TooltipProps
  iconProps?: IconProps
  text: string
  i18n?: {
    copy?: string
    copied?: string
  }
}

export function ButtonCopy({
  text,
  className,
  iconProps,
  tooltipProps,
  i18n = { copy: 'Copy', copied: 'Copied' },
  ...props
}: ButtonCopyProps) {
  const clipboard = useClipboard()
  return (
    <Tooltip
      label={clipboard.copied ? i18n.copied : i18n.copy}
      position="top"
      withArrow
      {...tooltipProps}
    >
      <button
        type="button"
        className={cn(styles.button, className)}
        onClick={() => clipboard.copy(text)}
        {...props}
      >
        <IconCopy color="var(--color-neutral-400)" {...iconProps} />
      </button>
    </Tooltip>
  )
}
