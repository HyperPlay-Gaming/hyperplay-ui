import type { Meta, StoryObj } from '@storybook/react'

import Sticker from '@/components/Sticker'

import QuestList from './index'
import type { QuestListProps } from './index'

const meta: Meta<typeof QuestList> = {
  title: 'Quests/QuestList',
  component: QuestList
}

export default meta

type Story = StoryObj<typeof QuestList>

const props: QuestListProps = {
  selected: true,
  i18n: {
    title: 'Quests',
    duration: '0/7 Days',
    resetTime: 'Day resets:',
    time: '23:43:03 (UTC)',
    reward: '1 Azuki',
    viewAllButton: 'View All'
  },
  state: 'READY_FOR_CLAIM',
  questType: 'PLAYSTREAK',
  quests: [],
  badgeOne: Sticker,
  badgeTwo: Sticker
}

export const Default: Story = {
  args: { ...props }
}
