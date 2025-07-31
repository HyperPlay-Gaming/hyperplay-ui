import type { Meta, StoryObj } from '@storybook/react'

import MoonBlastersCover from '@/assets/MoonBlastersCover.png?url'
import RocketMonstersCover from '@/assets/RocketMonstersCover.png?url'

import GameCard, { GameCardProps } from '.'
import { i18nDefault } from './index'

const props: GameCardProps = {
  store: 'hyperplay',
  title: 'Test Game',
  state: 'NOT_INSTALLED',
  onDownloadClick: () => console.log('download clicked'),
  onFavoriteClick: () => console.log('favorite clicked'),
  onPlayClick: () => console.log('play clicked'),
  onRemoveFromQueueClick: () => console.log('remove from queue clicked'),
  onStopPlayingClick: () => console.log('stop playing clicked'),
  onPauseClick: () => console.log('pause download clicked'),
  onStopDownloadClick: () => console.log('stop download clicked'),
  settingsItems: [
    { label: 'Update', onClick: () => console.log('update clicked') },
    {
      label: 'Add to Steam',
      onClick: () => console.log('add to steam clicked')
    },
    { label: 'Move game', onClick: () => console.log('Move game clicked') },
    {
      label: 'Add to Steam',
      onClick: () => console.log('add to steam clicked')
    },
    { label: 'Move game', onClick: () => console.log('Move game clicked') },
    { label: 'Game page', onClick: () => console.log('Game page clicked') }
  ],
  showSettings: false,
  onSettingsClick: () => console.log('settings button clicked'),
  onUpdateClick: () => console.log('update button clicked'),
  onResumeClick: () => console.log('resume button clicked'),
  i18n: i18nDefault,
  platformsAvailable: [
    'android_arm64',
    'darwin_amd64',
    'darwin_arm64',
    'linux_386',
    'web',
    'windows_amd64',
    'windows_386'
  ]
}

const meta: Meta<typeof GameCard> = {
  title: 'GameCard',
  component: GameCard,
  parameters: {
    store: {
      values: [
        { name: 'HyperPlay', value: 'hyperplay' },
        { name: 'GOG', value: 'gog' },
        { name: 'Epic', value: 'legendary' },
        { name: 'Amazon', value: 'nile' },
        { name: 'Sideload', value: 'sideload' }
      ]
    },
    state: {
      values: [
        'NOT_INSTALLED',
        'QUEUED',
        'PLAYING',
        'INSTALLED',
        'SHOW_MESSAGE',
        'NOT_SUPPORTED',
        'UNINSTALLING',
        'INSTALLING',
        'PAUSED',
        'NEEDS_UPDATE',
        'EXTRACTING',
        'DOWNLOADING_DISTRIBUTABLES',
        'PREPARING'
      ]
    }
  }
}

type Story = StoryObj<typeof GameCard>

export const HyperPlayCard: Story = {
  args: { ...props }
}

export const MoonBlasters: Story = {
  args: { ...props, imageUrl: MoonBlastersCover, title: 'Moon Blasters' }
}

export const RocketMonsters: Story = {
  args: { ...props, imageUrl: RocketMonstersCover, title: 'Rocket Monsters' }
}

export const DownloadingGameCard: Story = {
  args: {
    ...props,
    state: 'INSTALLING'
  }
}

export const PauseDownloadGameCard: Story = {
  args: {
    ...props,
    state: 'PAUSED'
  }
}

export const ExtractingGameCard: Story = {
  args: {
    ...props,
    state: 'EXTRACTING'
  }
}

export const DownloadingDistributablesGameCard: Story = {
  args: {
    ...props,
    state: 'DOWNLOADING_DISTRIBUTABLES'
  }
}

export const PreparingGameCard: Story = {
  args: {
    ...props,
    state: 'PREPARING'
  }
}

export const QueuedGameCard: Story = {
  args: {
    ...props,
    state: 'QUEUED'
  }
}

export const PlayingGameCard: Story = {
  args: {
    ...props,
    state: 'PLAYING'
  }
}

export const Patching: Story = {
  args: {
    ...props,
    state: 'PATCHING'
  }
}

export const Extracting: Story = {
  args: {
    ...props,
    state: 'EXTRACTING'
  }
}

export const notAddedToLibrary: Story = {
  args: {
    ...props,
    app: 'storeInClient',
    state: 'INSTALLED',
    notAddedText: 'Add to library'
  }
}
export const AddedToLibrary: Story = {
  args: {
    ...props,
    app: 'storeInClient',
    gameIsAddedToLibrary: true,
    state: 'INSTALLED',
    addedText: 'Remove from library',
    onAddToLibraryClick: () => console.log('add to library clicked')
  }
}

export default meta
