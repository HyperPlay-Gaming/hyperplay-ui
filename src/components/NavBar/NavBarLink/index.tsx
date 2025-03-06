import React, { ComponentPropsWithoutRef, ElementType } from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

export interface NavBarLinkProps<LinkType extends ElementType = 'a'> {
  isMenuLink?: boolean
  Link?: LinkType
  linkProps: ComponentPropsWithoutRef<LinkType> & { 'data-testid'?: string }
  children?: React.ReactNode
  isDropdownLink?: boolean
}

export default function NavBarLink({
  isMenuLink,
  isDropdownLink,
  Link = 'a',
  linkProps,
  children
}: NavBarLinkProps) {
  const { className, ...props } = linkProps
  let linkClassNames = classNames(
    styles.navItem,
    { [styles.dropdownLink]: isDropdownLink },
    'menu',
    className
  )
  if (isMenuLink) {
    linkClassNames = classNames(styles.navbarLinkImg, className)
  }
  return (
    <Link className={linkClassNames} {...props}>
      {children}
    </Link>
  )
}
