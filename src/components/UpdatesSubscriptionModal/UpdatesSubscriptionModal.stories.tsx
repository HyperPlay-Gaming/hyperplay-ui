import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import UpdatesSubscriptionModal, { defaultI18n } from './index'

const args = {
  onSubmit: fn(),
  onCancel: fn(),
  onClose: fn(),
  i18n: defaultI18n
}

const meta: Meta<typeof UpdatesSubscriptionModal> = {
  title: 'UpdatesSubscriptionModal',
  component: UpdatesSubscriptionModal,
  args
}

export default meta

type Story = StoryObj<typeof UpdatesSubscriptionModal>

export const Default: Story = {
  args: {
    onSubmit: () => {
      alert('Thank you for subscribing')
    },
    onCancel: () => {
      alert('Cancelled')
    },
    onClose: () => {
      alert('Closed')
    }
  }
}

export const Valid: Story = {
  play: async ({ canvasElement, args }) => {
    const onSubmit = args.onSubmit
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText(defaultI18n.inputPlaceholder)
    await userEvent.type(emailInput, 'red.pace.dev@gmail.com')
    await userEvent.click(
      canvas.getByRole('button', {
        name: new RegExp(defaultI18n.submitButtonLabel, 'i')
      })
    )
    await expect(onSubmit).toHaveBeenCalledOnce()
  }
}

export const Invalid: Story = {
  play: async ({ canvasElement, args }) => {
    const onSubmit = args.onSubmit
    const onCancel = args.onCancel
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText(defaultI18n.inputPlaceholder)
    await userEvent.type(emailInput, 'red.pace.dev')
    await userEvent.click(
      canvas.getByRole('button', {
        name: new RegExp(defaultI18n.submitButtonLabel, 'i')
      })
    )
    await expect(onSubmit).not.toHaveBeenCalled()
    await expect(onCancel).not.toHaveBeenCalled()
  }
}

export const Cancel: Story = {
  play: async ({ canvasElement, args }) => {
    const onCancel = args.onCancel
    const canvas = within(canvasElement)
    const emailInput = canvas.getByPlaceholderText(defaultI18n.inputPlaceholder)
    await userEvent.type(emailInput, 'red.pace.dev@gmail.com')
    await userEvent.click(
      canvas.getByRole('button', {
        name: new RegExp(defaultI18n.cancelButtonLabel, 'i')
      })
    )
    await expect(onCancel).toHaveBeenCalledOnce()
  }
}

export const Loading: Story = {
  args: {
    ...args,
    loading: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByLabelText('Loading')).toBeInTheDocument()
  }
}

export const Error: Story = {
  args: {
    ...args,
    error: 'Invalid Email'
  },
  play: async ({ canvasElement, args }) => {
    const error = args.error || ''
    const canvas = within(canvasElement)
    const errorText = canvas.queryByText(error)
    await expect(errorText).toBeVisible()
  }
}
