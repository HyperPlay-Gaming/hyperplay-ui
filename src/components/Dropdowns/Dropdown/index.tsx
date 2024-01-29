import React, { HTMLAttributes } from 'react'

import { Group, Menu } from '@mantine/core'

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
  selected: itemType
  onItemChange: (item: itemType) => void
  targetWidth?: string
  dropdownButtonDivProps?: HTMLAttributes<HTMLDivElement>
  dropdownButtonDataTestId?: string
  dropdownButtonProps?: HTMLAttributes<HTMLButtonElement>
}

export default function Dropdown({
  options,
  selected,
  onItemChange,
  targetWidth,
  dropdownButtonDivProps,
  dropdownButtonDataTestId,
  dropdownButtonProps,
  ...props
}: DropdownProps) {
  const items = options.map((val, index) => (
    <Menu.Item
      key={'filterIndex' + index}
      onClick={() => onItemChange(val)}
      data-testid={val.dataTestId}
    >
      <div
        className={`${
          val.text === selected.text || val.selected ? styles.selected : ''
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
