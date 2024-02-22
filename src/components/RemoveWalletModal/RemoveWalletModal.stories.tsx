import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import RemoveWalletModal from './index'

const meta: Meta<typeof RemoveWalletModal> = {
  title: 'RemoveWalletModal',
  component: RemoveWalletModal,
  args: {
    isOpen: true,
    onConfirmed: fn()
  }
}

export default meta

type Story = StoryObj<typeof RemoveWalletModal>

export const Default: Story = {
  args: {
    onConfirmed: () => alert('Wallet confirmed for removal')
  }
}

export const Valid: Story = {
  play: async ({ canvasElement, args }) => {
    const onConfirmed = args.onConfirmed
    const canvas = within(canvasElement)
    const confirmInput = canvas.getByLabelText('Type REMOVE to confirm')
    await userEvent.type(confirmInput, 'REMOVE')
    await userEvent.click(canvas.getByRole('button', { name: /remove/i }))
    await expect(onConfirmed).toHaveBeenCalledOnce()
  }
}

export const Invalid: Story = {
  play: async ({ canvasElement, args }) => {
    const onConfirmed = args.onConfirmed
    const canvas = within(canvasElement)
    const confirmInput = canvas.getByLabelText('Type REMOVE to confirm')
    await userEvent.type(confirmInput, 'WRONG')
    await userEvent.click(canvas.getByRole('button', { name: /remove/i }))
    await expect(onConfirmed).not.toHaveBeenCalled()
  }
}
