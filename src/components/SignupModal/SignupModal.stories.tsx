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
    opened: false
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
        onEmailRequest={(email) => console.log(`Email requested: ${email}`)}
      />
    )
  }
}
