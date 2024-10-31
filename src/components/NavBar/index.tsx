import React, { useRef, useState } from 'react'

import burgerMenuIcon from '@/assets/images/BurgerClosedIcon.svg?url'
import hpIconLight from '@/assets/images/MobileHpLogo.svg?url'
import discordLogo from '@/assets/logos/discord.svg?url'
import githubLogo from '@/assets/logos/github.svg?url'
import twitterLogo from '@/assets/logos/twitter.svg?url'

import Button from '../Button'
import navBarStyles from './NavBar.module.scss'

interface Props {
  UserAvatar?: React.ReactNode
}

const NavBar = function ({ UserAvatar }: Props) {
  const [showNavBarDropDown, setShowNavBarDropDown] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  const getLinks = () => (
    <>
      <a
        className={`${navBarStyles.navItem} menu`}
        href="https://store.hyperplay.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="store"
      >
        Store
      </a>
      <a
        className={`${navBarStyles.navItem} menu`}
        href="https://docs.hyperplay.xyz/"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="docs"
      >
        Docs
      </a>
      <a
        className={`${navBarStyles.navItem} menu`}
        href="https://docs.hyperplay.xyz/faq"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="FAQ"
      >
        FAQ
      </a>
    </>
  )

  return (
    <>
      <div className={navBarStyles.bannerContainer} ref={ref}>
        <div className={navBarStyles.navbar}>
          <a href="/">
            <div className={`${navBarStyles.navLogo}`}>
              <div className={navBarStyles.navbarLogoImg}>
                <img
                  src={hpIconLight}
                  //fill={true}
                  style={{ objectFit: 'contain' }}
                  alt="HyperPlay Logo"
                  height="24px"
                  width="24px"
                />
              </div>
              <div className={navBarStyles.hpLogoText}>HyperPlay</div>
            </div>
          </a>
          <div className={navBarStyles.dropdownContainer}>
            {UserAvatar}
            <button
              className={navBarStyles.burgerMenu}
              onClick={() => setShowNavBarDropDown(!showNavBarDropDown)}
            >
              <img src={burgerMenuIcon} alt="Menu Button" />
            </button>
          </div>
          <div className={navBarStyles.links}>{getLinks()}</div>
          <div className={navBarStyles.menu}>
            <a
              className={navBarStyles.navbarLinkImg}
              href="https://discord.gg/hyperplay"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="discord-link"
            >
              <img src={discordLogo} alt="Discord Link" />
            </a>
            <a
              className={navBarStyles.navbarLinkImg}
              href="https://twitter.com/HyperPlayGaming"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="twitter-link"
            >
              <img src={twitterLogo} alt="Twitter Link" />
            </a>
            <a
              className={navBarStyles.navbarLinkImg}
              href="https://github.com/HyperPlay-Gaming"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="github-link"
            >
              <img src={githubLogo} alt="GitHub Link" />
            </a>
            <a
              className={`${navBarStyles.navItem} menu`}
              href="https://hyperplay.xyz/download"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="install-hyperplay"
            >
              <Button type="primary">
                <div className="button-sm">Install HyperPlay</div>
              </Button>
            </a>
            {UserAvatar ? (
              <div className={navBarStyles.avatarDesktop}>{UserAvatar}</div>
            ) : null}
          </div>
        </div>
      </div>
      {showNavBarDropDown ? (
        <div className={navBarStyles.navbarDropdown}>{getLinks()}</div>
      ) : null}
    </>
  )
}

export default NavBar
