import type { Meta, StoryObj } from '@storybook/react'

import Activity, { ActivityProps } from '.'

const meta: Meta<typeof Activity> = {
  title: 'DevPortal/IdentActivityicon',
  component: Activity
}

export default meta

type Story = StoryObj<typeof Activity>

const props: ActivityProps = {
  sender: '0x89206150520322c1CDDe03Fcb94542eDfA78fC9b',
  href: '',
  children: 'Created release v0.0.6-test'
}

export const Default: Story = {
  args: { ...props }
}
