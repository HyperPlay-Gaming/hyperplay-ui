import type { Meta, StoryObj } from '@storybook/react'

import { AlertTriangle, Info } from '@/assets/images'

import GameAbout from '.'

const meta = {
  title: 'Components/GameAbout',
  component: GameAbout,
  parameters: {
    layout: 'centered'
  }
} as Meta<typeof GameAbout>

export default meta
type Story = StoryObj<typeof GameAbout>

const shortDescription = `Shoot, Earn, Pioneer: Now We Live in XOCIETY.

Backed by prominent investors such as HASHED, Spartan, KRAFTON, and Sui. XOCIETY stands as Sui's flagship gaming project.

Set in a deep Sci-Fi world. XOCIETY aims to redefine gaming experiences offering players economic control and transforming them into key decision-makers. With the revolutionary XOCIETY Corporate Share system, players take control of the core parts of XOCIETY, from...`

const longDescription = `Shoot, Earn, Pioneer: Now We Live in XOCIETY.

Backed by prominent investors such as HASHED, Spartan, KRAFTON, and Sui. XOCIETY stands as Sui's flagship gaming project.

Set in a deep Sci-Fi world. XOCIETY aims to redefine gaming experiences offering players economic control and transforming them into key decision-makers. With the revolutionary XOCIETY Corporate Share system, players take control of the core parts of XOCIETY, from tournament modes to wearables, they are in control and rewarded.

Developed by XOCIETY's 36 veteran developers (avg 10+ experience in gaming) from global AAA studios such as NCSOFT, from tournament modes to wearables, they are in control and rewarded.

Featuring PvP and PvE elements combined with RPG mechanics. With an emphasis on player experience, XOCIETY aimes to redefine gaming experience offering TPS players economic control, and transforming them into key economic agents. Unlike traditional FPS games, where a single user's activity has little impact on the broader game environment, decisions in XOCIETY create dynamic ripple effects throughout the gameplay and environment.`

export const Default: Story = {
  args: {
    titleSmall: 'About',
    description: longDescription,
    buttonLink: {
      onClick: () => console.log('Button clicked')
    }
  }
}

export const ShortDescription: Story = {
  args: {
    titleSmall: 'About',
    description: shortDescription,
    buttonLink: {
      onClick: () => console.log('Button clicked')
    }
  }
}

export const LongDescription: Story = {
  args: {
    titleSmall: 'About',
    description: longDescription,
    buttonLink: {
      expanded: true,
      onClick: () => console.log('Button clicked')
    }
  }
}

export const WithGameName: Story = {
  args: {
    gameName: 'XOCIETY',
    description: longDescription
  }
}

export const WithStickersAndButton: Story = {
  args: {
    titleLarge: 'About this Game',
    description: longDescription,
    sticker: [
      {
        label: 'Access Gated',
        withIcon: <AlertTriangle data-icon="alert-triangle" />
      },
      {
        label: 'On-chain assets available',
        withIcon: <Info data-icon="info" />
      }
    ],
    buttonLink: {
      onClick: () => console.log('Button clicked')
    }
  }
}
