import { Meta, StoryObj } from '@storybook/react'

import RewardImage from '@/components/RewardImage/index'

const meta: Meta<typeof RewardImage> = {
  title: 'Components/RewardImage',
  component: RewardImage
}

export default meta

type Story = StoryObj<typeof RewardImage>

export const Default: Story = {
  args: {}
}

export const Error: Story = {
  args: {
    error: 'Required'
  }
}

export const WithImage: Story = {
  args: {
    url: 'https://i.seadn.io/s/raw/files/35e542c8de9e64d7456eeedb43e02c22.png?auto=format&dpr=1&w=1000'
  }
}
