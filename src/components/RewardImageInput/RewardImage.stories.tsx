import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import RewardImageInput from '@/components/RewardImageInput/index'

const meta: Meta<typeof RewardImageInput> = {
  title: 'Components/RewardImageInput',
  component: RewardImageInput,
  args: {
    label: 'Reward Image'
  }
}

export default meta

type Story = StoryObj<typeof RewardImageInput>

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

export const Controlled: Story = {
  render: () => {
    const [url, setUrl] = useState('')
    return (
      <RewardImageInput
        url={url}
        onFileChange={(file) => {
          if (file) {
            setUrl(URL.createObjectURL(file))
          }
        }}
      />
    )
  }
}
