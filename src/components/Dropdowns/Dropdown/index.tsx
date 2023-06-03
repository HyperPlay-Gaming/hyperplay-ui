import React from 'react'

import { Group, Menu } from '@mantine/core'

import GenericDropdown from '../GenericDropdown'
import styles from './Dropdown.module.scss'

export interface itemType {
  text: string
  selected?: boolean
  id?: string
}

export interface DropdownProps {
  options: itemType[]
  selected: itemType
  onChange: (item: itemType) => void
  targetWidth?: number
}

export default function Dropdown({
  options,
  selected,
  onChange,
  targetWidth
}: DropdownProps) {
  const items = options.map((val, index) => (
    <Menu.Item key={'filterIndex' + index} onClick={() => onChange(val)}>
      <div
        className={`body  ${
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
          ></GenericDropdown.GenericButton>
        }
      >
        {items}
      </GenericDropdown>
    </Group>
  )
}
