import React, { ElementType, useRef, useState } from 'react'

import classNames from 'classnames'

import { BurgerClosedIcon, BurgerOpenIcon } from '@/assets/images'
import hpIconLight from '@/assets/images/MobileHpLogo.svg?url'

import Button from '../Button'
import navBarStyles from './NavBar.module.scss'

interface Props<LinkType extends ElementType = 'a'> {
  UserAvatar?: React.ReactNode
  links: React.ReactElement[]
  socialLinks: React.ReactElement[]
  Link?: LinkType
  mobileDropdownCTA?: React.ReactElement
}

const NavBar = function ({
  UserAvatar,
  links,
  socialLinks,
  Link = 'a',
  mobileDropdownCTA
}: Props) {
  const [showNavBarDropDown, setShowNavBarDropDown] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  let userAvatar = null
  if (UserAvatar) {
    userAvatar = <div className={navBarStyles.avatarDesktop}>{UserAvatar}</div>
  }

  return (
    <>
      <div className={navBarStyles.bannerContainer} ref={ref}>
        <div className={navBarStyles.navbar}>
          <Link href="/">
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
          </Link>
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
                <div className="button-sm">Install HyperPlay</div>
              </Button>
            </Link>
            {userAvatar}
          </div>
        </div>
      </div>
      <div
        className={classNames(navBarStyles.navbarDropdown, {
          [navBarStyles.isMenuOpen]: showNavBarDropDown
        })}
      >
        {links}
        {mobileDropdownCTA}
      </div>
    </>
  )
}

export default NavBar
