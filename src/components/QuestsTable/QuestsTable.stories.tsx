import type { Meta, StoryObj } from '@storybook/react'

import { QuestsTable, QuestsTableProps } from '.'

const meta: Meta<typeof QuestsTable> = {
  title: 'Quests/QuestsTable',
  component: QuestsTable
}

export default meta

type Story = StoryObj<typeof QuestsTable>

const props: QuestsTableProps = {
  quests: [
    {
      name: 'A quest',
      rewards: [
        {
          amountPerPlayer: 100,
          symbol: 'USDC',
          balance: 10000
        },
        {
          amountPerPlayer: 200,
          symbol: 'GOLD',
          balance: 100000
        },
        {
          amountPerPlayer: 312,
          symbol: 'KITS',
          balance: 124000
        },
        {
          amountPerPlayer: 0.01,
          symbol: 'WETH',
          balance: 10
        }
      ],
      numGames: 10,
      status: 'DRAFT',
      onClick: () => console.log('a quest clicked'),
      claims: 100
    },
    {
      name: 'Another quest',
      rewards: [
        {
          amountPerPlayer: 200,
          symbol: 'GOLD',
          balance: 100000
        }
      ],
      numGames: 2,
      status: 'ACTIVE',
      onClick: () => console.log('Another quest clicked'),
      claims: 300
    }
  ]
}

export const Default: Story = {
  args: { ...props }
}