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
    active: {
      control: 'boolean'
    },
    focusVisible: {
      control: 'boolean'
    }
  }
}

export default meta

type Story = StoryObj<typeof Button>

// Brand Large Button with Hover Test
export const PrimaryLarge: Story = {
  args: {
    type: 'primary',
    size: 'large',
    children: 'Primary Button'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    // Wait before hover test
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Get initial background color
    const initialStyle = getComputedStyle(button)
    const initialBgColor = initialStyle.backgroundColor

    // Simulate hover with longer delay
    await userEvent.hover(button, { delay: 1000 })
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const hoverStyle = getComputedStyle(button)
    const hoverBgColor = hoverStyle.backgroundColor
    await expect(hoverBgColor).toBe(initialBgColor)

    // Wait before unhover test
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate unhover with longer delay
    await userEvent.unhover(button, { delay: 1000 })
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const finalStyle = getComputedStyle(button)
    const finalBgColor = finalStyle.backgroundColor
    await expect(finalBgColor).toBe(initialBgColor)
  }
}

// Large Buttons
export const Large: Story = {
  args: {
    type: 'primary',
    size: 'large',
    children: 'Large Button'
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
