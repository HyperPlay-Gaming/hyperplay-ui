import type { Meta, StoryObj } from '@storybook/react'

import { RewardsDepositedTable } from '.'

const meta: Meta<typeof RewardsDepositedTable> = {
  title: 'Quests/RewardsDepositedTable',
  component: RewardsDepositedTable,
  args: {
    playerReach: '-',
    network: 'Mainnet',
    tokenContractAddress: '0x912312312312321312312312312312'
  }
}

export default meta

type Story = StoryObj<typeof RewardsDepositedTable>

export const ERC20: Story = {
  args: {
    rewardType: 'erc20',
    tokenName: 'USDC',
    amountPerPlayer: 10
  }
}

export const ERC721: Story = {
  args: {
    rewardType: 'erc721',
    tokenName: 'AZUKI',
    marketplaceUrl: 'https://opensea.io/collection/azuki'
  }
}

export const ERC1155: Story = {
  args: {
    rewardType: 'erc1155',
    tokenName: ['GOLD', 'SILVER'].join(', '),
    marketplaceUrl: 'https://opensea.io/collection/azuki',
    extraFields: {
      'Amount Per Player (GOLD)': '1',
      'Amount Per Player (SILVER)': '2'
    }
  }
}
