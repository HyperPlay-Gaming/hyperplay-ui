import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'

import { FormDepositActions, FormDepositActionsProps, defaultI18n } from '.'

type Story = StoryObj<typeof FormDepositActions>

const meta: Meta<typeof FormDepositActions> = {
  title: 'Quests/RewardDeposit/FormDepositActions',
  component: FormDepositActions
}

export default meta

const props: FormDepositActionsProps = {
  onFormSubmit: fn(),
  isDisabledButton: false,
  depositingAmount: '100 USDC',
  i18n: defaultI18n
}

export const Default: Story = {
  args: { ...props },
  play: async ({ canvasElement, step }) => {
    await step('Form submit should not be called', async ({ args }) => {
      const canvas = within(canvasElement)
      const button = canvas.getByRole('button', { name: defaultI18n.submitBtn })
      await expect(button).not.toBeDisabled()

      await userEvent.click(button)
      await expect(args.onFormSubmit).toHaveBeenCalled()
    })

    await step(
      'Should contain label of total depositing amount',
      async ({ args }) => {
        const canvas = within(canvasElement)
        const text = canvas.getByText(
          `${defaultI18n.totalDeposit} ${args.depositingAmount}`
        )

        expect(text).toBeVisible()
      }
    )
  }
}

export const Disabled: Story = {
  args: { ...props, isDisabledButton: true },
  play: async ({ canvasElement, step }) => {
    await step('Form submit should not be called', async ({ args }) => {
      const canvas = within(canvasElement)
      const button = canvas.getByRole('button', { name: defaultI18n.submitBtn })
      await expect(button).toBeDisabled()

      await userEvent.click(button)
      await expect(args.onFormSubmit).not.toHaveBeenCalled()
    })

    await step(
      'Should contain label of total depositing amount',
      async ({ args }) => {
        const canvas = within(canvasElement)
        const text = canvas.getByText(
          `${defaultI18n.totalDeposit} ${args.depositingAmount}`
        )

        expect(text).toBeVisible()
      }
    )
  }
}

export const WithoutDepositAmount: Story = {
  args: { ...props, depositingAmount: null },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const text = canvas.queryByText(
      `${defaultI18n.totalDeposit} ${args.depositingAmount}`
    )

    expect(text).toBeNull()
  }
}
