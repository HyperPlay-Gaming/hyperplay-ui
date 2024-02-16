import type { Meta, StoryObj } from '@storybook/react'

import droid from '@/assets/Droid.png'
import kosiumGhoul from '@/assets/Kosium_Ghoul.png'
import SAND from '@/assets/SAND.png'

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
    reputation: {
      games: [
        {
          title: 'Call of Duty',
          imageUrl: cupheadCard,
          onMintClick: () => console.log('mint click'),
          onRefreshClick: () => console.log('refresh clicked'),
          onSyncClick: () => console.log('sync clicked'),
          mintableAchievementsCount: 26,
          mintedAchievementsCount: 12,
          totalAchievementsCount: 67
        },
        {
          title: 'Skyrim',
          imageUrl: cyberpunkCard,
          onMintClick: () => console.log('mint click'),
          onRefreshClick: () => console.log('refresh clicked'),
          onSyncClick: () => console.log('sync clicked'),
          mintableAchievementsCount: 10,
          mintedAchievementsCount: 4,
          totalAchievementsCount: 100
        }
      ],
      completionPercent: 15,
      eligible: true,
      steamAccountLinked: true
    }
  },
  rewards: [
    {
      title: 'Kosium Pioneer',
      imageUrl: kosiumGhoul
    },
    {
      title: 'SAND',
      imageUrl: SAND
    },
    {
      title: 'Droid',
      imageUrl: droid
    },
    {
      title: 'Kosium Pioneer',
      imageUrl: kosiumGhoul
    },
    {
      title: 'SAND',
      imageUrl: SAND
    },
    {
      title: 'Droid',
      imageUrl: droid
    }
  ],
  onClaimClick: () => console.log('claim clicked!')
}

export const Default: Story = {
  args: { ...props }
}

export const SmallMaxHeight: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <QuestDetails {...args} />
      </div>
    )
  }
}
