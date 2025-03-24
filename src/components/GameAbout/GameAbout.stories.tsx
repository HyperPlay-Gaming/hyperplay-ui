import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

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

const longDescription = `Shoot, Earn, Pioneer: Now We Live in XOCIETY.

Backed by prominent investors such as HASHED, Spartan, KRAFTON, and Sui. XOCIETY stands as Sui's flagship gaming project.

Set in a deep Sci-Fi world. XOCIETY aims to redefine gaming experiences offering players economic control and transforming 
them into key decision-makers. With the revolutionary XOCIETY Corporate Share system, players take control of the core parts of XOCIETY, 
from tournament modes to wearables, they are in control and rewarded.

Developed by XOCIETY's 36 veteran developers (avg 10+ experience in gaming) from global AAA 
studios such as NCSOFT, from tournament modes to wearables, they are in control and rewarded.

Featuring PvP and PvE elements combined with RPG mechanics. With an emphasis on player experience, 
XOCIETY aimes to redefine gaming experience offering TPS players economic control, and transforming 
them into key economic agents. Unlike traditional FPS games, where a single user's activity has little 
impact on the broader game environment, decisions in XOCIETY create dynamic ripple effects throughout 
the gameplay and environment.`

// Default
export const Default: Story = {
  args: {
    titleSmall: 'About',
    description: longDescription,
    buttonLink: {
      expanded: false,
      onClick: () => console.log('Button clicked')
    },
    i18n: {
      showMore: 'Show more',
      showLess: 'Show less'
    }
  }
}

// With Game Name
export const WithGameName: Story = {
  args: {
    gameName: 'XOCIETY',
    description: longDescription,
    buttonLink: {
      expanded: false,
      onClick: () => console.log('Button clicked')
    },
    i18n: {
      showMore: 'Show more',
      showLess: 'Show less'
    }
  }
}

// With Stickers and Button
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
      expanded: false,
      onClick: () => console.log('Button clicked')
    },
    i18n: {
      showMore: 'Show more',
      showLess: 'Show less'
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    await userEvent.click(canvas.getByTestId('show-more-button'), {
      delay: 500
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const description = canvas.getByTestId('game-about-description')
    expect(description).toBeVisible()

    await expect(canvas.getByTestId('show-more-button')).toHaveStyle({
      display: 'flex'
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))
    await userEvent.click(canvas.getByTestId('show-more-button'), {
      delay: 500
    })
    await expect(canvas.getByTestId('show-more-button')).toHaveStyle({
      display: 'flex'
    })
  }
}
