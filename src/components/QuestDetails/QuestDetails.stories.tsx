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
import Button from '../Button'
import MarkdownDescription from '../MarkdownDescription'
import styles from './QuestDetailsStory.module.scss'
import { QuestDetailsProps } from './types'

const meta: Meta<typeof QuestDetails> = {
  title: 'Quests/QuestDetails',
  component: QuestDetails
}

const longTitle =
  'Super Long Name That Should Be Truncated Hope It Works Super Long Name That Should Be Truncated Hope It Works'

export default meta

type Story = StoryObj<typeof QuestDetails>

const props: QuestDetailsProps = {
  isSignedIn: true,
  title: 'Eternal Ember: Shadows of the Celestial Nexus',
  onRewardClaim: () => alert('reward claimed'),
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
      id: 1,
      name: 'Kosium Pioneer',
      image_url: kosiumGhoul,
      chainName: 'Ethereum Mainnet',
      chain_id: 1,
      numToClaim: '999999999999',
      numClaimsLeft: '999999999',
      amount_per_user: 1,
      marketplace_url: 'https://marketplace.example.com/kosium',
      isClaimed: false,
      token_ids: [
        {
          token_id: 1,
          numClaimsLeft: '999999999',
          amount_per_user: '1'
        }
      ],
      reward_type: 'ERC721',
      contract_address: '0x123...',
      decimals: 18
    },
    {
      id: 2,
      name: 'SAND',
      image_url: SAND,
      decimals: 18,
      chainName: 'Ethereum Mainnet',
      chain_id: 1,
      numToClaim:
        '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
      numClaimsLeft:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
      amount_per_user: 100,
      marketplace_url: 'https://marketplace.example.com/sand',
      isClaimed: false,
      token_ids: [
        {
          token_id: 2,
          numClaimsLeft:
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          amount_per_user: '100'
        }
      ],
      contract_address: '0x456...',
      reward_type: 'ERC20'
    },
    {
      id: 3,
      image_url: droid,
      chainName: 'Ethereum Mainnet',
      chain_id: 1,
      numToClaim: '9999999999999',
      numClaimsLeft: '99999999999999',
      amount_per_user: 1,
      marketplace_url: 'https://marketplace.example.com/droid',
      isClaimed: false,
      token_ids: [],
      contract_address: '0x789...',
      reward_type: 'ERC721',
      name: 'Droid',
      decimals: 18
    },
    {
      id: 4,
      name: 'Kosium Pioneer',
      image_url: kosiumGhoul,
      chainName: 'Ethereum Mainnet',
      chain_id: 1,
      numToClaim: '123',
      numClaimsLeft: '333',
      amount_per_user: 1,
      marketplace_url: 'https://marketplace.example.com/kosium2',
      isClaimed: false,
      token_ids: [],
      contract_address: '0xabc...',
      reward_type: 'ERC721',
      decimals: 18
    },
    {
      id: 5,
      name: 'SAND',
      image_url: SAND,
      chainName: 'Points',
      chain_id: 1,
      numToClaim: '0.001',
      numClaimsLeft: '10000',
      amount_per_user: 0.001,
      marketplace_url: 'https://marketplace.example.com/points-sand',
      isClaimed: false,
      token_ids: [
        {
          token_id: 5,
          numClaimsLeft: '10000',
          amount_per_user: '0.001'
        }
      ],
      reward_type: 'POINTS',
      contract_address: '0xdef...',
      decimals: 18
    },
    {
      id: 6,
      name: 'Droid',
      image_url: droid,
      chainName: 'Points',
      chain_id: 1,
      numToClaim: '0.000001',
      numClaimsLeft: '1000',
      amount_per_user: 0.000001,
      marketplace_url: 'https://marketplace.example.com/points-droid',
      isClaimed: false,
      token_ids: [
        {
          token_id: 6,
          numClaimsLeft: '1000',
          amount_per_user: '0.000001'
        }
      ],
      contract_address: '0xghi...',
      reward_type: 'POINTS',
      decimals: 18
    },
    {
      id: 7,
      name: 'Standard Issue Starfighter',
      image_url: droid,
      chainName: 'Points',
      chain_id: 1,
      numToClaim: '0.000001',
      numClaimsLeft: '1000',
      amount_per_user: 0.000001,
      marketplace_url: 'https://marketplace.example.com/points-starfighter',
      isClaimed: false,
      token_ids: [
        {
          token_id: 7,
          numClaimsLeft: '1000',
          amount_per_user: '0.000001'
        }
      ],
      contract_address: '0xjkl...',
      reward_type: 'POINTS',
      decimals: 18
    }
  ],
  chainTooltips: {
    Points:
      'Points are off-chain fungible rewards that may or may not be redeemable for an on-chain reward in the future. This is up to the particular game developer who is providing this reward.'
  },
  onSignInClick: () => console.log('sign in clicked!'),
  onConnectSteamAccountClick: () =>
    console.log('connect steam account clicked!'),
  collapseIsOpen: false,
  toggleCollapse: () => console.log('toggle'),
  questType: 'REPUTATIONAL-AIRDROP'
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
              minimumSessionTimeInSeconds: 100,
              accumulatedPlaytimeTodayInSeconds: 10,
              lastPlaySessionCompletedDateTimeUTC: new Date(
                Date.now() - oneDayInMs
              ).toUTCString(),
              dateTimeCurrentSessionStartedInMsSinceEpoch: Date.now()
            }
          }}
          questType="PLAYSTREAK"
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
        />
      </div>
    )
  }
}

