import React from 'react'

import { ReactComponent as HyperplayLogo } from '../../assets/logos/hyperplayHorizontal.svg'
import { ReactComponent as DiscordLogo } from '../../assets/logos/discord.svg'
import { ReactComponent as TwitterLogo } from '../../assets/logos/twitter.svg'
import { ReactComponent as GithubLogo } from '../../assets/logos/github.svg'

import styles from './NavBar.module.scss'
import Button from '../Button'

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
    href: 'https://store.hyperplaygaming.com/',
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
    text: 'SUBMIT A GAME',
    href: 'https://hyperplaygaming.com/',
    newTab: true,
    site: 'submit-game'
  }
]

const NavBar = ({ activeSite }: NavBarProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <div className={`${styles.navbarLogoImg}`}>
          <a href="https://hyperplaygaming.com/">
            <HyperplayLogo />
          </a>
        </div>
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
      </div>
    </div>
  )
}

export default NavBar
