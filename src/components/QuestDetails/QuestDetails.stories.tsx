import type { Meta, StoryObj } from '@storybook/react'

import QuestDetails from '.'
import { QuestDetailsProps } from './types'

const meta: Meta<typeof QuestDetails> = {
  title: 'Quests/QuestDetails',
  component: QuestDetails
}

export default meta

type Story = StoryObj<typeof QuestDetails>

const props: QuestDetailsProps = {
  title: 'Quest Title',
  description: 'This is a description.',
  eligibility: {
    games: ['Call of Duty', 'Skyrim'],
    completionPercent: 50,
    eligible: true,
    steamAccountLinked: true
  },
  rewards: [
    {
      title: 'BAYC',
      imageUrl: '',
      tokenId: 0
    }
  ]
}

export const Default: Story = {
  args: { ...props }
}
