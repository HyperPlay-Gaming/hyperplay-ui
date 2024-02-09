import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { IconEdit } from '@tabler/icons-react'

import { Ellipsis, TrashCan } from '@/assets/images'

import Button from '../Button'
import { rewardDetailsProps } from '../RewardDetails/RewardDetails.stories'
import { rewardDepositedTableProps } from '../RewardsDepositedTable/RewardsDepositedTable.stories'
import { formDepositRewardsProps } from './components/FormDepositRewards/FormDepositRewards.stories'
import { TokenIdItemProps } from './components/FormDepositRewards/types'
import { RewardDeposit, RewardDepositProps } from './index'

type Story = StoryObj<typeof RewardDeposit>

const meta: Meta<typeof RewardDeposit> = {
  title: 'Quests/RewardDeposit',
  component: RewardDeposit
}

export default meta

const props: RewardDepositProps = {
  title: 'Reward 1',
  icon: <Ellipsis />,
  isDeposited: false,
  depositingAmount: '100 USDC',
  rewardsProps: formDepositRewardsProps,
  editable: true,
  updateEditable: (editable) => console.log(`editable: ${editable}`),
  onFormSubmit: async () => {
    console.log('submit')
  },
  rewardDetailsProps: rewardDetailsProps,
  rewardDepositedTableProps: rewardDepositedTableProps
}

export const Default: Story = {
  args: { ...props }
}

export const Confirmed: Story = {
  args: { ...props },
  render: (args) => {
    const [editable, setEditable] = useState(false)
    const [rawTokenIds] = useState<number[]>([])
    const [tokenIds, setTokenIds] = useState<TokenIdItemProps[]>(
      args.rewardsProps.tokenIdsList
    )

    let iconButton = (
      <button onClick={() => setEditable(true)}>
        <IconEdit color="var(--color-neutral-400)" />
      </button>
    )
    if (editable) {
      iconButton = (
        <Button
          type="tertiary"
          rightIcon={<TrashCan fill="var(--color-neutral-400)" />}
        >
          Remove
        </Button>
      )
    }
    return (
      <RewardDeposit
        {...args}
        editable={editable}
        updateEditable={setEditable}
        icon={iconButton}
        isDeposited={true}
        rewardsProps={{
          ...args.rewardsProps,
          tokenIdsList: tokenIds,
          isAddTokenButtonDisabled: false,
          onAddTokenTap: () => {
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
          }
        }}
      />
    )
  }
}
