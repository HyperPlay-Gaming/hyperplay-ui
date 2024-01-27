import { Meta, StoryObj } from '@storybook/react'

import Item from './index'

const meta: Meta<typeof Item> = {
  title: 'DevPortal/Item',
  component: Item
}

export default meta

type Story = StoryObj<typeof Item>

const props = {
  name: 'acme-co',
  large: false
}

export const Default: Story = {
  args: { ...props }
}

export const Large: Story = {
  args: { ...props, large: true }
}
