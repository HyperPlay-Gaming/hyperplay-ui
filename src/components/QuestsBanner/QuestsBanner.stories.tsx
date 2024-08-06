import type { Meta, StoryObj } from '@storybook/react'

import CreditsCreditsImage from '@/assets/banners/CreditsCredits.png?url'
import TreasureChestImage from '@/assets/banners/TreasureChest.png?url'

import { QuestsBanner, QuestsBannerProps } from '.'

const props: QuestsBannerProps = {
  classNames: {},
  list: [
    {
      bannerImageUrl: TreasureChestImage,
      title: 'Introducing Quests',
      description:
        'You can now earn rewards for completing Quests on HyperPlay.',
      buttonText: 'View Quests',
      onButtonTap: () => alert('View Quests clicked!')
    },
    {
      bannerImageUrl: CreditsCreditsImage,
      title: 'Introducing Game7 Credits',
      description:
        'You can now earn G7 Credits for completing Quests on HyperPlay.',
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
