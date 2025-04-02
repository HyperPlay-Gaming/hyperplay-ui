import type { Meta, StoryObj } from '@storybook/react'

import fallbackCard from '@/assets/fallback_card.jpg?url'

import GameInfoV2 from '.'
import Button from '../Button'
import styles from './GameInfoV2.module.scss'

const meta = {
  title: 'Components/GameInfoV2',
  component: GameInfoV2,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof GameInfoV2>

export default meta
type Story = StoryObj<typeof GameInfoV2>

const defaultArgs = {
  ImageComponent: <img src={fallbackCard} className={styles.gameImage} />,
  title: 'Game Name',
  version: '0.10.88',
  info: {
    developer: 'Developer'
  },
  earlyAccess: true,
  isLoading: false,
  playerCount: '1-4 Players'
}

export const Default: Story = {
  args: {
    ...defaultArgs,
    isLoading: false,
    blockchains: {
      chainId: [
        '292',
        '280',
        '1789',
        '2357',
        '7',
        '1',
        '11111',
        '1789',
        '236',
        '13371'
      ],
      maxVisible: 5,
      showMoreCount: true
    },
    socialLinks: [
      {
        type: 'website',
        url: 'https://example.com'
      },
      {
        type: 'twitter',
        url: 'https://twitter.com'
      },
      {
        type: 'discord',
        url: 'https://discord.com'
      },
      {
        type: 'youtube',
        url: 'https://youtube.com'
      }
    ],
    editorChoice: {
      isEditorChoice: true,
      year: 2025
    },
    actionButton: (
      <Button type="secondary" size="medium" className={styles.addButton}>
        Add to Library
      </Button>
    )
  }
}

export const noBlockchains: Story = {
  args: {
    ...defaultArgs,
    isLoading: false,
    socialLinks: [
      {
        url: 'https://example.com',
        type: 'website'
      },
      {
        url: 'https://twitter.com',
        type: 'twitter'
      },
      {
        url: 'https://discord.com',
        type: 'discord'
      },
      {
        url: 'https://youtube.com',
        type: 'youtube'
      }
    ],
    editorChoice: {
      isEditorChoice: true,
      year: 2025
    },
    actionButton: (
      <Button type="secondary" size="medium" className={styles.addButton}>
        Add to Library
      </Button>
    )
  }
}

export const isLoading: Story = {
  args: {
    ...defaultArgs,
    isLoading: true,
    ImageComponent: <div className={styles.imageLoading} />,
    info: {
      developer: 'Developer'
    },
    earlyAccess: true,
    playerCount: '1-4 Players',
    blockchains: {
      chainId: [
        '292',
        '280',
        '1789',
        '2357',
        '7',
        '1',
        '11111',
        '1789',
        '236',
        '13371'
      ],
      maxVisible: 5,
      showMoreCount: true
    },
    socialLinks: [
      {
        url: 'https://example.com',
        type: 'website'
      },
      {
        url: 'https://twitter.com',
        type: 'twitter'
      },
      {
        url: 'https://discord.com',
        type: 'discord'
      },
      {
        url: 'https://youtube.com',
        type: 'youtube'
      }
    ],
    editorChoice: {
      isEditorChoice: true,
      year: 2025
    },
    actionButton: (
      <Button type="secondary" size="medium" className={styles.addButton}>
        Add to Library
      </Button>
    )
  }
}
