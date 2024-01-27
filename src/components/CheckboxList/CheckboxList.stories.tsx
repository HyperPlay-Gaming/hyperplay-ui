import type { Meta, StoryObj } from '@storybook/react'

import CheckboxList, { CheckboxListProps } from '.'

const meta: Meta<typeof CheckboxList> = {
  title: 'DevPortal/CheckboxList',
  component: CheckboxList
}

export default meta

type Story = StoryObj<typeof CheckboxList>

const props: CheckboxListProps = {
  items: [
    { label: 'Connect Wallet', checked: true },
    { label: 'Create Account', checked: true },
    { label: 'Create Project (Optional)', checked: false }
  ]
}

export const Default: Story = {
  args: { ...props }
}
