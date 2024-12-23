import type { Meta, StoryObj } from '@storybook/react'

import QuestList from './index'
import QuestListi18n from './index'

const meta: Meta<typeof QuestList> = {
  title: 'Quests/QuestList',
  component: QuestList
}

export default meta

type Story = StoryObj<typeof QuestList>

const i18n: typeof QuestListi18n = {
  ready: 'Ready',
  active: 'Active',
  quests: 'Quests',
  viewAllButton: 'View all'
}

const props = { i18n }

export const Default: Story = {
  args: { ...props }
}
