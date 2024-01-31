import { Textarea as MantineTextarea, TextareaProps } from '@mantine/core'

import styles from './TextArea.module.scss'

export { type TextareaProps } from '@mantine/core'

export function Textarea(props: TextareaProps) {
  return (
    <MantineTextarea
      classNames={{
        input: styles.input
      }}
      {...props}
    />
  )
}
