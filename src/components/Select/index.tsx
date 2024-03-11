import { Select, SelectProps } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import cn from 'classnames'

import styles from './index.module.scss'

interface Props extends Omit<SelectProps, 'size'> {
  size?: 'small' | 'medium' | 'large'
}

export function HpSelect({ classNames, size = 'medium', ...props }: Props) {
  return (
    <Select
      classNames={{
        wrapper: styles.wrapper,
        input: cn(styles.input, styles[size]),
        label: styles.label,
        dropdown: styles.dropdown,
        options: styles.options,
        option: styles.option,
        ...classNames
      }}
      rightSection={<IconChevronDown />}
      {...props}
    />
  )
}

export default HpSelect
