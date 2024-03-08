import { Select as MantineSelect, SelectProps } from '@mantine/core'
import cn from 'classnames'

import styles from './index.module.scss'

export default function Select({
  classNames,
  size = 'md',
  ...props
}: SelectProps) {
  return (
    <MantineSelect
      classNames={{
        ...classNames,
        wrapper: styles.wrapper,
        input: cn(styles.input, styles[size]),
        label: styles.label,
        dropdown: styles.dropdown,
        options: styles.options,
        option: styles.option
      }}
      {...props}
    />
  )
}
