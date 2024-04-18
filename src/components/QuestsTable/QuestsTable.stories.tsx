import type { Meta, StoryObj } from '@storybook/react'

import { QuestsTable, QuestsTableProps } from '.'

const meta: Meta<typeof QuestsTable> = {
  title: 'Quests/QuestsTable',
  component: QuestsTable,
  argTypes: {
    filter: {
      control: {
        type: 'select',
        options: ['ACTIVE', 'INACTIVE', null]
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof QuestsTable>

const props: QuestsTableProps = {
  filter: null,
  onFilterChange: (filter) => alert(`filter changed: ${filter}`),
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
      type: 'Reputation',
      status: 'DRAFT',
      onClick: () => console.log('a quest clicked'),
      claims: 100,
      /* eslint-disable-next-line */
      linkComponent: (props: any) => <a {...props} />,
      linkProps: { href: 'https://hyperplay.xyz' }
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
      type: 'Reputation',
      status: 'ACTIVE',
      onClick: () => console.log('Another quest clicked'),
      claims: 300
    }
  ]
}

export const Default: Story = {
  args: { ...props }
}

export const EmptyQuests: Story = {
  args: {
    ...props,
    quests: [
      {
        name: 'A quest',
        rewards: [
          {
            amountPerPlayer: '-',
            symbol: '',
            balance: '-'
          }
        ],
        type: 'Reputation',
        status: 'DRAFT',
        onClick: () => console.log('a quest clicked'),
        claims: '-',
        /* eslint-disable-next-line */
        linkComponent: (props: any) => <a {...props} />,
        linkProps: { href: 'https://hyperplay.xyz' }
      }
    ]
  }
}
