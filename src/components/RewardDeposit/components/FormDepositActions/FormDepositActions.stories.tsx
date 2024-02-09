import type { Meta, StoryObj } from '@storybook/react'

import { FormDepositActions, FormDepositActionsProps } from '.'

type Story = StoryObj<typeof FormDepositActions>

const meta: Meta<typeof FormDepositActions> = {
  title: 'Quests/RewardDeposit/FormDepositActions',
  component: FormDepositActions
}

export default meta

const props: FormDepositActionsProps = {
  onFormSubmit: () => console.log('submit'),
  isDisabledButton: false,
  depositingAmount: '100 USDC'
}

export const Default: Story = {
  args: { ...props }
}

export const Disabled: Story = {
  args: { ...props, isDisabledButton: true }
}

export const WithoutDepositAmount: Story = {
  args: { ...props, depositingAmount: null }
}
