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
        }
      ],
      numGames: 10,
      status: 'DRAFT'
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
      status: 'ACTIVE'
    }
  ]
}

export const Default: Story = {
  args: { ...props }
}
