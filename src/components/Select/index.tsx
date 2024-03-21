import { SelectProps as MantineSelectProps, Select } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import cn from 'classnames'

import styles from './index.module.scss'

export interface SelectProps extends Omit<MantineSelectProps, 'size'> {
  size?: 'small' | 'medium' | 'large'
}

export function HpSelect({
  classNames,
  size = 'medium',
  ...props
}: SelectProps) {
  // for some reason, the classNames props intellisense is not working for accessing the properties
  const propClasses = (classNames ?? {}) as Record<string, string>
  return (
    <Select
      classNames={{
        ...propClasses,
        wrapper: cn(styles.wrapper, propClasses.wrapper),
        input: cn(styles.input, styles[size], propClasses.input),
        label: cn(styles.label, propClasses.label),
        dropdown: cn(styles.dropdown, propClasses.dropdown),
        options: cn(styles.options, propClasses.options),
        option: cn(styles.option, propClasses.option)
      }}
      rightSection={<IconChevronDown />}
      {...props}
    />
  )
}

export default HpSelect
