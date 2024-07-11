import type { Meta, StoryObj } from '@storybook/react'

import CreditsCreditsImage from '@/assets/banners/CreditsCredits.png?url'
import TreasureChstImage from '@/assets/banners/TreasureChst.png?url'

import { QuestsBanner, QuestsBannerProps } from '.'

const props: QuestsBannerProps = {
  classNames: {},
  list: [
    {
      bannerImageUrl: TreasureChstImage,
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
  onCloseButtonTap: () => console.log('Close button clicked!'),
  onPageChangeTap: (pageIndex: number) =>
    console.log(`Page changed to ${pageIndex}`)
}

const meta: Meta<typeof QuestsBanner> = {
  title: 'Store/QuestsBanner',
  component: QuestsBanner,
  args: props,
  render: (args) => (
    <div
      style={{
        padding: '3rem 4rem'
      }}
    >
      <QuestsBanner {...args} />
    </div>
  )
}

export default meta

type Story = StoryObj<typeof QuestsBanner>

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  render: (args) => (
    <div
      style={{
        width: 'max-content',
        padding: '3rem 4rem'
      }}
    >
      <QuestsBanner {...args} />
    </div>
  )
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
