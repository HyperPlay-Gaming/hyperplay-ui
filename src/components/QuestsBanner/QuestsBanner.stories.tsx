import type { Meta, StoryObj } from '@storybook/react'

import CreditsCreditsImage from '@/assets/banners/CreditsCredits.png?url'
import TreasureChestImage from '@/assets/banners/TreasureChest.png?url'

import { QuestsBanner, QuestsBannerProps } from '.'

const props: QuestsBannerProps = {
  classNames: {},
  list: [
    {
      bannerImageUrl: CreditsCreditsImage,
      title: 'Win Game7 Credits',
      description:
        'Dive into HyperPlay’s top games with 7-day streak challenges. Each activity encourages you to engage with a different game, showcasing the best of web3 gaming. Your playtime matters!',
      buttonText: 'View G7 Quests',
      onButtonTap: () => alert('View Quests clicked!')
    },
    {
      bannerImageUrl: TreasureChestImage,
      title: 'Introducing Quests',
      description:
        'You can now earn rewards for completing Quests on HyperPlay.',
      buttonText: 'View Quests',
      onButtonTap: () => alert('View Quests clicked!')
    }
  ],
  totalPages: 2,
  onPageChangeTap: (pageIndex: number) =>
    console.log(`Page changed to ${pageIndex}`)
}

const meta: Meta<typeof QuestsBanner> = {
  title: 'Store/QuestsBanner',
  component: QuestsBanner,
  args: props
}

export default meta

type Story = StoryObj<typeof QuestsBanner>

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop'
    }
  }
}

export const Smartphone: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2'
    }
  }
}

export const Tablet: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'tablet'
    }
  }
}
