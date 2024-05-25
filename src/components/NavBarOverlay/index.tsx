import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import cn from 'classnames'

import { HyperPlayLogoIcon, HyperPlayTextLogo } from '@/assets/images'

import styles from './NavBarOverlay.module.scss'

interface NavItem {
  title: string
  route: string
  icon: ReactElement
  alertNumber?: number
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
  const linkItems = items.map((val) => {
    const linkClasses: Record<string, boolean> = {}
    linkClasses[styles.selected] = currentRoute === val.route
    let alert = null
    if (val.alertNumber) {
      alert = (
        <div className={cn('caption', styles.alertContainer)}>
          {val.alertNumber}
        </div>
      )
    }
    return (
      <Link
        to={val.route}
        key={val.route}
        className={cn('menu', styles.link, classNames?.link, linkClasses)}
      >
        {val.icon}
        {val.title}
        <div
          className={cn(
            styles.alertIconContainer,
            classNames?.alertIconContainer
          )}
        >
          {alert}
        </div>
      </Link>
    )
  })
  return (
    <div className={cn(styles.root, classNames?.root)}>
      <div className={styles.logoContainer}>
        <HyperPlayLogoIcon />
        <HyperPlayTextLogo />
      </div>
      {linkItems}
    </div>
  )
}
