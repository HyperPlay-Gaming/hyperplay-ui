import React, { useLayoutEffect, useRef, useState } from 'react'

// import img from 'next/img'
import burgerMenuIcon from '@/assets/images/BurgerClosedIcon.svg?url'
import hpIconLight from '@/assets/images/MobileHpLogo.svg?url'
import discordLogo from '@/assets/logos/discord.svg?url'
import githubLogo from '@/assets/logos/github.svg?url'
import twitterLogo from '@/assets/logos/twitter.svg?url'

import Button from '../Button'
import navBarStyles from './NavBar.module.scss'

const NavBar = function () {
  const [showNavBarDropDown, setShowNavBarDropDown] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (ref === null || ref.current === null) return
    const { height } = ref.current.getBoundingClientRect();
    document.documentElement.style.setProperty('--nav-bar-height', `${height}px`)
  }, []);

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
        href="https://docs.hyperplaygaming.com/"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="docs"
      >
        Docs
      </a>
      <a
        className={`${navBarStyles.navItem} menu`}
        href="https://docs.hyperplaygaming.com/faq"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="FAQ"
      >
        FAQ
      </a>
      <a
        className={`${navBarStyles.navItem} menu`}
        href="https://forms.gle/A3mQ8A7CTWrDo8LD6"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="submit-game"
      >
        <Button type="secondary">
          <div className="button-sm">Submit a game</div>
        </Button>
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
          <button
            className={navBarStyles.burgerMenu}
            onClick={() => setShowNavBarDropDown(!showNavBarDropDown)}
          >
            <img
              src={burgerMenuIcon}
              //fill={true}
              style={{ objectFit: 'contain' }}
              alt="Menu Button"
            />
          </button>
          <div className={navBarStyles.menu}>
            {getLinks()}
            <a
              className={navBarStyles.navbarLinkImg}
              href="https://discord.gg/hyperplay"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="discord-link"
            >
              <img
                src={discordLogo}
                alt="Discord Link"
                //fill={true}
                style={{ objectFit: 'contain' }}
              />
            </a>
            <a
              className={navBarStyles.navbarLinkImg}
              href="https://twitter.com/HyperPlayGaming"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="twitter-link"
            >
              <img
                src={twitterLogo}
                alt="Twitter Link"
                //fill={true}
                style={{ objectFit: 'contain' }}
              />
            </a>
            <a
              className={navBarStyles.navbarLinkImg}
              href="https://github.com/HyperPlay-Gaming"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="github-link"
            >
              <img
                src={githubLogo}
                alt="Github Link"
                //fill={true}
                style={{ objectFit: 'contain' }}
              />
            </a>
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
