import React, { ComponentPropsWithoutRef, ElementType } from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

export interface NavBarLinkProps<LinkType extends ElementType = 'a'> {
  isMenuLink?: boolean
  Link?: LinkType
  linkProps: ComponentPropsWithoutRef<LinkType> & { 'data-testid'?: string }
  children?: React.ReactNode
}

export default function NavBarLink({
  isMenuLink,
  Link = 'a',
  linkProps,
  children
}: NavBarLinkProps) {
  const { className, ...props } = linkProps
  let linkClassNames = classNames(styles.navItem, 'menu', className)
  if (isMenuLink) {
    linkClassNames = classNames(styles.navbarLinkImg, className)
  }
  return (
    <Link className={linkClassNames} {...props}>
      {children}
    </Link>
  )
}
