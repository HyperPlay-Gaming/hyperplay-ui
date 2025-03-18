import type { Meta, StoryObj } from '@storybook/react'

import fallbackCard from '@/assets/fallback_card.jpg?url'
import { EthereumIcon } from '@/assets/images'

import GameInfoV2 from '.'

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
  },
  blockchains: [
    {
      icon: <EthereumIcon />
    }
  ],
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
  onAddToLibraryClick: () => console.log('Add to library clicked'),
  onPlayClick: () => console.log('Play clicked')
}

export const Default: Story = {
  args: {
    ...defaultArgs,
    image: {
      src: 'fallback_card.jpg',
      alt: 'Game cover'
    },
    isInLibrary: false,
    isAddingToLibrary: false,
    notAddedText: 'Add to Library',
    i18n: {
      addingText: 'Adding',
      notAddedToLibrary: 'Add to Library',
      playText: 'Play',
      title: 'Game Name',
      version: '1.0.0',
      earlyAccess: 'Early Access',
      playerCount: '1-4 Players'
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
    ]
  }
}

export const AddingToLibrary: Story = {
  args: {
    ...defaultArgs,
    image: {
      src: 'fallback_card.jpg',
      alt: 'Game cover'
    },
    isAddingToLibrary: true,
    addingText: 'Adding',
    i18n: {
      addingText: 'Adding',
      notAddedToLibrary: 'Add to Library',
      title: 'Game Name',
      version: '1.0.0',
      earlyAccess: 'Early Access',
      playerCount: '1-4 Players'
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
    ]
  }
}

export const InLibrary: Story = {
  args: {
    ...defaultArgs,
    image: {
      src: 'fallback_card.jpg',
      alt: 'Game cover'
    },
    isInLibrary: true,
    playText: 'Play',
    i18n: {
      playText: 'Play',
      title: 'Game Name',
      version: '1.0.0',
      earlyAccess: 'Early Access',
      playerCount: '1-4 Players',
      addingText: 'Adding',
      notAddedToLibrary: 'Add to Library'
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
    ]
  }
}
