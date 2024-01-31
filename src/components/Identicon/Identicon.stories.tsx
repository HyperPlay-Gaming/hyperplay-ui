import type { Meta, StoryObj } from '@storybook/react'

import Identicon, { IdenticonProps } from '.'

const meta: Meta<typeof Identicon> = {
  title: 'DevPortal/Identicon',
  component: Identicon
}

export default meta

type Story = StoryObj<typeof Identicon>

const props: IdenticonProps = {
  value: '0x89206150520322c1CDDe03Fcb94542eDfA78fC9b'
}

export const Default: Story = {
  args: { ...props }
}
