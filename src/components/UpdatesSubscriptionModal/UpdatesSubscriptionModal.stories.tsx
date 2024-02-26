import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import UpdatesSubscriptionModal, { defaultI18n } from './index'

const meta: Meta<typeof UpdatesSubscriptionModal> = {
  title: 'UpdatesSubscriptionModal',
  component: UpdatesSubscriptionModal,
  args: {
    isOpen: true,
    onSubmitClick: fn(),
    onCancelClick: fn(),
    i18n: defaultI18n
  }
}

export default meta

type Story = StoryObj<typeof UpdatesSubscriptionModal>

export const Default: Story = {
  args: {
    onSubmitClick: () => {
      alert('Thank you for subscribing')
    },
    onCancelClick: () => {
      alert('Cancelled')
    }
  }
}

export const Valid: Story = {
  play: async ({ canvasElement, args }) => {
    const onSubmitClick = args.onSubmitClick
    const canvas = within(canvasElement)
    const emailInput = canvas.getByLabelText('Email')
    await userEvent.type(emailInput, 'red.pace.dev@gmail.com')
    await userEvent.click(
      canvas.getByRole('button', {
        name: new RegExp(defaultI18n.submitButtonLabel, 'i')
      })
    )
    await expect(onSubmitClick).toHaveBeenCalledOnce()
  }
}

export const Invalid: Story = {
  play: async ({ canvasElement, args }) => {
    const onSubmitClick = args.onSubmitClick
    const onCancelClick = args.onCancelClick
    const canvas = within(canvasElement)
    const emailInput = canvas.getByLabelText('Email')
    await userEvent.type(emailInput, 'red.pace.dev')
    await userEvent.click(
      canvas.getByRole('button', {
        name: new RegExp(defaultI18n.submitButtonLabel, 'i')
      })
    )
    await expect(onSubmitClick).not.toHaveBeenCalled()
    await expect(onCancelClick).not.toHaveBeenCalled()
  }
}

export const Cancel: Story = {
  play: async ({ canvasElement, args }) => {
    const onCancelClick = args.onCancelClick
    const canvas = within(canvasElement)
    const emailInput = canvas.getByLabelText('Email')
    await userEvent.type(emailInput, 'red.pace.dev@gmail.com')
    await userEvent.click(
      canvas.getByRole('button', {
        name: new RegExp(defaultI18n.cancelButtonLabel, 'i')
      })
    )
    await expect(onCancelClick).toHaveBeenCalledOnce()
  }
}
