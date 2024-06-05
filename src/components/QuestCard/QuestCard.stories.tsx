import type { Meta, StoryObj } from '@storybook/react'

import cupheadCard from '@/assets/steamCards/cupheadCard.jpg?url'

import { QuestCard, QuestCardProps } from '.'

const meta: Meta<typeof QuestCard> = {
  title: 'Quests/QuestCard',
  component: QuestCard
}

export default meta

type Story = StoryObj<typeof QuestCard>

const props: QuestCardProps = {
  image: cupheadCard,
  title: 'Forgotten Playland',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

export const Default: Story = {
  args: { ...props }
}
