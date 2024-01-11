import type { Meta, StoryObj } from '@storybook/react'

import Sticker, { StickerProps } from '.'

const meta: Meta<typeof Sticker> = {
  title: 'Sticker',
  component: Sticker
}

export default meta

type Story = StoryObj<typeof Sticker>

const props: StickerProps = {
  styleType: 'secondary',
  children: 'Sticker',
  className: 'menu'
}

export const Default: Story = {
  args: { ...props }
}
