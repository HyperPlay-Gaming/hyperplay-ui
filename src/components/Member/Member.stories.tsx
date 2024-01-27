import type { Meta, StoryObj } from '@storybook/react'

import { Member, MemberProps } from '.'

const meta: Meta<typeof Member> = {
  title: 'DevPortal/Member',
  component: Member
}

export default meta

type Story = StoryObj<typeof Member>

const props: MemberProps = {
  label: 'Studio Admin',
  member: '0x12313213123123123131231321312312312313',
  truncate: false
}

export const Default: Story = {
  args: { ...props }
}

export const Truncate: Story = {
  args: { ...props, truncate: true }
}
