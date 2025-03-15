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

const longDescription = `Shoot, Earn, Pioneer: Now We Live in XOCIETY.

Backed by prominent investors such as HASHED, Spartan, KRAFTON, and Sui. XOCIETY stands as Suis flagship gaming project.

Set in a deep Sci-Fi world. XOCIETY aims to redefine gaming experiences offering players economic control and transforming them into key decision-makers. With the revolutionary XOCIETY Corporate Share system, players take control of the core parts of XOCIETY, from...

The game features an innovative economic system where players can earn real value through gameplay. Each decision impacts the game's ecosystem, from resource management to territory control.

Players can participate in various activities including combat missions, resource gathering, and strategic planning. The game's unique blend of action and strategy creates an engaging experience for all player types.`

export const Default: Story = {
  args: {
    titleSmall: 'About this Game',
    description: longDescription
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
