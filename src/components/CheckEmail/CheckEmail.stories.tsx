import React, { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { ModalAnimation } from '@/components/Modal'
import { Button } from '@/index'

import CheckEmailModal from './index'

const meta: Meta<typeof CheckEmailModal> = {
  title: 'auth/CheckEmail',
  component: CheckEmailModal
}

export default meta

type Story = StoryObj<typeof CheckEmailModal>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const close = () => setOpen(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <ModalAnimation isOpen={open} onClose={close}>
          <CheckEmailModal
            style={{ margin: 'auto' }}
            email="hello@hyperplay.xyz"
            onClose={() => alert('Close')}
            onResend={() => alert('Resend email')}
            onVerify={() => alert('Resend email')}
          />
        </ModalAnimation>
      </>
    )
  }
}
