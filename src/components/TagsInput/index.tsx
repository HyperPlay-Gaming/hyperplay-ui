import React from 'react'

import { TagsInput as MantineTagsInput, TagsInputProps } from '@mantine/core'

import styles from './TagsInput.module.scss'

export { type TagsInputProps } from '@mantine/core'

export function TagsInput(props: TagsInputProps) {
  return (
    <MantineTagsInput
      label="Genres"
      placeholder="Select genres"
      classNames={{
        root: styles.root,
        input: styles.input,
        inputField: styles.inputField,
        wrapper: styles.wrapper,
        dropdown: styles.dropdown,
        options: styles.options,
        pill: styles.pill,
        option: styles.option
      }}
      /* @dev there is too much work to do to style the unstyled component.
       * I recommend building an entirely custom component instead of unstyled.
       */
      //   unstyled
      {...props}
    />
  )
}
