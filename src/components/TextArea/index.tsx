import React from 'react'

import {
  Textarea as MantineTextarea,
  TextareaProps as MantineTextareaProps
} from '@mantine/core'
import cn from 'classnames'

import styles from './TextArea.module.scss'

export interface TextareaProps extends MantineTextareaProps {
  size?: 'small' | 'medium' | 'large'
}

export function Textarea({
  classNames,
  size = 'medium',
  ...props
}: TextareaProps) {
  const propsClassName = (classNames ?? {}) as Record<string, string>
  return (
    <MantineTextarea
      classNames={{
        ...classNames,
        root: cn(styles.root, propsClassName?.root),
        input: cn(styles.input, propsClassName?.input, styles[size]),
        wrapper: cn(styles.wrapper, propsClassName?.wrapper),
        label: cn('caption', styles.label, propsClassName?.label),
        section: cn(styles.section, propsClassName?.section)
      }}
      {...props}
    />
  )
}
