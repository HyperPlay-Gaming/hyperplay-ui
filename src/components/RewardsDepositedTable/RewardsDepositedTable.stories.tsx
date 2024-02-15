import type { Meta, StoryObj } from '@storybook/react'

import { RewardsDepositedTable, RewardsDepositedTableProps } from '.'

const meta: Meta<typeof RewardsDepositedTable> = {
  title: 'Quests/RewardsDepositedTable',
  component: RewardsDepositedTable
}

export default meta

type Story = StoryObj<typeof RewardsDepositedTable>

const props: RewardsDepositedTableProps = {
  playerReach: 120,
  network: 'Mainnet',
  tokenContractAddress: '0x912312312312321312312312312312',
  rewardType: 'erc20',
  tokenName: 'USDC',
  amountPerPlayer: 1,
  totalClaimables: 100,
  marketplaceUrl: 'https://opensea.io/asdfasdfasdf?query=valueeeeee'
}

export const Default: Story = {
  args: { ...props }
}
