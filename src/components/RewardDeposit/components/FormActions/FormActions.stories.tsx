import type { Meta, StoryObj } from '@storybook/react'

import { FormActions, FormActionsProps } from '.'

type Story = StoryObj<typeof FormActions>

const meta: Meta<typeof FormActions> = {
  title: 'Quests/RewardDeposit/FormActions',
  component: FormActions
}

export default meta

const props: FormActionsProps = {
  onFormSubmit: () => console.log('submit'),
  isDisabledButton: false,
  depositAmount: '100 USDC'
}

export const Default: Story = {
  args: { ...props }
}

export const Disabled: Story = {
  args: { ...props, isDisabledButton: true },
}

export const WithoutDepositAmount: Story = {
  args: { ...props, depositAmount: null },
}
