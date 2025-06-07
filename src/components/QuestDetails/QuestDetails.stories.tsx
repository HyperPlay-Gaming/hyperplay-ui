import { useState } from 'react'

import { oneDayInMs } from '@hyperplay/utils'
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
import AssociatedGamesCollapse from '../AssociatedGamesCollapse'
import Button from '../Button'
import MarkdownDescription from '../MarkdownDescription'
import { StreakProgress } from '../StreakProgress'
import styles from './QuestDetailsStory.module.scss'
import { Reward } from './components/Reward'
import { Rewards } from './components/Rewards'
import { RewardsRow } from './components/Rewards/RewardsRow'
import { QuestDetailsProps, QuestReward } from './types'
import dayjs from 'dayjs'

const meta: Meta<typeof QuestDetails> = {
  title: 'Quests/QuestDetails',
  component: QuestDetails
}

export default meta

type Story = StoryObj<typeof QuestDetails>

const rewardsData: QuestReward[] = [
  {
    title: 'Kosium Pioneer',
    imageUrl: kosiumGhoul,
    chainName: 'Ethereum Mainnet',
    numToClaim: '999999999999',
    numOfClaimsLeft: '999999999',
    marketplaceUrl: 'https://hyperplay.xyz/marketplace/kosium-pioneer'
  },
  {
    title: 'SAND',
    imageUrl: SAND,
    chainName: 'Ethereum Mainnet',
    numToClaim:
      '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
    numOfClaimsLeft:
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    marketplaceUrl: 'https://hyperplay.xyz/marketplace/kosium-pioneer'
  },
  {
    title: 'Droid',
    imageUrl: droid,
    chainName: 'Ethereum Mainnet',
    numToClaim: '9999999999999',
    numOfClaimsLeft: '99999999999999',
    marketplaceUrl: 'https://hyperplay.xyz/marketplace/kosium-pioneer'
  },
  {
    title: 'Kosium Pioneer',
    imageUrl: kosiumGhoul,
    chainName: 'Ethereum Mainnet',
    numToClaim: '123',
    numOfClaimsLeft: '333',
    marketplaceUrl: 'https://hyperplay.xyz/marketplace/kosium-pioneer'
  },
  {
    title: 'SAND',
    imageUrl: SAND,
    chainName: 'Points',
    numToClaim: '0.001',
    numOfClaimsLeft: '10000',
    marketplaceUrl: 'https://hyperplay.xyz/marketplace/kosium-pioneer'
  },
  {
    title: 'Droid',
    imageUrl: droid,
    chainName: 'Points',
    numToClaim: '0.000001',
    numOfClaimsLeft: '1000',
    marketplaceUrl: 'https://hyperplay.xyz/marketplace/kosium-pioneer'
  },
  {
    title: 'Standard Issue Starfighter',
    imageUrl: droid,
    chainName: 'Points',
    numToClaim: '0.000001',
    numOfClaimsLeft: '1000',
    marketplaceUrl: 'https://hyperplay.xyz/marketplace/kosium-pioneer'
  }
]

// create arrays by category for rewards
const rewardsByCategory: Record<string, QuestReward[]> = {}
for (const reward_i of rewardsData) {
  if (Object.hasOwn(rewardsByCategory, reward_i.chainName)) {
    rewardsByCategory[reward_i.chainName].push(reward_i)
  } else {
    rewardsByCategory[reward_i.chainName] = [reward_i]
  }
}

const rewardsContent = Object.keys(rewardsByCategory).map((rewardCategory) => {
  let rewardsContent = null
  if (rewardsData.length > 0) {
    rewardsContent = rewardsData.map((reward_i) => (
      <Reward
        reward={reward_i}
        key={reward_i.title}
        onClaim={() => alert('claim clicked')}
      />
    ))
  }

  return (
    <RewardsRow category={rewardCategory} key={rewardCategory}>
      {rewardsContent}
    </RewardsRow>
  )
})

const rewardsComponent = <Rewards>{rewardsContent}</Rewards>

