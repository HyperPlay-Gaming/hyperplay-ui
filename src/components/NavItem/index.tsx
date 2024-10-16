import React, { ReactElement } from 'react'

import { createPolymorphicComponent } from '@mantine/core'
import cn from 'classnames'

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
        <div className={cn('caption', styles.alertContainer, linkItemClasses)}>
          {alertText}
        </div>
      </div>
    </Element>
  )
}

export const NavItem = createPolymorphicComponent<'div', NavItemProps>(_NavItem)
