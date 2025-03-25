import type { Meta, StoryObj } from '@storybook/react'

import fallbackCard from '@/assets/fallback_card.jpg?url'
import {
  Base,
  Binance,
  DiscordFilled,
  Ethereum,
  Globe,
  Mantle,
  Plus,
  Polygon,
  X,
  YoutubeFilled
} from '@/assets/images'

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
  title: 'Game Name',
  version: '0.10.88',
  earlyAccess: true,
  playerCount: '1-4 Players',
  image: {
    src: fallbackCard,
    alt: 'Game cover'
  }
}

export const Default: Story = {
  args: {
    ...defaultArgs,
    image: {
      src: 'fallback_card.jpg',
      alt: 'Game cover'
    },
    blockchains: [
      {
        icon: Ethereum,
        name: 'Ethereum'
      },
      {
        icon: Polygon,
        name: 'Polygon'
      },
      {
        icon: Mantle,
        name: 'Mantle'
      },
      {
        icon: Base,
        name: 'Base'
      },
      {
        icon: Binance,
        name: 'Binance'
      }
    ],
    showRemainingCount: true,
    remainingCount: 9,
    socialLinks: [
      {
        IconButton: Globe,
        url: 'https://example.com'
      },
      {
        IconButton: X,
        url: 'https://twitter.com'
      },
      {
        IconButton: DiscordFilled,
        url: 'https://discord.com'
      },
      {
        IconButton: YoutubeFilled,
        url: 'https://youtube.com'
      }
    ],
    editorChoice: {
      isEditorChoice: true,
      year: 2025
    },
    actionButton: (
      <Button
        type="secondary"
        size="medium"
        leftIcon={<Plus />}
        className={styles.addButton}
      >
        Add to Library
      </Button>
    )
  }
}

export const noBlockchains: Story = {
  args: {
    ...defaultArgs,
    image: {
      src: 'fallback_card.jpg',
      alt: 'Game cover'
    },
    socialLinks: [
      {
        IconButton: Globe,
        url: 'https://example.com'
      },
      {
        IconButton: X,
        url: 'https://twitter.com'
      },
      {
        IconButton: DiscordFilled,
        url: 'https://discord.com'
      },
      {
        IconButton: YoutubeFilled,
        url: 'https://youtube.com'
      }
    ],
    editorChoice: {
      isEditorChoice: true,
      year: 2025
    },
    actionButton: (
      <Button
        type="secondary"
        size="medium"
        leftIcon={<Plus />}
        className={styles.addButton}
      >
        Add to Library
      </Button>
    )
  }
}

export const noSocialLinks: Story = {
  args: {
    ...defaultArgs,
    image: {
      src: 'fallback_card.jpg',
      alt: 'Game cover'
    },
    blockchains: [
      {
        icon: Ethereum,
        name: 'Ethereum'
      },
      {
        icon: Polygon,
        name: 'Polygon'
      },
      {
        icon: Mantle,
        name: 'Mantle'
      },
      {
        icon: Base,
        name: 'Base'
      },
      {
        icon: Binance,
        name: 'Binance'
      }
    ],
    editorChoice: {
      isEditorChoice: true,
      year: 2025
    },
    showRemainingCount: true,
    remainingCount: 9,
    actionButton: (
      <Button
        type="secondary"
        size="medium"
        leftIcon={<Plus />}
        className={styles.addButton}
      >
        Add to Library
      </Button>
    )
  }
}
