import React, { ReactElement, useState } from 'react'

import { createPolymorphicComponent } from '@mantine/core'
import cn from 'classnames'

import { DownArrow } from '@/assets/images'

import styles from './NavItem.module.scss'

export interface NavItemProps {
  title: string
  route: string
  icon: ReactElement
  alertNumber?: number
  currentRoute?: string
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
}

function _NavItem({
  title,
  route,
  icon,
  alertNumber,
  currentRoute,
  collapsed,
  classNames,
  component,
  secondaryTag,
  subLinks,
  collapsedInit = false,
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
  linkClasses[styles.selected] = currentRoute === route

  const linkItemClasses: Record<string, boolean> = {}
  linkItemClasses[styles.hide] = alertText === ''
  linkItemClasses[styles.secondary] = !!secondaryTag

  const [subLinksCollapsed, setSubLinksCollapsed] = useState(collapsedInit)
  let dropdownArrow = null
  if (subLinks && subLinks.length > 0) {
    const dropdownArrowClass: Record<string, boolean> = {}
    dropdownArrowClass[styles.subMenuCollapsed] = subLinksCollapsed
    dropdownArrow = (
      <button
        className={cn(styles.submenuCollapseIcon, dropdownArrowClass)}
        onClick={(ev) => {
          setSubLinksCollapsed(!subLinksCollapsed)
          ev.preventDefault()
          ev.stopPropagation()
        }}
      >
        <DownArrow></DownArrow>
      </button>
    )
  }
  return (
    <div key={route} className={styles.root}>
      <Element
        className={cn('menu-item', styles.link, linkClasses, classNames?.link)}
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
            className={cn('caption', styles.alertContainer, linkItemClasses)}
          >
            {alertText}
          </div>
        </div>
        {dropdownArrow}
      </Element>
      {subLinksCollapsed ? null : subLinks}
    </div>
  )
}

export const NavItem = createPolymorphicComponent<'div', NavItemProps>(_NavItem)
