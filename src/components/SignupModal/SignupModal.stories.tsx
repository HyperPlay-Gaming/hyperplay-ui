import React, { useEffect, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import SignupModal from '@/components/SignupModal/index'

const meta: Meta<typeof SignupModal> = {
  title: 'auth/SignupModal',
  component: SignupModal,
  argTypes: {
    opened: {
      control: {
        type: 'boolean'
      }
    }
  },
  args: {
    opened: true
  }
}

export default meta

type Story = StoryObj<typeof SignupModal>

export const Default: Story = {
  render: (args) => {
    const [opened, setOpened] = useState(args.opened)
    useEffect(() => {
      setOpened(args.opened)
    }, [args.opened])
    return (
      <SignupModal
        opened={opened}
        onClose={() => setOpened(false)}
        onAuthSignup={(provider) => alert(`Provider requested: ${provider}`)}
        onEmailSignup={(email) => alert(`Email requested: ${email}`)}
      />
    )
  }
}
