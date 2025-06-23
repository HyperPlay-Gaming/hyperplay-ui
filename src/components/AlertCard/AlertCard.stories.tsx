/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  AlertOctagon,
  WarningIcon,
  CheckmarkCircleOutline,
  InfoIcon,
  Triangle,
  LightningOutlined
} from '@/assets/images'
import AlertCard from '.'

const meta = {
  title: 'AlertCard',
  component: AlertCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
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
} satisfies Meta<typeof AlertCard>

export default meta
type Story = StoryObj<typeof AlertCard>

export const Primary: Story = {
  args: {
    title: 'Heading',
    message:
      'Lorem ipsum dolor sit amet, con sec tetur adipiscing elit dolor sit. Lorem ipsum dolor sit amet elit.',
    variant: 'neutral',
    size: 'large',
    showClose: true,
    noBorderLeft: false,
    layout: 'horizontal',
    icon: <InfoIcon />,
    onClose: () => {}
  }
}

export const Error: Story = {
  args: {
    ...Primary.args,
    variant: 'error',
    icon: <AlertOctagon />
  }
}

export const Warning: Story = {
  args: {
    ...Primary.args,
    variant: 'warning',
    icon: <WarningIcon />
  }
}

export const Success: Story = {
  args: {
    ...Primary.args,
    variant: 'success',
    icon: <CheckmarkCircleOutline />
  }
}

export const Information: Story = {
  args: {
    ...Primary.args,
    variant: 'information',
    icon: <InfoIcon />
  }
}

export const Neutral: Story = {
  args: {
    ...Primary.args,
    variant: 'neutral',
    icon: <Triangle />
  }
}

export const Brand: Story = {
  args: {
    ...Primary.args,
    variant: 'brand',
    icon: <LightningOutlined />
  }
}

export const WithList: Story = {
  args: {
    ...Primary.args,
    listItems: [
      'Check if the game is properly installed',
      'Verify your internet connection',
      'Make sure your system meets the minimum requirements'
    ],
    icon: <LightningOutlined />
  }
}

export const WithLink: Story = {
  args: {
    ...Primary.args,
    link: {
      text: 'Learn more',
      onClick: () => console.log('Link clicked')
    },
    icon: <LightningOutlined />
  }
}

export const WithButtons: Story = {
  args: {
    ...Primary.args,
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
    icon: <LightningOutlined />
  }
}

export const SizeSmall: Story = {
  args: {
    ...Primary.args,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus metus vitae tempus viverra. Maecenas aliquam urna eu ante fringilla accumsan. Nunc condimentum mauris nec suscipit cursus. Vivamus nibh sapien, efficitur non convallis et, rhoncus at tortor. Fusce gravida fermentum mauris et dictum. Ut odio dui, viverra ut imperdiet euismod, imperdiet non orci. Etiam maximus congue ante. Morbi elementum, odio non congue malesuada, lectus nulla pharetra ex, eget varius leo lorem non justo.',
    variant: 'neutral',
    size: 'small',
    icon: <LightningOutlined />
  }
}

export const SizeLarge: Story = {
  args: {
    ...Primary.args,
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus metus vitae tempus viverra. Maecenas aliquam urna eu ante fringilla accumsan. Nunc condimentum mauris nec suscipit cursus. Vivamus nibh sapien, efficitur non convallis et, rhoncus at tortor. Fusce gravida fermentum mauris et dictum. Ut odio dui, viverra ut imperdiet euismod, imperdiet non orci. Etiam maximus congue ante. Morbi elementum, odio non congue malesuada, lectus nulla pharetra ex, eget varius leo lorem non justo.',
    variant: 'neutral',
    size: 'large',
    icon: <LightningOutlined />
  }
}
