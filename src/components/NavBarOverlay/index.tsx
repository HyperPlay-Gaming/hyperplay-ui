import React, { ReactElement, useState } from 'react'
import { Link, LinkProps } from 'react-router-dom'

import cn from 'classnames'

import {
  ChevronLeft,
  HyperPlayLogoIcon,
  HyperPlayTextLogo
} from '@/assets/images'

import styles from './NavBarOverlay.module.scss'

interface NavItem {
  title: string
  route: string
  icon: ReactElement
  alertNumber?: number
  linkProps?: Omit<LinkProps, 'to'>
}

export interface NavBarOverlayProps {
  items: NavItem[]
  currentRoute?: string
  classNames?: {
    root?: string
    link?: string
    alertIconContainer?: string
  }
}

export function NavBarOverlay({
  items,
  currentRoute,
  classNames
}: NavBarOverlayProps) {
  const [collapsed, setCollapsed] = useState(false)
  const collapseClass: Record<string, boolean> = {}
  collapseClass[styles.collapsed] = collapsed
  const linkItems = items.map((val) => {
    const linkClasses: Record<string, boolean> = {}
    linkClasses[styles.selected] = currentRoute === val.route
    let alert = null
    if (val.alertNumber) {
      alert = (
        <div className={cn('caption', styles.alertContainer, linkClasses)}>
          {val.alertNumber}
        </div>
      )
    }
    return (
      <Link
        to={val.route}
        key={val.route}
        className={cn('menu-item', styles.link, classNames?.link, linkClasses)}
        {...val.linkProps}
      >
        {val.icon}
        <div className={cn(styles.linkTitle, collapseClass)}>{val.title}</div>
        <div
          className={cn(
            styles.alertIconContainer,
            classNames?.alertIconContainer,
            collapseClass
          )}
        >
          {alert}
        </div>
      </Link>
    )
  })
  return (
    <div className={cn(styles.root, classNames?.root)}>
      <div className={cn(styles.logoRow, collapseClass)}>
        <div className={cn(styles.logoContainer, collapseClass)}>
          <HyperPlayLogoIcon />
          <HyperPlayTextLogo />
        </div>
        <button
          className={cn(styles.collapseIcon, collapseClass)}
          type="button"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft />
          <ChevronLeft />
        </button>
      </div>
      {linkItems}
    </div>
  )
}
