import cn from 'classnames'

import { MobileMenuProps } from '../../types'
import { NavigationLinks } from '../NavigationLinks'
import { SocialMediaIcons } from '../SocialMediaIcons'
import styles from './MobileMenu.module.scss'

export const MobileMenu = ({ isOpen, links, i18n }: MobileMenuProps) => (
  <div className={cn(styles.mobileMenu, { [styles.isMenuOpen]: isOpen })}>
    <NavigationLinks
      links={links}
      i18n={i18n}
      className={styles.mobileMenuLinks}
      menuItemClassName={styles.mobileMenuLink}
    />
    <SocialMediaIcons
      links={links}
      className={styles.mobileMenuButtonsList}
      isButtons={true}
    />
  </div>
)
