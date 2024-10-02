import React, { ReactElement } from 'react'

import { createPolymorphicComponent } from '@mantine/core'
import cn from 'classnames'

import styles from './NavItem.module.scss'

interface NavItemProps {
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
  ...props
}: NavItemProps) {
  const linkClasses: Record<string, boolean> = {}
  linkClasses[styles.selected] = currentRoute === route
  let alert = null
  if (alertNumber) {
    alert = (
      <div className={cn('caption', styles.alertContainer, linkClasses)}>
        {alertNumber}
      </div>
    )
  }
  const collapseClass: Record<string, boolean> = {}
  collapseClass[styles.collapsed] = !!collapsed
  const Element = component || 'button'
  return (
    <Element
      key={route}
      className={cn('menu-item', styles.link, classNames?.link, linkClasses)}
      {...props}
    >
      {icon}
      <div className={cn(styles.linkTitle, collapseClass)}>{title}</div>
      <div
        className={cn(
          styles.alertIconContainer,
          classNames?.alertIconContainer,
          collapseClass
        )}
      >
        {alert}
      </div>
    </Element>
  )
}

export const NavItem = createPolymorphicComponent<'div', NavItemProps>(_NavItem)
