import React, { ReactElement } from 'react'

import { Menu, createPolymorphicComponent } from '@mantine/core'
import cn from 'classnames'

import { DownArrow } from '@/assets/images'

import styles from './NavItem.module.scss'

export interface NavItemProps {
  title: string
  selected?: boolean
  icon: ReactElement
  alertNumber?: number
  collapsed?: boolean
  classNames?: {
    link?: string
    alertIconContainer?: string
  }
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  component?: any
  secondaryTag?: string
  subLinks?: ReactElement[]
  collapsedInit?: boolean
  key: string
  subLinksCollapsed?: boolean
  setSubLinksCollapsed?: (val: boolean) => void
}

function _NavItem({
  title,
  selected,
  icon,
  alertNumber,
  collapsed,
  classNames,
  component,
  secondaryTag,
  subLinks,
  subLinksCollapsed = false,
  setSubLinksCollapsed,
  key,
  ...props
}: NavItemProps) {
  let alertText = ''
  if (alertNumber) {
    alertText = alertNumber.toString()
  } else if (secondaryTag) {
    alertText = secondaryTag
  }
  const collapseClass: Record<string, boolean> = {}
  collapseClass[styles.collapsed] = !!collapsed
  const Element = component || 'button'
  const linkClasses: Record<string, boolean> = {}
  linkClasses[styles.selected] = !!selected

  const linkItemClasses: Record<string, boolean> = {}
  linkItemClasses[styles.hide] = alertText === ''
  linkItemClasses[styles.secondary] = !!secondaryTag

  let dropdownArrow = null
  const hasSublinks = subLinks && subLinks.length > 0
  if (hasSublinks) {
    const dropdownArrowClass: Record<string, boolean> = {}
    dropdownArrowClass[styles.subMenuCollapsed] = subLinksCollapsed
    dropdownArrow = (
      <button
        className={cn(styles.submenuCollapseIcon, dropdownArrowClass)}
        onClick={(ev) => {
          setSubLinksCollapsed?.(!subLinksCollapsed)
          /**
           * @dev To support clicking the nav item to navigate when it has sublinks, we need
           * to prevent the on click handler from bubbling here. Otherwise, clicking the arrow
           * to expand/collapse the sublinks will also navigate, which could be confusing UX.
           */
          ev.preventDefault()
          ev.stopPropagation()
        }}
      >
        <DownArrow></DownArrow>
      </button>
    )
  }

  const showDropdownHoverMenu = collapsed && hasSublinks

  return (
    <Menu
      trigger={showDropdownHoverMenu ? 'hover' : undefined}
      position="right"
      withArrow
      arrowPosition="center"
      classNames={{ dropdown: styles.menuDropdown, arrow: styles.menuArrow }}
      unstyled
      disabled={!showDropdownHoverMenu}
    >
      <Menu.Target>
        <div key={key} className={styles.root}>
          <Element
            className={cn(
              'menu-item',
              styles.link,
              linkClasses,
              classNames?.link
            )}
            {...props}
          >
            {icon}
            <div className={cn(styles.linkTitle, collapseClass)}>{title}</div>
            <div
              className={cn(
                styles.alertIconContainer,
                collapseClass,
                classNames?.alertIconContainer
              )}
            >
              <div
                className={cn(
                  'caption',
                  styles.alertContainer,
                  linkItemClasses
                )}
              >
                {alertText}
              </div>
            </div>
            {collapsed ? null : dropdownArrow}
          </Element>
          {subLinksCollapsed || collapsed ? null : (
            <div className={styles.sublinksContainer}>{subLinks}</div>
          )}
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <div className={cn('menu-item', styles.dropdownTitle)}>{title}</div>
        <div className={styles.dropdownSublinksContainer}>{subLinks}</div>
      </Menu.Dropdown>
    </Menu>
  )
}

export const NavItem = createPolymorphicComponent<'div', NavItemProps>(_NavItem)
