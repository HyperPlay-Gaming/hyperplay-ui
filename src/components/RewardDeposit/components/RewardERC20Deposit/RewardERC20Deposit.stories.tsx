import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'

import { RewardERC20Deposit } from './index'

type Story = StoryObj<typeof RewardERC20Deposit>

const meta: Meta<typeof RewardERC20Deposit> = {
  title: 'Quests/RewardDeposit/RewardERC20Deposit',
  component: RewardERC20Deposit
}

export default meta

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const totalPlayerReachInput = canvas.getByRole('textbox', {
      name: /total player reach/i
    })
    await userEvent.type(totalPlayerReachInput, '100')
    await expect(totalPlayerReachInput).toHaveValue('100')
  }
}