const props: QuestDetailsProps = {
  isSignedIn: true,
  title: 'Eternal Ember: Shadows of the Celestial Nexus',
  gameTitle: 'Game title',
  description:
    'Shadows of the Celestial NexusEmbark on a cosmic odyssey as the chosen guardian of the Eternal Ember. Traverse astral realms, unravel celestial mysteries, and confront shadowy entities threatening the balance of the Celestial Nexus. Master arcane powers, forge alliances with otherworldly beings, and navigate intricate puzzles. \n \nWill you rise to the challenge and become the savior of the Celestial Nexus, or succumb to the shadows that threaten to engulf the eternal flame?',
  eligibilityComponent: [
    <AssociatedGamesCollapse
      opened={true}
      toggle={() => console.log('toggle')}
      games={[
        { title: 'Call of Duty', imageUrl: cupheadCard },
        { title: 'Skyrim', imageUrl: cyberpunkCard }
      ]}
      key={'reputationEligibility'}
    />
  ],
  steamAccountIsLinked: true,
  onSignInClick: () => console.log('sign in clicked!'),
  onConnectSteamAccountClick: () =>
    console.log('connect steam account clicked!'),
  questType: 'REPUTATIONAL-AIRDROP',
  rewardsComponent
}

const dummyReputationAirdropEligbility = [
  <AssociatedGamesCollapse
    opened={true}
    toggle={() => console.log('toggle')}
    games={[
      { title: 'Call of Duty', imageUrl: cupheadCard },
      { title: 'Skyrim', imageUrl: cyberpunkCard }
    ]}
    key={'reputationEligibility'}
  />
]

const defaultPlayStreakEligbility = [
  <StreakProgress
    currentStreakInDays={2}
    requiredStreakInDays={7}
    minimumSessionTimeInSeconds={100}
    accumulatedPlaytimeTodayInSeconds={10}
    lastPlaySessionCompletedDateTimeUTC={new Date(
      Date.now() - oneDayInMs
    ).toUTCString()}
    dateTimeCurrentSessionStartedInMsSinceEpoch={Date.now()}
    key={'playstreakEligibility'}
  />
]

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
          eligibilityComponent={[
            <AssociatedGamesCollapse
              opened={open}
              toggle={() => setOpen(!open)}
              games={[
                { title: 'Call of Duty', imageUrl: cupheadCard },
                { title: 'Skyrim', imageUrl: cyberpunkCard }
              ]}
              key={'reputationEligibility'}
            />
          ]}
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
          rewardsComponent={rewardsComponent}
          eligibilityComponent={[
            <AssociatedGamesCollapse
              opened={open}
              toggle={() => setOpen(!open)}
              games={[
                { title: 'Call of Duty', imageUrl: cupheadCard },
                { title: 'Skyrim', imageUrl: cyberpunkCard }
              ]}
              key={'reputationEligibility'}
            />
          ]}
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
          rewardsComponent={rewardsComponent}
          eligibilityComponent={[
            <AssociatedGamesCollapse
              opened={open}
              toggle={() => setOpen(!open)}
              games={[
                { title: 'Call of Duty', imageUrl: cupheadCard },
                { title: 'Skyrim', imageUrl: cyberpunkCard }
              ]}
              key={'reputationEligibility'}
            />
          ]}
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
          eligibilityComponent={[
            <AssociatedGamesCollapse
              opened={open}
              toggle={() => setOpen(!open)}
              games={[
                { title: 'Call of Duty', imageUrl: cupheadCard },
                { title: 'Skyrim', imageUrl: cyberpunkCard }
              ]}
              key={'reputationEligibility'}
            />
          ]}
        />
      </div>
    )
  }
}

export const LoadingEligibilityGame: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ height: '500px', width: '100%' }}>
        <QuestDetails
          {...args}
          loading={true}
          eligibilityComponent={[
            <AssociatedGamesCollapse
              opened={open}
              toggle={() => setOpen(!open)}
              games={[
                { title: 'Call of Duty', imageUrl: cupheadCard },
                { title: 'Skyrim', imageUrl: cyberpunkCard }
              ]}
              key={'reputationEligibility'}
            />
          ]}
        />
      </div>
    )
  }
}

