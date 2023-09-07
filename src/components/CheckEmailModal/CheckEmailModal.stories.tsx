import React, { useEffect, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import CheckEmailModal from '@/components/CheckEmailModal'

const meta: Meta<typeof CheckEmailModal> = {
  title: 'auth/CheckEmailModal',
  component: CheckEmailModal,
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

type Story = StoryObj<typeof CheckEmailModal>

export const Default: Story = {
  render: (args) => {
    const [opened, setOpened] = useState(args.opened)
    useEffect(() => {
      setOpened(args.opened)
    }, [args.opened])
    return (
      <CheckEmailModal
        email="hello@hyperplay.xyz"
        opened={opened}
        onClose={() => setOpened(false)}
        onResend={() => console.log('Resend email')}
      />
    )
  }
}
