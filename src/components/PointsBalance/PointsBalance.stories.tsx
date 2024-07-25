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
