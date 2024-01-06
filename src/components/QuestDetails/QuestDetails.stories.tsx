import type { Meta, StoryObj } from '@storybook/react'

import kosiumGhoul from '@/assets/Kosium_Ghoul.png'

/* eslint-disable-next-line */
// @ts-ignore
import cupheadCard from '@/assets/steamCards/cupheadCard.jpg'

/* eslint-disable-next-line */
// @ts-ignore
import cyberpunkCard from '@/assets/steamCards/cyberpunkCard.jpg'

import QuestDetails from '.'
import { QuestDetailsProps } from './types'

const meta: Meta<typeof QuestDetails> = {
  title: 'Quests/QuestDetails',
  component: QuestDetails
}

export default meta

type Story = StoryObj<typeof QuestDetails>

const props: QuestDetailsProps = {
  title: 'Eternal Ember: Shadows of the Celestial Nexus',
  description:
    'Shadows of the Celestial NexusEmbark on a cosmic odyssey as the chosen guardian of the Eternal Ember. Traverse astral realms, unravel celestial mysteries, and confront shadowy entities threatening the balance of the Celestial Nexus. Master arcane powers, forge alliances with otherworldly beings, and navigate intricate puzzles. \n \nWill you rise to the challenge and become the savior of the Celestial Nexus, or succumb to the shadows that threaten to engulf the eternal flame?',
  eligibility: {
    games: [
      { title: 'Call of Duty', imageUrl: cupheadCard },
      { title: 'Skyrim', imageUrl: cyberpunkCard }
    ],
    completionPercent: 50,
    eligible: true,
    steamAccountLinked: true
  },
  rewards: [
    {
      title: 'Kosium Pioneer',
      imageUrl: kosiumGhoul,
      tokenId: 213
    }
  ],
  onClaimClick: () => console.log('claim clicked!')
}

export const Default: Story = {
  args: { ...props }
}
