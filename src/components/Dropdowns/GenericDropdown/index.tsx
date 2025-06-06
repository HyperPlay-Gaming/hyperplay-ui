import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  forwardRef
} from 'react'

import { Menu, MenuProps, MenuTargetProps } from '@mantine/core'
import { useId } from '@mantine/hooks'
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
        htmlType="button"
        type="tertiary-neutral"
        rightIcon={<DownArrow fill="var(--color-neutral-400)" />}
        className={`${styles.genericButton} ${className}`}
        {...props}
        ref={ref}
      >
        <div className="title-sm" style={{ width: '100%' }} {...divProps}>
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
  containerProps?: HTMLAttributes<HTMLDivElement>
  targetProps?: MenuTargetProps & React.RefAttributes<HTMLElement>
}

const GenericDropdown = function ({
  target,
  children,
  menuItemsGap,
  classNames = {},
  containerProps,
  targetProps,
  ...props
}: DropdownProps) {
  const uuid = useId()
  return (
    // we wrap in a div to make a single node
    <div {...containerProps}>
      <Menu
        position="bottom-start"
        width={'target'}
        offset={0}
        unstyled
        portalProps={{
          target: `#${uuid}`
        }}
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
        <Menu.Target {...targetProps}>{target}</Menu.Target>
        <Menu.Dropdown
          className={styles.menuDropdown}
          style={{ margin: '0px' }}
        >
          <div style={{ gap: menuItemsGap ? menuItemsGap : 'var(--space-md)' }}>
            {children}
          </div>
        </Menu.Dropdown>
      </Menu>
      {/* the dropdown portal will be displayed here */}
      <div id={uuid} />
    </div>
  )
}

GenericDropdown.GenericButton = GenericButton

export default GenericDropdown
