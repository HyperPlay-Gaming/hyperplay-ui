import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { TokenIdRow } from './index'

type Story = StoryObj<typeof TokenIdRow>

const meta: Meta<typeof TokenIdRow> = {
  title: 'Quests/RewardDeposit/RewardERC721Deposit/TokenIdRow',
  component: TokenIdRow,
  args: {
    tokenId: 1,
    status: 'DRAFT'
  }
}

export default meta

export const Draft: Story = {
  args: {
    status: 'DRAFT',
    onRemoveTap: fn()
  },
  play: async ({ step, args }) => {
    await step(
      'Expect error message to be displayed',
      async ({ canvasElement }) => {
        if (args.status !== 'DRAFT') return
        const canvas = within(canvasElement)
        await userEvent.click(
          canvas.getByRole('button', { name: /remove token/i })
        )
        await expect(args.onRemoveTap).toHaveBeenCalledTimes(1)
      }
    )
  }
}

export const DraftWithError: Story = {
  args: {
    status: 'DRAFT',
    error: 'Token ID already exists',
    onRemoveTap: fn()
  }
}

export const Pending: Story = {
  args: {
    status: 'PENDING',
    url: 'https://example.com'
  }
}

export const Confirmed: Story = {
  args: {
    status: 'CONFIRMED',
    url: 'https://example.com'
  }
}

export const Error: Story = {
  args: {
    status: 'ERROR',
    error: 'RPC-Internal Error',
    onTryAgainTap: fn()
  },
  play: async ({ step, args }) => {
    await step(
      'Expect error message to be displayed',
      async ({ canvasElement }) => {
        if (args.status !== 'ERROR') return
        const canvas = within(canvasElement)
        await userEvent.click(
          canvas.getByRole('button', { name: /try again/i })
        )
        await expect(args.onTryAgainTap).toHaveBeenCalledTimes(1)
      }
    )
  }
}
