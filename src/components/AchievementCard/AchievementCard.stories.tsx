import type { Meta, StoryObj } from '@storybook/react'

import cupheadCard from '@/assets/steamCards/cupheadCard.jpg?url'
import cyberpunkCard from '@/assets/steamCards/cyberpunkCard.jpg?url'
import reCard from '@/assets/steamCards/residentEvilCard.jpg?url'

import AchievementCard, { AchievementCardProps } from '.'

const meta: Meta<typeof AchievementCard> = {
  title: 'Achievements/AchievementCard',
  component: AchievementCard
}

export default meta

type Story = StoryObj<typeof AchievementCard>

const props: AchievementCardProps = {
  image: reCard,
  title: 'Diablo II',
  mintedAchievementsCount: 5,
  mintableAchievementsCount: 10,
  totalAchievementsCount: 30
}

export const Default: Story = {
  args: { ...props }
}

export const Disabled: Story = {
  args: {
    ...props,
    title: 'Star Wars: Knights of the Old Republic',
    state: 'default',
    ctaProps: { disabled: true }
  }
}

export const active: Story = {
  args: {
    ...props,
    title: 'Star Wars: Knights of the Old Republic',
    state: 'active',
    ctaProps: { disabled: false }
  }
}

export const update: Story = {
  args: {
    ...props,
    title: 'Star Wars: Knights of the Old Republic',
    state: 'update',
    ctaProps: { disabled: false },
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: -5
  }
}

export const NewAchievement: Story = {
  args: {
    ...props,
    ctaProps: { disabled: false },
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: -5,
    isNewAchievement: true
  }
}

export const BrokenImage: Story = {
  args: {
    ...props,
    image: 'brokenImage.jpg'
  }
}

export const LongName: Story = {
  args: {
    ...props,
    title: 'Star Wars: Knights of the Old Republic'
  }
}

export const NegativeAchievements: Story = {
  args: {
    ...props,
    mintedAchievementsCount: 5,
    mintableAchievementsCount: 10,
    totalAchievementsCount: -5
  }
}

export const SteamCardAspectRatio300px: Story = {
  args: {
    ...props,
    image: cupheadCard,
    imageProps: {
      width: 300
    }
  }
}

export const SteamCardAspectRatio400px: Story = {
  args: {
    ...props,
    image: cupheadCard,
    imageProps: {
      width: 400
    }
  }
}

export const SteamCardAspectRatio500px: Story = {
  args: {
    ...props,
    image: cupheadCard,
    imageProps: {
      width: 500
    }
  }
}

export const BrightBackgroundCard: Story = {
  args: {
    ...props,
    image: cyberpunkCard,
    ctaProps: { disabled: true }
  }
}

export const NoStatusIcon: Story = {
  args: {
    ...props,
    showStatusIcon: false
  }
}
