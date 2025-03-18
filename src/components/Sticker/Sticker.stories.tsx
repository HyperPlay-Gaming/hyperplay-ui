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
    children: 'Sticker'
  }
}

export const DefaultWithIcon: Story = {
  args: {
    styleType: 'secondary',
    styleCategory: {
      variant: 'withIcon',
      icon: <AlertTriangle data-icon="alert-triangle" />
    },
    dimension: 'default',
    variant: 'outlined',
    children: 'Sticker'
  }
}

export const DefaultWithDot: Story = {
  args: {
    styleType: 'secondary',
    styleCategory: {
      variant: 'withDot',
      dotColor: 'success',
      dotIcon: <DotIcon />
    },
    dimension: 'default',
    variant: 'outlined',
    children: 'Sticker'
  }
}

//Small Sizes
export const Small: Story = {
  args: {
    styleType: 'secondary',
    dimension: 'small',
    variant: 'outlined',
    children: 'Sticker'
  }
}

export const SmallWithIcon: Story = {
  args: {
    styleType: 'secondary',
    styleCategory: {
      variant: 'withIcon',
      icon: <AlertTriangle data-icon="alert-triangle" />
    },
    dimension: 'small',
    variant: 'outlined',
    children: 'Sticker'
  }
}

export const SmallWithDot: Story = {
  args: {
    styleType: 'secondary',
    styleCategory: {
      variant: 'withDot',
      dotColor: 'success',
      dotIcon: <DotIcon />
    },
    dimension: 'small',
    variant: 'outlined',
    children: 'Sticker'
  }
}
