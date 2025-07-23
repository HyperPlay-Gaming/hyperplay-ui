import type { Meta, StoryObj } from '@storybook/react'

import { AlertTriangle, DotIcon } from '@/assets/images'

import Sticker from '.'

const meta: Meta<typeof Sticker> = {
  title: 'Sticker',
  component: Sticker,
  parameters: {
    layout: 'centered'
  }
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

//Text Truncation
export const LongText: Story = {
  args: {
    styleType: 'secondary',
    dimension: 'default',
    variant: 'outlined',
    children:
      'A very long text that should be applied ellipsis when it exceeds the maximum width of 180px'
  }
}

export const LongTextWithIcon: Story = {
  args: {
    styleType: 'secondary',
    withIcon: <AlertTriangle />,
    dimension: 'default',
    variant: 'filled',
    children:
      'A very long text with icon that should also be truncated appropriately'
  }
}

export const LongTextWithDot: Story = {
  args: {
    styleType: 'secondary',
    withDot: {
      dotColor: 'success',
      dotIcon: DotIcon
    },
    dimension: 'default',
    variant: 'filledStrong',
    children:
      'An example of a very long text with dot that demonstrates the truncation behavior'
  }
}

export const WithTooltip: Story = {
  args: {
    styleType: 'secondary',
    dimension: 'default',
    variant: 'outlined',
    children: 'A very long text to test the tooltip',
    showTooltip: true
  }
}
