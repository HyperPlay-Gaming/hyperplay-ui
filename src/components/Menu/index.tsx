import React from 'react'

import {
  Menu as MantineMenu,
  MenuProps as MantineMenuProps
} from '@mantine/core'
import cn from 'classnames'

import styles from './Menu.module.scss'

export type MenuProps = MantineMenuProps

const Menu = ({ classNames, ...props }: MantineMenuProps) => {
  const propClassNames = classNames as Record<string, string>
  return (
    <MantineMenu
      {...props}
      classNames={{
        ...propClassNames,
        dropdown: cn(styles.dropdown, propClassNames?.dropdown),
        label: cn('eyebrow', styles.label, propClassNames?.label),
        itemLabel: cn(styles.itemLabel, propClassNames?.itemLabel),
        item: cn(styles.item, propClassNames?.item),
        itemSection: cn(styles.itemSection, propClassNames?.itemSection),
        divider: cn(styles.divider, propClassNames?.divider)
      }}
    />
  )
}

Menu.displayName = 'Menu'
Menu.Target = MantineMenu.Target
Menu.Item = MantineMenu.Item
Menu.Dropdown = MantineMenu.Dropdown
Menu.Label = MantineMenu.Label
Menu.Divider = MantineMenu.Divider

export default Menu
