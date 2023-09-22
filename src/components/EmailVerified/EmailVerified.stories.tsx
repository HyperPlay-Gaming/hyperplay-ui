import React, { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { ModalAnimation } from '@/components/Modal'
import { Button } from '@/index'

import EmailVerified from './index'

const meta: Meta<typeof EmailVerified> = {
  title: 'auth/EmailVerified',
  component: EmailVerified
}

export default meta

type Story = StoryObj<typeof EmailVerified>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <ModalAnimation isOpen={open} onClose={close}>
          <EmailVerified
            onClose={() => alert('Close')}
            style={{ margin: 'auto' }}
            onContinue={() => alert('Continue')}
          />
        </ModalAnimation>
      </>
    )
  }
}
