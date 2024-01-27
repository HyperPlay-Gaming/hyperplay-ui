import type { Meta, StoryObj } from '@storybook/react'

import Card, { CardProps } from '.'

const meta: Meta<typeof Card> = {
  title: 'DevPortal/Card',
  component: Card
}

export default meta

type Story = StoryObj<typeof Card>

const props: CardProps = {
  children: <h1>Hello</h1>
}

export const Default: Story = {
  args: { ...props }
}
