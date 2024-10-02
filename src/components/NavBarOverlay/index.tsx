import React, { ReactElement } from 'react'

import cn from 'classnames'

import {
  ChevronLeft,
  HyperPlayLogoIcon,
  HyperPlayTextLogo
} from '@/assets/images'

import styles from './NavBarOverlay.module.scss'

export interface NavBarOverlayProps {
  linkItems: ReactElement[]
  classNames?: {
    root?: string
  }
  collapsed?: boolean
  setCollapsed: (collapsed: boolean) => void
}

export function NavBarOverlay({
  linkItems,
  classNames,
  collapsed,
  setCollapsed
}: NavBarOverlayProps) {
  const collapseClass: Record<string, boolean> = {}
  collapseClass[styles.collapsed] = !!collapsed
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
