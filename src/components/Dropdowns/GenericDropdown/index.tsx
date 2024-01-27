import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef
} from 'react'

import { Menu, MenuProps } from '@mantine/core'
import cn from 'classnames'

import { DownArrow } from '@/assets/images'

import Button from '../../Button'
import styles from './GenericDropdown.module.scss'

export interface GenericButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  text: string
  divProps?: HTMLAttributes<HTMLDivElement>
}

const GenericButton = forwardRef<HTMLButtonElement, GenericButtonProps>(
  ({ className, divProps, ...props }: GenericButtonProps, ref) => {
    return (
      <Button
        type="tertiary"
        rightIcon={<DownArrow fill="var(--color-neutral-400)" />}
        className={`${styles.genericButton} ${className}`}
        {...props}
        ref={ref}
      >
        <div className="title" style={{ width: '100%' }} {...divProps}>
          {props.text}
        </div>
      </Button>
    )
  }
)
GenericButton.displayName = 'GenericButton'

export interface DropdownProps extends MenuProps {
  target: ReactNode
  menuItemsGap?: string
}

const GenericDropdown = function ({
  target,
  children,
  menuItemsGap,
  classNames = {},
  ...props
}: DropdownProps) {
  return (
    <Menu
      position="bottom-start"
      width={'target'}
      offset={0}
      classNames={{
        ...classNames,
        itemLabel: cn(
          styles.label,
          // ts doesn't detect classNames props intelisense
          (classNames as Record<string, string>)['itemLabel']
        )
      }}
      {...props}
    >
      <Menu.Target>{target}</Menu.Target>
      <Menu.Dropdown className={styles.menuDropdown} style={{ margin: '0px' }}>
        <div style={{ gap: menuItemsGap ? menuItemsGap : 'var(--space-md)' }}>
          {children}
        </div>
      </Menu.Dropdown>
    </Menu>
  )
}

GenericDropdown.GenericButton = GenericButton

export default GenericDropdown
