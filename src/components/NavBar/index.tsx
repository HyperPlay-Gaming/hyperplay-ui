import React, { useRef, useState } from 'react'

import cn from 'classnames'

import { BurgerClosedIcon, BurgerOpenIcon } from '@/assets/images'
import hpIconLight from '@/assets/images/MobileHpLogo.svg?url'

import Button from '../Button'
import navBarStyles from './NavBar.module.scss'

interface Props {
  UserAvatar?: React.ReactNode
  links: React.ReactNode
  socialLinks: React.ReactNode
  /* eslint-disable-next-line */
  Link?: any
  mobileDropdownCTA?: React.ReactNode
  classNames?: {
    root?: string
    bannerContainer?: string
    navbarDropdown?: string
    navbar?: string
  }
  i18n?: {
    installHyperPlay: string
  }
}

const NavBar = function ({
  UserAvatar,
  links,
  socialLinks,
  Link,
  mobileDropdownCTA,
  classNames,
  i18n = {
    installHyperPlay: 'Install HyperPlay'
  }
}: Props) {
  const LinkElement = Link || 'a'
  const [showNavBarDropDown, setShowNavBarDropDown] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  let userAvatar = null
  if (UserAvatar) {
    userAvatar = <div className={navBarStyles.avatarDesktop}>{UserAvatar}</div>
  }

  return (
    <div className={classNames?.root}>
      <div
        className={cn(
          navBarStyles.bannerContainer,
          classNames?.bannerContainer
        )}
        ref={ref}
      >
        <div className={cn(navBarStyles.navbar, classNames?.navbar)}>
          <LinkElement href="/">
            <div className={`${navBarStyles.navLogo}`}>
              <div className={navBarStyles.navbarLogoImg}>
                <img
                  src={hpIconLight}
                  style={{ objectFit: 'contain' }}
                  alt="HyperPlay Logo"
                  height="24px"
                  width="24px"
                />
              </div>
              <div className={navBarStyles.hpLogoText}>HyperPlay</div>
            </div>
          </LinkElement>
          <div className={navBarStyles.dropdownContainer}>
            {UserAvatar}
            <button
              className={navBarStyles.burgerMenu}
              onClick={() => setShowNavBarDropDown(!showNavBarDropDown)}
            >
              {showNavBarDropDown ? (
                <BurgerOpenIcon className={navBarStyles.mobileMenuToggleIcon} />
              ) : (
                <BurgerClosedIcon
                  className={navBarStyles.mobileMenuToggleIcon}
                />
              )}
            </button>
          </div>
          <div className={navBarStyles.links}>{links}</div>
          <div className={navBarStyles.menu}>
            <div className={navBarStyles.menuSocial}>{socialLinks}</div>
            <Link
              className={`${navBarStyles.navItem} menu`}
              href="https://www.hyperplay.xyz/downloads"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="install-hyperplay"
            >
              <Button type="secondaryGradient" size="medium" spacing="lg">
                <div className="button-sm">{i18n.installHyperPlay}</div>
              </Button>
            </Link>
            {userAvatar}
          </div>
        </div>
      </div>
      <div
        className={cn(
          navBarStyles.navbarDropdown,
          {
            [navBarStyles.isMenuOpen]: showNavBarDropDown
          },
          classNames?.navbarDropdown
        )}
      >
        {links}
        {mobileDropdownCTA}
      </div>
    </div>
  )
}

export default NavBar
