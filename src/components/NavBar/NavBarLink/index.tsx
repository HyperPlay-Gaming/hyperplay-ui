import React from 'react'

import classNames from 'classnames'

import styles from './index.module.scss'

export interface NavBarLinkProps {
  isMenuLink?: boolean
  /* eslint-disable-next-line */
  Link?: any
  /* eslint-disable-next-line */
  linkProps: any
  children?: React.ReactNode
  isDropdownLink?: boolean
}

export function NavBarLink({
  isMenuLink,
  isDropdownLink,
  Link,
  linkProps,
  children
}: NavBarLinkProps) {
  const LinkElement = Link || 'a'
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
    <LinkElement className={linkClassNames} {...props}>
      {children}
    </LinkElement>
  )
}
