import type { Meta, StoryObj } from '@storybook/react'

import SocialLinks from './SocialLinks'

const meta = {
  title: 'Components/SocialLinks',
  component: SocialLinks,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof SocialLinks>

export default meta
type Story = StoryObj<typeof SocialLinks>

export const Default: Story = {
  args: {
    socialLinks: [
      {
        type: 'website',
        url: 'https://example.com'
      },
      {
        type: 'twitter',
        url: 'https://twitter.com'
      },
      {
        type: 'discord',
        url: 'https://discord.com'
      },
      {
        type: 'youtube',
        url: 'https://youtube.com'
      }
    ]
  }
}
