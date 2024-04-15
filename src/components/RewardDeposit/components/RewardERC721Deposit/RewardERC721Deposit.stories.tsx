import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { RewardERC721Deposit } from './index'

type Story = StoryObj<typeof RewardERC721Deposit>

const meta: Meta<typeof RewardERC721Deposit> = {
  title: 'Quests/RewardDeposit/RewardERC721Deposit',
  component: RewardERC721Deposit,
  args: {
    onAddTokenTap: fn(),
    onClearTokenIds: fn()
  }
}

export default meta

export const Default: Story = {
  play: async ({ step }) => {
    await step('Expect From Input to have value', async ({ canvasElement }) => {
      const canvas = within(canvasElement)
      const fromInput = canvas.getByRole('textbox', {
        name: /from/i
      })
      await userEvent.type(fromInput, '1')
      await expect(fromInput).toHaveValue('1')
    })

    await step('Expect From Input to have value', async ({ canvasElement }) => {
      const canvas = within(canvasElement)
      const toInput = canvas.getByRole('textbox', {
        name: 'To'
      })
      await userEvent.type(toInput, '10')
      await expect(toInput).toHaveValue('10')
    })

    await step(
      'Expect Token Id Input to have value',
      async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const tokenIdInput = canvas.getByRole('textbox', {
          name: /token id/i
        })
        await userEvent.type(tokenIdInput, '100')
        await expect(tokenIdInput).toHaveValue('100')
      }
    )

    await step(
      'Add token button triggers onAddTokenTap callback',
      async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const button = canvas.getByRole('button', {
          name: /add token ids/i
        })
        await userEvent.click(button)
        await expect(args.onAddTokenTap).toHaveBeenCalledOnce()
      }
    )

    await step(
      'Manually hitting enter triggers onManualTokenAdd callback',
      async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const tokenIdInput = canvas.getByRole('textbox', {
          name: /token id/i
        })
        await userEvent.type(tokenIdInput, '{enter}')
        await expect(args.onManualTokenAdd).toHaveBeenCalledOnce()
      }
    )
  }
}

export const WithTokenIdsList: Story = {
  args: {
    tokenIdsList: [
      {
        tokenId: 1,
        onRemoveTap: fn()
      },
      {
        tokenId: 2,
        onRemoveTap: fn()
      },
      {
        tokenId: 3,
        onRemoveTap: fn()
      }
    ]
  },
  play: async ({ step, args }) => {
    const tokenFrom = args.tokenIdsList?.[0].tokenId ?? 1
    const tokenTo = args.tokenIdsList?.[2].tokenId ?? 3

    await step(
      'Expect Token Ids to be collapsible',
      async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const collapseButton = canvas.getByRole('button', {
          name: /collapse all ids/i
        })
        await userEvent.click(collapseButton)
      }
    )

    await step('Token IDs are visible', async ({ canvasElement }) => {
      const canvas = within(canvasElement)
      for (let i = tokenFrom; i <= tokenTo; i++) {
        await expect(canvas.getByText(i.toString())).toBeVisible()
      }
    })

    await step('Can delete token ID', async ({ canvasElement }) => {
      const canvas = within(canvasElement)
      const removeLastTokenButton = canvas.getByRole('button', {
        name: `Remove token ID ${tokenTo}`
      })
      await userEvent.click(removeLastTokenButton)
      await expect(args.tokenIdsList?.[2].onRemoveTap).toHaveBeenCalledOnce()
    })

    await step('Can clear all token IDs', async ({ canvasElement }) => {
      const canvas = within(canvasElement)
      const clearButton = canvas.getByRole('button', {
        name: /clear/i
      })
      await userEvent.click(clearButton)
      await expect(args.onClearTokenIds).toHaveBeenCalledOnce()
    })
  }
}
