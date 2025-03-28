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
    dimension: 'default',
    variant: 'outlined',
    children: 'Label'
  }
}

export const DefaultWithIcon: Story = {
  args: {
    styleType: 'secondary',
    variant: 'outlined',
    withIcon: <AlertTriangle />,
    dimension: 'default',
    children: 'Label'
  }
}

export const DefaultWithDot: Story = {
  args: {
    styleType: 'secondary',
    withDot: {
      dotColor: 'success',
      dotIcon: DotIcon
    },
    dimension: 'default',
    variant: 'outlined',
    children: 'Label'
  }
}

//Small Sizes
export const Small: Story = {
  args: {
    styleType: 'secondary',
    dimension: 'small',
    variant: 'outlined',
    children: 'Label'
  }
}

export const SmallWithIcon: Story = {
  args: {
    styleType: 'secondary',
    withIcon: <AlertTriangle />,
    dimension: 'small',
    variant: 'outlined',
    children: 'Label'
  }
}

export const SmallWithDot: Story = {
  args: {
    styleType: 'secondary',
    withDot: {
      dotColor: 'success',
      dotIcon: DotIcon
    },
    dimension: 'small',
    variant: 'outlined',
    children: 'Label'
  }
}
