/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  AlertOctagon,
  WarningIcon,
  CheckmarkCircleOutline,
  InfoIcon,
  Triangule,
  LightningOutlined
} from '@/assets/images'
import AlertCard from '.'

const meta: Meta<typeof AlertCard> = {
  title: 'AlertCard',
  component: AlertCard,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    tone: {
      control: 'select',
      options: [
        'error',
        'warning',
        'success',
        'information',
        'neutral',
        'brand'
      ]
    },
    size: {
      control: 'select',
      options: ['large', 'small']
    },
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical']
    },
    showClose: {
      control: 'boolean'
    },
    noBorderLeft: {
      control: 'boolean'
    },
    showIcon: {
      control: 'boolean'
    },
    iconContainer: {
      control: 'boolean'
    }
  }
}

export default meta

type Story = StoryObj<typeof AlertCard>

const defaultProps = {
  title: 'Heading',
  message:
    'Lorem ipsum dolor sit amet, con sec tetur adipiscing elit dolor sit. Lorem ipsum dolor sit amet elit.',
  onClose: () => {}
}

export const Error: Story = {
  args: {
    ...defaultProps,
    tone: 'error',
    size: 'large',
    showClose: true,
    noBorderLeft: false,
    layout: 'horizontal',
    icon: <AlertOctagon />
  }
}

export const Warning: Story = {
  args: {
    ...defaultProps,
    tone: 'warning',
    size: 'large',
    showClose: true,
    noBorderLeft: false,
    layout: 'horizontal',
    icon: <WarningIcon />
  }
}

export const Success: Story = {
  args: {
    ...defaultProps,
    tone: 'success',
    size: 'large',
    showClose: true,
    noBorderLeft: false,
    layout: 'horizontal',
    icon: <CheckmarkCircleOutline />
  }
}

export const Information: Story = {
  args: {
    ...defaultProps,
    tone: 'information',
    size: 'large',
    showClose: true,
    noBorderLeft: false,
    layout: 'horizontal',
    icon: <InfoIcon />
  }
}

export const Neutral: Story = {
  args: {
    ...defaultProps,
    tone: 'neutral',
    size: 'large',
    showClose: true,
    noBorderLeft: false,
    layout: 'horizontal',
    icon: <Triangule />
  }
}

export const Brand: Story = {
  args: {
    ...defaultProps,
    tone: 'brand',
    size: 'large',
    showClose: true,
    noBorderLeft: false,
    layout: 'horizontal',
    icon: <LightningOutlined />
  }
}

export const WithList: Story = {
  args: {
    ...defaultProps,
    tone: 'neutral',
    listItems: [
      'Check if the game is properly installed',
      'Verify your internet connection',
      'Make sure your system meets the minimum requirements'
    ],
    showClose: true,
    noBorderLeft: false,
    layout: 'horizontal',
    icon: <InfoIcon />
  }
}

export const WithLink: Story = {
  args: {
    ...defaultProps,
    tone: 'neutral',
    link: {
      text: 'Learn More',
      onClick: () => console.log('Link clicked')
    },
    showClose: true,
    noBorderLeft: false,
    layout: 'horizontal',
    icon: <InfoIcon />
  }
}

export const WithButtons: Story = {
  args: {
    ...defaultProps,
    tone: 'neutral',
    buttons: {
      primary: {
        text: 'Primary',
        onClick: () => console.log('Primary clicked')
      },
      secondary: {
        text: 'Secondary',
        onClick: () => console.log('Secondary clicked')
      },
      tertiary: {
        text: 'Tertiary',
        onClick: () => console.log('Tertiary clicked')
      }
    },
    showClose: true,
    noBorderLeft: false,
    layout: 'horizontal',
    icon: <InfoIcon />
  }
}

// Old stories (keeping for compatibility)

export const WarningAlertCard = () => (
  <AlertCard
    title="How to report a problem?"
    message="Join our discord and look for the channel that matches your operation system. Share the content of the logs displayed here, and include a clear description of the problem with any relevant information and details."
    tone="warning"
    buttons={{
      tertiary: {
        text: 'Button CTA',
        onClick: () => {}
      }
    }}
    onClose={() => {}}
    icon={<InfoIcon />}
  />
)

export const ErrorAlertCard = () => (
  <AlertCard
    title="How to report a problem?"
    message="Join our discord and look for the channel that matches your operation system. Share the content of the logs displayed here, and include a clear description of the problem with any relevant information and details."
    onClose={() => {}}
    tone="error"
    icon={<InfoIcon />}
  />
)
