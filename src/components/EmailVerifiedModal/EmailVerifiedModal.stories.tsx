import React, { useEffect, useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import EmailVerifiedModal from '@/components/EmailVerifiedModal'

const meta: Meta<typeof EmailVerifiedModal> = {
  title: 'auth/EmailVerifiedModal',
  component: EmailVerifiedModal,
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

type Story = StoryObj<typeof EmailVerifiedModal>

export const Default: Story = {
  render: (args) => {
    const [opened, setOpened] = useState(args.opened)
    useEffect(() => {
      setOpened(args.opened)
    }, [args.opened])
    return (
      <EmailVerifiedModal
        opened={opened}
        onClose={() => setOpened(false)}
        onContinue={() => setOpened(false)}
      />
    )
  }
}
