import * as React from 'react'

import { TextInput as MantineTextInput } from '@mantine/core'
import cn from 'classnames'

import styles from './TextInput.module.scss'

export interface TextInputProps
  extends React.ComponentPropsWithoutRef<typeof MantineTextInput> {
  classNames?: {
    root?: string
    input?: string
    wrapper?: string
    label?: string
  }
}

const TextInput = React.forwardRef<
  React.ElementRef<typeof MantineTextInput>,
  TextInputProps
>(({ classNames, ...props }, ref) => {
  return (
    <MantineTextInput
      {...props}
      classNames={{
        ...classNames,
        root: cn(styles.root, classNames?.root),
        input: cn(styles.input, classNames?.input),
        wrapper: cn(styles.wrapper, classNames?.wrapper),
        label: cn('caption', styles.label, classNames?.label)
      }}
      unstyled
      ref={ref}
    />
  )
})
TextInput.displayName = 'TexInput'

export default TextInput
