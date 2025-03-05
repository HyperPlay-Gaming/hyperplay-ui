import React, { ElementType, useRef, useState } from 'react'

import burgerMenuIcon from '@/assets/images/BurgerClosedIcon.svg?url'
import hpIconLight from '@/assets/images/MobileHpLogo.svg?url'

import Button from '../Button'
import navBarStyles from './NavBar.module.scss'

interface Props<LinkType extends ElementType = 'a'> {
  UserAvatar?: React.ReactNode
  links: React.ReactElement[]
  socialLinks: React.ReactElement[]
  Link?: LinkType
}

const NavBar = function ({
  UserAvatar,
  links,
  socialLinks,
  Link = 'a'
}: Props) {
  const [showNavBarDropDown, setShowNavBarDropDown] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

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
              <img src={burgerMenuIcon} alt="Menu Button" />
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
              <Button type="primary">
                <div className="button-sm">Install HyperPlay</div>
              </Button>
            </Link>
            {UserAvatar ? (
              <div className={navBarStyles.avatarDesktop}>{UserAvatar}</div>
            ) : null}
          </div>
        </div>
      </div>
      {showNavBarDropDown ? (
        <div className={navBarStyles.navbarDropdown}>{links}</div>
      ) : null}
    </>
  )
}

export default NavBar