export const PlayStreak: Story = {
  args: { ...props },
  render: (args) => {
    return (
      <div>
        <QuestDetails
          {...args}
          eligibilityComponent={defaultPlayStreakEligbility}
          questType="PLAYSTREAK"
        />
      </div>
    )
  }
}

export const ErrorMessage: Story = {
  args: { ...props, errorMessage: 'User rejected transaction.' }
}

export const MultilineErrorMessage: Story = {
  args: {
    ...props,
    errorMessage:
      'Insufficient wallet balance to claim your reward due to gas fees. Try a different wallet or replenish this one before retrying.'
  }
}

export const QuestsPageInClient: Story = {
  args: {
    ...props,
    isQuestsPage: true,
    onPlayClick: () => console.log('play clicked'),
    onSecondCTAClick: () => console.log('2nd cta clicked'),
    showSecondCTA: true
  }
}

export const WithAlert: Story = {
  args: {
    ...props,
    alertProps: {
      showClose: false,
      title: 'Claim Failed',
      message:
        "Please try once more. If it still doesn't work, create a Discord support ticket.",
      variant: 'error'
    }
  }
}

export const Sync: Story = {
  args: {
    ...props,
    questType: 'PLAYSTREAK',
    showSync: true,
    onSyncClick: () => console.log('sync clicked'),
    isSyncing: false
  }
}

export const CustomCtaPlatstreak: Story = {
  args: {
    ...props,
    eligibilityComponent: defaultPlayStreakEligbility,
    questType: 'PLAYSTREAK',
    ctaComponent: (
      <Button type="secondary" className={styles.installBtn}>
        Play/Install
      </Button>
    )
  }
}

export const CustomCtaReputationalAirdrop: Story = {
  args: {
    ...props,
    eligibilityComponent: dummyReputationAirdropEligbility,
    questType: 'REPUTATIONAL-AIRDROP',
    ctaComponent: (
      <Button type="secondary" className={styles.installBtn}>
        Play/Install
      </Button>
    )
  }
}

export const DescriptionCustomElement: Story = {
  args: {
    ...props,
    description: (
      <MarkdownDescription>
        **Good luck, adventurer!** For more details, visit
        [hyperplay.xyz](https://hyperplay.xyz)
      </MarkdownDescription>
    ),
    eligibilityComponent: dummyReputationAirdropEligbility,
    questType: 'REPUTATIONAL-AIRDROP',
    ctaComponent: (
      <Button type="secondary" className={styles.installBtn}>
        Play/Install
      </Button>
    )
  }
}

export const isClaimed: Story = {
  args: {
    ...props,
    rewardsComponent,
    eligibilityComponent: dummyReputationAirdropEligbility,
    questType: 'REPUTATIONAL-AIRDROP',
    ctaComponent: (
      <Button type="secondary" className={styles.installBtn}>
        Play/Install
      </Button>
    )
  }
}

export const WithExternalSyncButton: Story = {
  args: {
    ...props,
    questType: 'PLAYSTREAK',
    eligibilityComponent: [
      <StreakProgress
        currentStreakInDays={2}
        requiredStreakInDays={7}
        minimumSessionTimeInSeconds={100}
        accumulatedPlaytimeTodayInSeconds={10}
        lastPlaySessionCompletedDateTimeUTC={new Date(
          Date.now() - oneDayInMs
        ).toUTCString()}
        dateTimeCurrentSessionStartedInMsSinceEpoch={Date.now()}
        key={'playstreakEligibility'}
      />
    ]
  }
}

export const EndDateInFuture: Story = {
  args: {
    ...props,
    endDate: dayjs().add(7, 'day').toISOString()
  }
}

export const EndDateInPast: Story = {
  args: {
    ...props,
    endDate: '2020-04-08T00:00:00.000Z'
  }
}
