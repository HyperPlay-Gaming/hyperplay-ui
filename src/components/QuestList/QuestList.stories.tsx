import type { Meta, StoryObj } from '@storybook/react'
import { QuestListProps } from './types'
import QuestList from './index'
import Sticker from '@/components/Sticker'

const meta: Meta<typeof QuestList> = {
  title: 'Quests/QuestList',
  component: QuestList
}

export default meta

type Story = StoryObj<typeof QuestList>

const props: QuestListProps = {
  i18n: {
    selected: true,
    title: 'Quests',
    duration: '0/7 Days',
    resetTime: 'Day resets:',
    time: '23:43:03 (UTC)',
    questType: 'PLAYSTREAK',
    reward: '1 Azuki',
    viewAllButton: 'View All',
    badgeOne: Sticker,
    badgeTwo: Sticker,
    state: 'READY_FOR_CLAIM',
    quests: []
  }
}

export const Default: Story = {
  args: { ...props }
}
