import React from 'react'

import {
  NumberInput as MantineNumberInput,
  NumberInputProps as MantineNumberInputProps
} from '@mantine/core'
import cn from 'classnames'

import styles from './NumberInput.module.scss'

interface NumberInputProps extends MantineNumberInputProps {
  size?: 'small' | 'medium' | 'large'
}

const NumberInput = React.forwardRef<
  React.ElementRef<typeof MantineNumberInput>,
  NumberInputProps
>(({ classNames, size = 'medium', ...props }, ref) => {
  const propsClassNames = (classNames ?? {}) as Record<string, string>
  return (
    <MantineNumberInput
      {...props}
      classNames={{
        ...classNames,
        root: cn(styles.root, propsClassNames?.root),
        input: cn(styles.input, propsClassNames?.input, styles[size]),
        wrapper: cn(styles.wrapper, propsClassNames?.wrapper),
        label: cn('caption', styles.label, propsClassNames?.label),
        section: cn(styles.section, propsClassNames?.section),
        error: cn('caption-sm', styles.error, propsClassNames?.error),
        required: cn(styles.required, propsClassNames?.required),
        control: cn(styles.control, propsClassNames?.control),
        controls: cn(styles.controls, propsClassNames?.controls)
      }}
      ref={ref}
    />
  )
})
NumberInput.displayName = 'NumberInput'

export default NumberInput
