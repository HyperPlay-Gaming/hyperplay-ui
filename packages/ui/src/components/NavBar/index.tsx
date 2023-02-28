import React from 'react'

import { ReactComponent as HyperplayLogo } from '../../assets/logos/hyperplayHorizontal.svg'
import { ReactComponent as DiscordLogo } from '../../assets/logos/discord.svg'
import { ReactComponent as TwitterLogo } from '../../assets/logos/twitter.svg'
import { ReactComponent as GithubLogo } from '../../assets/logos/github.svg'

import {
  BurgerClosedIcon,
  BurgerOpenIcon,
  MobileHpLogo
} from '../../assets/images'

import styles from './NavBar.module.scss'
import Button from '../Button'
import { useClickAway } from 'react-use'

export interface NavBarProps {
  activeSite?: 'store' | 'docs' | 'submit-game' | 'landing-page'
}

const navItems: {
  text: string
  href: string
  newTab: boolean
  site: NavBarProps['activeSite']
}[] = [
  {
    text: 'STORE',
    href: 'https://store.hyperplay.xyz/',
    newTab: false,
    site: 'store'
  },
  {
    text: 'DOCS',
    href: 'https://docs.hyperplaygaming.com/',
    newTab: true,
    site: 'docs'
  },
  {
    text: 'FAQ',
    href: 'https://docs.hyperplaygaming.com/faq',
    newTab: true,
    site: 'docs'
  },
  {
    text: 'SUBMIT A GAME',
    href: 'https://forms.gle/A3mQ8A7CTWrDo8LD6',
    newTab: true,
    site: 'submit-game'
  }
]

const NavBar = ({ activeSite }: NavBarProps) => {
  const [isOpen, setOpen] = React.useState(false)
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)

  useClickAway(mobileMenuRef, () => setOpen(false))

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <a href="https://hyperplaygaming.com/">
          <HyperplayLogo className={styles.desktopLogo} />
          <MobileHpLogo className={styles.mobileLogo} />
        </a>
        <div className={styles.menu}>
          <div className={styles.links}>
            {navItems.map(({ href, text, newTab, site }, index) => (
              <a
                href={href}
                rel="noopener noreferrer"
                target={newTab ? '_blank' : '_self'}
                key={index}
              >
                <Button type="menuItem" active={site === activeSite}>
                  {text}
                </Button>
              </a>
            ))}
          </div>

          <div className={styles.socials}>
            <a
              href="https://discord.gg/Vx4ky6ZbAK"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordLogo />
            </a>
            <a
              href="https://twitter.com/HyperPlayGaming"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterLogo />
            </a>
            <a
              href="https://github.com/HyperPlay-Gaming/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubLogo />
            </a>
          </div>
        </div>
        <div className={styles.burger} onClick={() => setOpen(!isOpen)}>
          {isOpen ? <BurgerOpenIcon /> : <BurgerClosedIcon />}
        </div>
        {isOpen && (
          <div ref={mobileMenuRef} className={styles.mobileMenu}>
            {navItems.map(({ href, text, newTab, site }, index) => (
              <a
                href={href}
                rel="noopener noreferrer"
                target={newTab ? '_blank' : '_self'}
                key={index}
                className={styles.mobileMenuItem}
              >
                <Button type="menuItem" active={site === activeSite}>
                  {text}
                </Button>
              </a>
            ))}
            <a
              href="https://discord.gg/Vx4ky6ZbAK"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileMenuItem}
            >
              <Button type="menuItem" active={false}>
                Discord
              </Button>
            </a>
            <a
              href="https://twitter.com/HyperPlayGaming"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileMenuItem}
            >
              <Button type="menuItem" active={false}>
                Twitter
              </Button>
            </a>
            <a
              href="https://github.com/HyperPlay-Gaming/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileMenuItem}
            >
              <Button type="menuItem" active={false}>
                Github
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
