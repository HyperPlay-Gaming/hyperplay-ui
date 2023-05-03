import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef
} from 'react'

import { Menu } from '@mantine/core'

import { DownArrow } from '@/assets/images'

import Button from '../Button'
import styles from './GenericDropdown.module.scss'

export interface GenericButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {
  text: string
}

const GenericButton = forwardRef<HTMLButtonElement, GenericButtonProps>(
  ({ className, ...props }: GenericButtonProps, ref) => {
    return (
      <Button
        type="tertiary"
        rightIcon={<DownArrow fill="var(--color-neutral-400)" />}
        className={`${styles.genericButton} ${className}`}
        {...props}
        ref={ref}
      >
        <div className="title" style={{ width: '100%' }}>
          {props.text}
        </div>
      </Button>
    )
  }
)
GenericButton.displayName = 'GenericButton'

export interface DropdownProps
  extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  target: ReactNode
}

const GenericDropdown = function ({ target, children }: DropdownProps) {
  return (
    <Menu position="bottom-start" width={'target'} offset={0}>
      <Menu.Target>{target}</Menu.Target>
      <Menu.Dropdown className={styles.menuDropdown} style={{ margin: '0px' }}>
        <div>{children}</div>
      </Menu.Dropdown>
    </Menu>
  )
}

GenericDropdown.GenericButton = GenericButton

export default GenericDropdown