export const LongRewardTitle: Story = {
  args: { ...props },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <div>
        <QuestDetails
          {...args}
          rewards={args.rewards.map((reward) => ({
            ...reward,
            title: longTitle
          }))}
          eligibility={{
            reputation: undefined,
            playStreak: {
              currentStreakInDays: 2,
              requiredStreakInDays: 7,
              minimumSessionTimeInSeconds: 100,
              accumulatedPlaytimeTodayInSeconds: 10,
              lastPlaySessionCompletedDateTimeUTC: new Date(
                Date.now() - oneDayInMs
              ).toUTCString(),
              dateTimeCurrentSessionStartedInMsSinceEpoch: Date.now()
            }
          }}
          questType="PLAYSTREAK"
          collapseIsOpen={open}
          toggleCollapse={() => setOpen(!open)}
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
    eligibility: {
      playStreak: undefined
    },
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
    eligibility: {
      reputation: undefined
    },
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
    eligibility: {
      reputation: undefined
    },
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
        id: 8,
        name: 'Kosium Pioneer',
        image_url: kosiumGhoul,
        chainName: 'Ethereum Mainnet',
        chain_id: 1,
        numToClaim: '999999999',
        numClaimsLeft: '999999999',
        amount_per_user: 1,
        marketplace_url: 'https://hyperplay.xyz/marketplace/kosium-pioneer',
        isClaimed: true,
        token_ids: [],
        contract_address: '0xmno...',
        reward_type: 'ERC721',
        decimals: 18
      }
    ],
    eligibility: {
      reputation: undefined
    },
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
        id: 8,
        name: 'Kosium Pioneer',
        image_url: kosiumGhoul,
        chainName: 'Ethereum Mainnet',
        numToClaim: '999999999999',
        numClaimsLeft: '999999999',
        amount_per_user: 1,
        marketplace_url: 'https://hyperplay.xyz/marketplace/kosium-pioneer',
        isClaimed: true,
        token_ids: [],
        contract_address: '0xmno...',
        reward_type: 'ERC721',
        decimals: 18,
        chain_id: 1
      }
    ],
    eligibility: {
      reputation: undefined
    },
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
    eligibility: {
      reputation: undefined,
      playStreak: {
        currentStreakInDays: 2,
        requiredStreakInDays: 7,
        minimumSessionTimeInSeconds: 100,
        accumulatedPlaytimeTodayInSeconds: 10,
        lastPlaySessionCompletedDateTimeUTC: new Date(
          Date.now() - oneDayInMs
        ).toUTCString(),
        dateTimeCurrentSessionStartedInMsSinceEpoch: Date.now()
      }
    }
  }
}
