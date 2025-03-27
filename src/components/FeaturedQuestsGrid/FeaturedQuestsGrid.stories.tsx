import { useState } from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import { Meta, StoryObj } from '@storybook/react'
import { Listing } from '@valist/sdk/dist/typesApi'

import { FeaturedQuestsGrid } from './FeaturedQuestsGrid'

const meta: Meta<typeof FeaturedQuestsGrid> = {
  title: 'FeaturedQuestsGrid',
  component: FeaturedQuestsGrid
}

export default meta

type Story = StoryObj<typeof FeaturedQuestsGrid>

const mockListings: Listing[] = [
  {
    project_id: '1',
    project_name: 'Complete the Tutorial',
    project_meta: {
      name: 'Complete the Tutorial',
      description: 'Learn the basics of the game',
      image: 'https://picsum.photos/300/200',
      networks: []
    },
    channels: [],
    disabled: false,
    updated_at: new Date().toISOString(),
    account_meta: {
      name: 'Test Account',
      description: 'Test Account Description',
      image: 'https://picsum.photos/100/100'
    },
    account_name: 'test-account',
    timestamp: Date.now(),
    is_metamask_in_game: false,
    is_metamask_verified: false,
    is_metamask_compatible: false,
    download_badge_verified: false
  },
  {
    project_id: '2',
    project_name: 'First Victory',
    project_meta: {
      name: 'First Victory',
      description: 'Win your first match',
      image: 'https://picsum.photos/300/201',
      networks: []
    },
    channels: [],
    disabled: false,
    updated_at: new Date().toISOString(),
    account_meta: {
      name: 'Test Account',
      description: 'Test Account Description',
      image: 'https://picsum.photos/100/100'
    },
    account_name: 'test-account',
    timestamp: Date.now(),
    is_metamask_in_game: false,
    is_metamask_verified: false,
    is_metamask_compatible: false,
    download_badge_verified: false
  },
  {
    project_id: '3',
    project_name: 'Collect 100 Coins',
    project_meta: {
      name: 'Collect 100 Coins',
      description: 'Gather coins throughout the game',
      image: 'https://picsum.photos/300/202',
      networks: []
    },
    channels: [],
    disabled: false,
    updated_at: new Date().toISOString(),
    account_meta: {
      name: 'Test Account',
      description: 'Test Account Description',
      image: 'https://picsum.photos/100/100'
    },
    account_name: 'test-account',
    timestamp: Date.now(),
    is_metamask_in_game: false,
    is_metamask_verified: false,
    is_metamask_compatible: false,
    download_badge_verified: false
  },
  {
    project_id: '4',
    project_name: 'Reach Level 5',
    project_meta: {
      name: 'Reach Level 5',
      description: 'Level up your character',
      image: 'https://picsum.photos/300/203',
      networks: []
    },
    channels: [],
    disabled: false,
    updated_at: new Date().toISOString(),
    account_meta: {
      name: 'Test Account',
      description: 'Test Account Description',
      image: 'https://picsum.photos/100/100'
    },
    account_name: 'test-account',
    timestamp: Date.now(),
    is_metamask_in_game: false,
    is_metamask_verified: false,
    is_metamask_compatible: false,
    download_badge_verified: false
  }
]

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState(mockListings)
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

    const handleSetItems = (items: UniqueIdentifier[]) => {
      setItems(
        items
          .map((id) =>
            mockListings.find((listing) => listing.project_id === id)
          )
          .filter(Boolean) as Listing[]
      )
    }

    return (
      <FeaturedQuestsGrid
        options={items}
        placeholderCount={6}
        setItems={handleSetItems}
        activeId={activeId}
        setActiveId={setActiveId}
        handlePublish={() => console.log('Publishing...')}
      />
    )
  }
}
