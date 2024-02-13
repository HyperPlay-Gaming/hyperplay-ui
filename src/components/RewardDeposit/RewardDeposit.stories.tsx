import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { rewardDetailsProps } from '../RewardDetails/RewardDetails.stories'
import { rewardDepositedTableProps } from '../RewardsDepositedTable/RewardsDepositedTable.stories'
import { formDepositRewardsProps } from './components/FormDepositRewards/FormDepositRewards.stories'
import { TokenIdItemProps } from './components/FormDepositRewards/types'
import { RewardDeposit, RewardDepositProps, defaultI18n } from './index'

type Story = StoryObj<typeof RewardDeposit>

const meta: Meta<typeof RewardDeposit> = {
  title: 'Quests/RewardDeposit',
  component: RewardDeposit
}

export default meta

const props: RewardDepositProps = {
  ...formDepositRewardsProps,
  title: 'Reward 1',
  isDeposited: false,
  depositingAmount: '100 USDC',
  editable: true,
  onEditableChange: async () => {
    console.log('submit')
  },
  onRemoveTap: () => {
    console.log('remove')
  },
  ...rewardDetailsProps,
  ...rewardDepositedTableProps,
  i18n: defaultI18n
}

export const Default: Story = {
  args: { ...props }
}

export const Confirmed: Story = {
  args: { ...props },
  render: (args) => {
    const [rawTokenIds] = useState<number[]>([])
    const [tokenIds, setTokenIds] = useState<TokenIdItemProps[]>(
      args.tokenIdsList
    )

    return (
      <RewardDeposit
        {...args}
        isDeposited={true}
        tokenIdsList={tokenIds}
        isAddTokenButtonDisabled={false}
        onAddTokenTap={() => {
          console.log('add token id')
          console.log(tokenIds)
          const newTokenIds = rawTokenIds.map((tokenId: number) => ({
            tokenId
          }))

          const newTokenArray: TokenIdItemProps[] = [
            ...tokenIds,
            ...newTokenIds
          ].map((token, index) => ({
            tokenId: token.tokenId,
            onRemoveTap: () => {
              const newTokens = tokenIds.splice(index, 1)

              setTokenIds(newTokens)
              console.log('remove from storybook')
            }
          }))
          console.log(newTokenArray)
          setTokenIds(newTokenArray)
        }}
      />
    )
  }
}

export const Disabled: Story = {
  args: {
    ...props,
    editable: false,
    isFormDepositDisabled: true,
    isDeposited: true
  }
}
