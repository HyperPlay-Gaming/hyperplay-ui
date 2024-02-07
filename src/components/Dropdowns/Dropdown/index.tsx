import React, { HTMLAttributes } from 'react'

import { Menu } from '@mantine/core'
import { GetInputPropsReturnType } from '@mantine/form/lib/types'

import GenericDropdown, {
  DropdownProps as GenericDropdownDropdownProps
} from '../GenericDropdown'
import styles from './Dropdown.module.scss'

export interface itemType {
  text: string
  selected?: boolean
  id?: string
  dataTestId?: string
}

export interface DropdownProps
  extends Omit<GenericDropdownDropdownProps, 'target'> {
  options: itemType[]
  selected?: itemType
  onItemChange?: (item: itemType) => void
  targetWidth?: number
  dropdownButtonDivProps?: HTMLAttributes<HTMLDivElement>
  dropdownButtonDataTestId?: string
  dropdownButtonProps?: HTMLAttributes<HTMLButtonElement>
  // formInputProps maintains compatibility with mantine forms hooks
  formInputProps?: GetInputPropsReturnType
}

export default function Dropdown({
  options,
  selected,
  onItemChange,
  targetWidth,
  dropdownButtonDivProps,
  dropdownButtonDataTestId,
  dropdownButtonProps,
  formInputProps,
  ...props
}: DropdownProps) {
  if (selected === undefined) {
    selected = formInputProps?.value
  }

  if (selected === undefined) {
    throw 'Must pass a selected value to Dropdown!'
  }

  const items = options.map((val, index) => (
    <Menu.Item
      key={'filterIndex' + index}
      onClick={() => {
        if (onItemChange) {
          onItemChange(val)
        }
        if (formInputProps?.onChange) {
          formInputProps.onChange(val)
        }
      }}
      data-testid={val.dataTestId}
    >
      <div
        className={`${
          val.text === selected?.text || val.selected ? styles.selected : ''
        }`}
      >
        {val.text}
      </div>
    </Menu.Item>
  ))
  return (
    <GenericDropdown
      target={
        <GenericDropdown.GenericButton
          text={selected.text}
          style={{ width: targetWidth }}
          divProps={dropdownButtonDivProps}
          data-testid={dropdownButtonDataTestId}
          {...dropdownButtonProps}
        ></GenericDropdown.GenericButton>
      }
      classNames={{ item: styles.item }}
      {...props}
    >
      {items}
    </GenericDropdown>
  )
}
