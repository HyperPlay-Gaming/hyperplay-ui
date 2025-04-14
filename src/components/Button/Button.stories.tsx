import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { DiscordFilled } from '@/assets/images'
import Button from '.'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'brand',
        'primary',
        'secondary',
        'tertiary',
        'primary-neutral',
        'secondary-neutral',
        'tertiary-neutral',
        'danger',
        'danger-secondary',
        'danger-tertiary',
        'link',
        'menuItem',
        'alert',
        'secondaryGradient'
      ]
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small']
    },
    children: {
      control: 'text'
    },
    leftIcon: {
      control: 'object'
    },
    rightIcon: {
      control: 'object'
    },
    disabled: {
      control: 'boolean'
    },
    focusVisible: {
      control: 'boolean'
    }
  }
}

export default meta

type Story = StoryObj<typeof Button>

// Large Buttons
export const Large: Story = {
  args: {
    type: 'primary',
    size: 'large',
    children: 'Large Button'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const initialStyle = getComputedStyle(button)
    const initialBgColor = initialStyle.backgroundColor

    await userEvent.hover(button, { delay: 1000 })
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const hoverStyle = getComputedStyle(button)
    const hoverBgColor = hoverStyle.backgroundColor
    await expect(hoverBgColor).toBe(initialBgColor)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    await userEvent.unhover(button, { delay: 1000 })
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const finalStyle = getComputedStyle(button)
    const finalBgColor = finalStyle.backgroundColor
    await expect(finalBgColor).toBe(initialBgColor)
  }
}

// Medium Buttons
export const Medium: Story = {
  args: {
    type: 'primary',
    size: 'medium',
    children: 'Medium Button'
  }
}

// Small Buttons
export const Small: Story = {
  args: {
    type: 'primary',
    size: 'small',
    children: 'Small Button'
  }
}

// Icon Button
export const Icon: Story = {
  args: {
    type: 'secondary',
    size: 'icon',
    children: <DiscordFilled fill="white" />
  }
}
