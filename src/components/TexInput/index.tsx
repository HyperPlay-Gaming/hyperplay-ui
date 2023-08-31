import * as React from 'react'

import { TextInput as MantineTextInput } from '@mantine/core'
import cn from 'classnames'

import styles from './TextInput.module.scss'

const TextInput = React.forwardRef<
  React.ElementRef<typeof MantineTextInput>,
  React.ComponentPropsWithoutRef<typeof MantineTextInput>
>(({ classNames, ...props }, ref) => {
  return (
    <MantineTextInput
      {...props}
      classNames={{
        root: styles.root,
        input: styles.input,
        label: cn('caption', styles.label),
        ...classNames
      }}
      unstyled
      ref={ref}
    />
  )
})
TextInput.displayName = 'TexInput'

export default TextInput
