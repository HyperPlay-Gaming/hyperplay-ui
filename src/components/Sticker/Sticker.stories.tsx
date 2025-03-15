import type { Meta, StoryObj } from '@storybook/react'

import { AlertTriangle, DotIcon } from '@/assets/images'

import Sticker from '.'

const meta: Meta<typeof Sticker> = {
  title: 'Sticker',
  component: Sticker
}

export default meta

type Story = StoryObj<typeof Sticker>

//Medium Sizes
export const Default: Story = {
  args: {
    styleType: 'secondary',
    variant: 'outlined',
    children: 'Sticker',
    size: 'default'
  }
}

export const DefaultWithIcon: Story = {
  args: {
    styleType: 'secondary',
    variant: 'outlined',
    children: 'Sticker',
    size: 'default',
    withIcon: <AlertTriangle />
  }
}

export const DefaultWithDot: Story = {
  args: {
    styleType: 'secondary',
    variant: 'outlined',
    children: 'Sticker',
    size: 'default',
    withDot: <DotIcon />
  }
}

//Small Sizes
export const Small: Story = {
  args: {
    styleType: 'secondary',
    variant: 'outlined',
    children: 'Sticker',
    size: 'small'
  }
}

export const SmallWithIcon: Story = {
  args: {
    styleType: 'secondary',
    variant: 'outlined',
    children: 'Sticker',
    size: 'small',
    withIcon: <AlertTriangle />
  }
}

export const SmallWithDot: Story = {
  args: {
    styleType: 'secondary',
    variant: 'outlined',
    children: 'Sticker',
    size: 'small',
    withDot: <DotIcon />
  }
}
