import React, { HTMLAttributes } from 'react'

import { Group, Menu, MenuProps } from '@mantine/core'

import GenericDropdown from '../GenericDropdown'
import styles from './Dropdown.module.scss'

export interface itemType {
  text: string
  selected?: boolean
  id?: string
  dataTestId?: string
}

export interface DropdownProps extends MenuProps {
  options: itemType[]
  selected: itemType
  onItemChange: (item: itemType) => void
  targetWidth?: number
  dropdownButtonDivProps?: HTMLAttributes<HTMLDivElement>
  dropdownButtonDataTestId?: string
}

export default function Dropdown({
  options,
  selected,
  onItemChange,
  targetWidth,
  dropdownButtonDivProps,
  dropdownButtonDataTestId,
  ...props
}: DropdownProps) {
  const items = options.map((val, index) => (
    <Menu.Item key={'filterIndex' + index} onClick={() => onItemChange(val)} data-testid={val.dataTestId}>
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
    <Group>
      <GenericDropdown
        target={
          <GenericDropdown.GenericButton
            text={selected.text}
            style={{ width: targetWidth }}
            divProps={dropdownButtonDivProps}
            data-testid={dropdownButtonDataTestId}
          ></GenericDropdown.GenericButton>
        }
        classNames={{ item: `body` }}
        {...props}
      >
        {items}
      </GenericDropdown>
    </Group>
  )
}
