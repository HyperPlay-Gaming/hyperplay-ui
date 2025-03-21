import React from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import xLogoFilled from '@/assets/images/XLogoFilled.svg?url'
import discordLogo from '@/assets/logos/discord.svg?url'
import githubLogo from '@/assets/logos/github.svg?url'
import { AccountAvatar, Button } from '@/index'

import NavBar from '.'
import { NavBarLink } from './NavBarLink'

// add storybook meta data
const meta: Meta<typeof NavBar> = {
  title: 'NavBar',
  component: NavBar
}

type Story = StoryObj<typeof NavBar>

export default meta

const links = [
  <NavBarLink
    linkProps={{
      href: 'https://store.hyperplay.xyz/',
      target: '_blank',
      rel: 'noopener noreferrer',
      'data-testid': 'store'
    }}
    isDropdownLink
    key="store"
  >
    Store
  </NavBarLink>,
  <NavBarLink
    linkProps={{
      href: 'https://store.hyperplay.xyz/quests',
      target: '_blank',
      rel: 'noopener noreferrer',
      'data-testid': 'quests'
    }}
    isDropdownLink
    key="quests"
  >
    Quests
  </NavBarLink>,
  <NavBarLink
    linkProps={{
      href: 'https://developers.hyperplay.xyz/',
      target: '_blank',
      rel: 'noopener noreferrer',
      'data-testid': 'developers'
    }}
    isDropdownLink
    key="developers"
  >
    Developers
  </NavBarLink>,
  <NavBarLink
    linkProps={{
      href: 'https://docs.hyperplay.xyz/',
      target: '_blank',
      rel: 'noopener noreferrer',
      'data-testid': 'docs'
    }}
    isDropdownLink
    key="docs"
  >
    Docs
  </NavBarLink>,
  <NavBarLink
    linkProps={{
      href: 'https://docs.hyperplay.xyz/faq',
      target: '_blank',
      rel: 'noopener noreferrer',
      'data-testid': 'FAQ'
    }}
    isDropdownLink
    key="FAQ"
  >
    FAQ
  </NavBarLink>
]

const socialLinks = [
  <NavBarLink
    linkProps={{
      href: 'https://discord.gg/hyperplay',
      target: '_blank',
      rel: 'noopener noreferrer',
      'data-testid': 'discord-link'
    }}
    key="discord"
  >
    <img src={discordLogo} alt="Discord Link" />
  </NavBarLink>,
  <NavBarLink
    linkProps={{
      href: 'https://x.com/HyperPlayGaming',
      target: '_blank',
      rel: 'noopener noreferrer',
      'data-testid': 'x-link'
    }}
    key="x"
  >
    <img src={xLogoFilled} alt="X Link" />
  </NavBarLink>,
  <NavBarLink
    linkProps={{
      href: 'https://github.com/HyperPlay-Gaming',
      target: '_blank',
      rel: 'noopener noreferrer',
      'data-testid': 'github-link'
    }}
    key="github"
  >
    <img src={githubLogo} alt="Github Link" />
  </NavBarLink>
]

export const Default = () => <NavBar links={links} socialLinks={socialLinks} />

export const WithUserAvatar: Story = {
  args: {
    UserAvatar: <AccountAvatar userId="johndoe@mail.com" />
  }
}

export const WithMobileDropdownCTA: Story = {
  args: {
    UserAvatar: <AccountAvatar userId="johndoe@mail.com" />,
    mobileDropdownCTA: <Button type="secondary">CTA TEST</Button>,
    links,
    socialLinks
  }
}
