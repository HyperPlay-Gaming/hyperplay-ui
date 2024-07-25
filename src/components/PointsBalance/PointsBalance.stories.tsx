import type { Meta, StoryObj } from '@storybook/react'

import { PointsBalance, PointsBalanceProps } from '.'

const meta: Meta<typeof PointsBalance> = {
  title: 'Quests/PointsBalance',
  component: PointsBalance
}

export default meta

type Story = StoryObj<typeof PointsBalance>

const props: PointsBalanceProps = {
  balance: '100',
  name: 'Experience Points',
  symbol: 'XP',
  style: { maxWidth: '309px' }
}

export const Default: Story = {
  args: { ...props }
}

export const IsGame7: Story = {
  args: { ...props, isGame7Credits: true }
}

export const LargeBalanceLongName: Story = {
  args: {
    ...props,
    symbol: 'XPXPXP',
    balance: '1000000000.01',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
}
