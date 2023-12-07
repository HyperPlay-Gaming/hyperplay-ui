import React, { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import LinkAccount from '@/components/LinkAccount/index'
import { ModalAnimation } from '@/components/Modal'
import { Button } from '@/index'

const meta: Meta<typeof LinkAccount> = {
  title: 'auth/LinkAccount'
}

export default meta

type Story = StoryObj<typeof LinkAccount>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const close = () => setOpen(false)
    const onConnectTap = () => {
      console.log('onConnectTap')
    }
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <ModalAnimation isOpen={open} onClose={close}>
          <LinkAccount onClose={close} onConnectTap={onConnectTap} />
        </ModalAnimation>
      </>
    )
  }
}

export const Customi18n: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const close = () => setOpen(false)
    const onConnectTap = () => {
      console.log('onConnectTap')
    }
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <ModalAnimation isOpen={open} onClose={close}>
          <LinkAccount
            onClose={close}
            onConnectTap={onConnectTap}
            i18n={{
              connectTitle: 'Link to your HyperPlay account',
              connectSubtitle:
                'Sign in to Steam to link your HyperPlay account.',
              callToActionText: 'Go to Steam sign in'
            }}
          />
        </ModalAnimation>
      </>
    )
  }
}
