import type { Meta, StoryObj } from '@storybook/react'
import { IconCoin } from '@tabler/icons-react'

import Button, { ButtonProps } from '.'

const meta: Meta<typeof Button> = {
  title: 'DevPortal/Fab/Button',
  component: Button
}

export default meta

type Story = StoryObj<typeof Button>

const props: ButtonProps = {
  label: 'Pricing',
  children: <IconCoin size={32} />
}

export const Default: Story = {
  args: { ...props }
}
