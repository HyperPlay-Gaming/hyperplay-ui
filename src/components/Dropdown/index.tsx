import React from 'react'

import { Group, Menu } from '@mantine/core'

import { DownArrow } from '@/assets/images'

import Button from '../Button'
import styles from './Dropdown.module.scss'

export interface itemType {
  text: string
}

export interface DropdownProps {
  options: itemType[]
  selected: itemType
  onChange: (item: itemType) => void
}

export default function Dropdown({
  options,
  selected,
  onChange
}: DropdownProps) {
  const items = options.map((val, index) => (
    <Menu.Item
      key={'filterIndex' + index}
      onClick={() => onChange(val)}
      className={`${styles.menuItem} `}
    >
      <div
        className={`body ${styles.itemContents} ${
          val.text === selected.text ? styles.selected : ''
        }`}
      >
        {val.text}
      </div>
    </Menu.Item>
  ))
  return (
    <Group>
      <Menu position="bottom">
        <Menu.Target>
          <div>
            <Button
              type="tertiary"
              rightIcon={<DownArrow fill="var(--color-neutral-400)" />}
            >
              <div className="title">{selected.text}</div>
            </Button>
          </div>
        </Menu.Target>
        <Menu.Dropdown className={styles.menuDropdown}>{items}</Menu.Dropdown>
      </Menu>
    </Group>
  )
}
