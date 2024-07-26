import type { Meta, StoryObj } from '@storybook/react'

import QuestLog from '.'
import { PointsBalanceProps } from '../PointsBalance'
import { QuestLogProps } from './types'

const meta: Meta<typeof QuestLog> = {
  title: 'Quests/QuestLog',
  component: QuestLog
}

export default meta

type Story = StoryObj<typeof QuestLog>

const props: QuestLogProps = {
  quests: [
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'READY_FOR_CLAIM',
      questType: 'REPUTATIONAL-AIRDROP',
      onClick: () => {
        console.log('1st Quest Clicked!')
      },
      selected: true,
      id: 0
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'READY_FOR_CLAIM',
      questType: 'REPUTATIONAL-AIRDROP',
      id: 1
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'ACTIVE',
      questType: 'REPUTATIONAL-AIRDROP',
      selected: true,
      id: 2
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'ACTIVE',
      questType: 'REPUTATIONAL-AIRDROP',
      id: 3
    },
    {
      title: 'Eternal Ember: Shadows of the Celestial Nexus',
      state: 'CLAIMED',
      questType: 'REPUTATIONAL-AIRDROP',
      selected: true,
      id: 4
    },
    {
      title:
        'A reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeally long title',
      state: 'CLAIMED',
      questType: 'REPUTATIONAL-AIRDROP',
      id: 5
    }
  ]
}

const pointsBalancesProps: PointsBalanceProps[] = [
  {
    symbol: 'POINTS',
    name: 'Experience Points',
    balance: '100001010',
    cardProps: { position: 'top' }
  },
  {
    symbol: 'G7C',
    name: 'Game7 Credits',
    balance: '100',
    isGame7Credits: true
  }
]

export const Default: Story = {
  args: { ...props }
}

export const Loading: Story = {
  args: { ...props },
  render: (args) => {
    return <QuestLog {...args} loading={true} />
  }
}

export const NoneReadyForClaim: Story = {
  args: {
    ...props,
    quests: [
      {
        title: 'Eternal Ember: Shadows of the Celestial Nexus',
        state: 'ACTIVE',
        questType: 'PLAYSTREAK',
        id: 3
      }
    ]
  }
}

export const Points: Story = {
  args: {
    ...props,
    pointsProps: pointsBalancesProps
  }
}

export const PointsMaxHeight: Story = {
  args: {
    ...props,
    pointsProps: pointsBalancesProps,
    style: { maxHeight: 600 }
  }
}

export const FourPoints: Story = {
  args: {
    ...props,
    pointsProps: [...pointsBalancesProps, ...pointsBalancesProps],
    style: { maxHeight: 950 }
  }
}
