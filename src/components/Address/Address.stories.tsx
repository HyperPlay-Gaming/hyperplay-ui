import type { Meta, StoryObj } from '@storybook/react'

import Address, { AddressProps } from '.'

const meta: Meta<typeof Address> = {
  title: 'DevPortal/Address',
  component: Address
}

export default meta

type Story = StoryObj<typeof Address>

const props: AddressProps = {
  address: '0x89206150520322c1CDDe03Fcb94542eDfA78fC9b',
  truncate: true
}

export const Default: Story = {
  args: { ...props }
}

export const NoTruncate: Story = {
  args: { ...props, truncate: false }
}
