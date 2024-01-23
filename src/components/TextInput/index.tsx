import React, { useState } from 'react'

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
  maxCharacters?: number
}

const TextInput = React.forwardRef<
  React.ElementRef<typeof MantineTextInput>,
  TextInputProps
>(({ classNames, rightSection, maxCharacters, onChange, ...props }, ref) => {
  const [numChars, setNumChars] = useState(0)

  let rightSectionComponent = rightSection
  if (rightSectionComponent === undefined && maxCharacters !== undefined) {
    rightSectionComponent = (
      <div className={styles.charCounter}>{`${numChars}/${maxCharacters}`}</div>
    )
  }

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
      onChange={(ev) => {
        setNumChars(ev.target.value.length)
        if (onChange) {
          onChange(ev)
        }
      }}
      onBeforeInput={(ev) => {
        if (maxCharacters !== undefined && numChars === maxCharacters) {
          ev.preventDefault()
        }
      }}
      rightSection={rightSectionComponent}
    />
  )
})
TextInput.displayName = 'TexInput'

export default TextInput
