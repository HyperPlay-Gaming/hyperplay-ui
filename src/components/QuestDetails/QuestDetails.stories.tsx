import { useState } from 'react'

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
        { title: 'Call of Duty', imageUrl: cupheadCard },
        { title: 'Skyrim', imageUrl: cyberpunkCard }
      ],
      completionPercent: 50,
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
  onClaimClick: () => console.log('claim clicked!'),
  collapseIsOpen: false,
  toggleCollapse: () => console.log('toggle')
}

export const Default: Story = {
  args: { ...props }
}

export const SmallMaxHeight: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <QuestDetails
          {...args}
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}

export const NoRewards: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <QuestDetails
          {...args}
          rewards={[]}
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}

export const LoadingRewards: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <QuestDetails
          {...args}
          rewards={[]}
          rewardsLoading={true}
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}

export const LoadingDetails: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <QuestDetails
          {...args}
          loading={true}
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}

export const LoadingEligibilityGame: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    // need to parse or else we change the value for the other stories
    args = JSON.parse(JSON.stringify(args))
    if (
      args.eligibility.reputation &&
      args.eligibility.reputation.games.length > 0
    ) {
      args.eligibility.reputation.games[0].loading = true
    }
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <QuestDetails
          {...args}
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}

export const PlayStreak: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <QuestDetails
          {...args}
          eligibility={{
            reputation: undefined,
            playStreak: {
              currentStreakInDays: 2,
              requiredStreakInDays: 7,
              resetTimeInMsSinceEpoch: Date.now().valueOf() + 1000 * 3600
            }
          }}
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}

export const PlayStreakFinished: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <QuestDetails
          {...args}
          eligibility={{
            reputation: undefined,
            playStreak: {
              currentStreakInDays: 7,
              requiredStreakInDays: 7,
              resetTimeInMsSinceEpoch: Date.now().valueOf() + 1000 * 3600
            }
          }}
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}

export const PlayStreakNotStarted: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <QuestDetails
          {...args}
          eligibility={{
            reputation: undefined,
            playStreak: {
              currentStreakInDays: 0,
              requiredStreakInDays: 7,
              resetTimeInMsSinceEpoch: Date.now().valueOf() + 1000 * 3600
            }
          }}
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}

export const PlayStreak23Days: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <QuestDetails
          {...args}
          eligibility={{
            reputation: undefined,
            playStreak: {
              currentStreakInDays: 12,
              requiredStreakInDays: 23,
              resetTimeInMsSinceEpoch: Date.now().valueOf() + 1000 * 3600
            }
          }}
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}

export const PlayStreak25Days: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <QuestDetails
          {...args}
          eligibility={{
            reputation: undefined,
            playStreak: {
              currentStreakInDays: 10,
              requiredStreakInDays: 25,
              resetTimeInMsSinceEpoch: Date.now().valueOf() + 1000 * 3600
            }
          }}
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}
