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
import StreakProgress from '../StreakProgress'
import styles from './QuestDetailsStory.module.scss'
import { QuestDetailsProps } from './types'

const meta: Meta<typeof QuestDetails> = {
  title: 'Quests/QuestDetails',
  component: QuestDetails
}

export default meta

type Story = StoryObj<typeof QuestDetails>

const props: QuestDetailsProps = {
  isSignedIn: true,
  title: 'Eternal Ember: Shadows of the Celestial Nexus',
  description:
    'Shadows of the Celestial NexusEmbark on a cosmic odyssey as the chosen guardian of the Eternal Ember. Traverse astral realms, unravel celestial mysteries, and confront shadowy entities threatening the balance of the Celestial Nexus. Master arcane powers, forge alliances with otherworldly beings, and navigate intricate puzzles. \n \nWill you rise to the challenge and become the savior of the Celestial Nexus, or succumb to the shadows that threaten to engulf the eternal flame?',
  eligibilityComponents: [
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
  rewards: [
    {
      title: 'Kosium Pioneer',
      imageUrl: kosiumGhoul,
      chainName: 'Ethereum Mainnet',
      numToClaim: '999999999999',
      numOfClaimsLeft: '999999999'
    },
    {
      title: 'SAND',
      imageUrl: SAND,
      chainName: 'Ethereum Mainnet',
      numToClaim:
        '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
      numOfClaimsLeft:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935'
    },
    {
      title: 'Droid',
      imageUrl: droid,
      chainName: 'Ethereum Mainnet',
      numToClaim: '9999999999999',
      numOfClaimsLeft: '99999999999999'
    },
    {
      title: 'Kosium Pioneer',
      imageUrl: kosiumGhoul,
      chainName: 'Ethereum Mainnet',
      numToClaim: '123',
      numOfClaimsLeft: '333'
    },
    {
      title: 'SAND',
      imageUrl: SAND,
      chainName: 'Points',
      numToClaim: '0.001',
      numOfClaimsLeft: '10000'
    },
    {
      title: 'Droid',
      imageUrl: droid,
      chainName: 'Points',
      numToClaim: '0.000001',
      numOfClaimsLeft: '1000'
    },
    {
      title: 'Standard Issue Starfighter',
      imageUrl: droid,
      chainName: 'Points',
      numToClaim: '0.000001',
      numOfClaimsLeft: '1000'
    }
  ],
  chainTooltips: {
    Points:
      'Points are off-chain fungible rewards that may or may not be redeemable for an on-chain reward in the future. This is up to the particular game developer who is providing this reward.'
  },
  onClaimClick: () => console.log('claim clicked!'),
  onSignInClick: () => console.log('sign in clicked!'),
  onConnectSteamAccountClick: () =>
    console.log('connect steam account clicked!'),
  questType: 'REPUTATIONAL-AIRDROP'
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
    onSync={() => console.log('sync')}
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
          eligibilityComponents={[
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
          rewards={[]}
          eligibilityComponents={[
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
          rewards={[]}
          rewardsLoading={true}
          eligibilityComponents={[
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
          eligibilityComponents={[
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
          eligibilityComponents={[
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
          eligibilityComponents={defaultPlayStreakEligbility}
          questType="PLAYSTREAK"
        />
      </div>
    )
  }
}

export const IsMinting: Story = {
  args: { ...props, isMinting: true }
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
      actionText: 'Create Discord Ticket',
      variant: 'danger'
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
    eligibilityComponents: defaultPlayStreakEligbility,
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
    eligibilityComponents: dummyReputationAirdropEligbility,
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
    eligibilityComponents: dummyReputationAirdropEligbility,
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
    rewards: [
      ...props.rewards,
      {
        title: 'Kosium Pioneer',
        imageUrl: kosiumGhoul,
        chainName: 'Ethereum Mainnet',
        numToClaim: '999999999999',
        numOfClaimsLeft: '999999999',
        isClaimed: true,
        marketplaceUrl: 'https://hyperplay.xyz/marketplace/kosium-pioneer'
      }
    ],
    eligibilityComponents: dummyReputationAirdropEligbility,
    questType: 'REPUTATIONAL-AIRDROP',
    ctaComponent: (
      <Button type="secondary" className={styles.installBtn}>
        Play/Install
      </Button>
    )
  }
}

export const RewardMarketplaceLink: Story = {
  args: {
    ...props,
    rewards: [
      ...props.rewards,
      {
        title: 'Kosium Pioneer',
        imageUrl: kosiumGhoul,
        chainName: 'Ethereum Mainnet',
        numToClaim: '999999999999',
        numOfClaimsLeft: '999999999',
        isClaimed: true,
        marketplaceUrl: 'https://hyperplay.xyz/marketplace/kosium-pioneer'
      }
    ],
    eligibilityComponents: dummyReputationAirdropEligbility,
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
    eligibilityComponents: [
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
        onSync={() => console.log('sync')}
        showSyncProgressButton={true}
      />
    ]
  }
}
