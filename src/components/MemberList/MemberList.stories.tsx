import type { Meta, StoryObj } from '@storybook/react'

import { MemberList, MemberListProps } from '.'

const meta: Meta<typeof MemberList> = {
  title: 'DevPortal/MemberList',
  component: MemberList
}

export default meta

type Story = StoryObj<typeof MemberList>

const props: MemberListProps = {
  members: [
    { member: '0x123123123123', label: 'Studio Admin', truncate: false },
    { member: '0x5645645645645', label: 'Studio Admin', truncate: false },
    { member: '0x6786786787867876876', label: 'Studio Admin', truncate: true }
  ],
  onRemove: (member: string) => console.log('remove ', member),
  editable: false
}

export const Default: Story = {
  args: { ...props }
}

export const Editable: Story = {
  args: { ...props, editable: true }
}
